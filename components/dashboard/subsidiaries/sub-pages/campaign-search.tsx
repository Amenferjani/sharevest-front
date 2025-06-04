/** @format */

"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getRecentCampaigns,
  getCampaignsByUiFilters,
} from "@/services/part-vest/service";
import { Campaign } from "@/types/types";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { calculateDaysLeft } from "@/lib/utils";

const categories = [
  "All",
  "Agriculture",
  "Education",
  "Healthcare",
  "Environment",
  "Technology",
  "Renewable Energy",
  "Real Estate",
  "Arts & Culture",
];

export default function CampaignSearch() {
  const [page, setPage] = useState(1);
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [triggerSearch, setTriggerSearch] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [progressFilter, setProgressFilter] = useState<string>("All");
  const [daysLeftFilter, setDaysLeftFilter] = useState<string>("All");

  const LIMIT = 10;

  const {
    data: pageData,
    isLoading: recentCampaignsLoading,
    isError: recentCampaignsError,
  } = useQuery<Campaign[]>({
    queryKey: ["recent-campaigns", page],
    queryFn: () => getRecentCampaigns(LIMIT, page),
    enabled: typeof window !== "undefined" && hasMore,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const {
    data: SearchData,
    isSuccess: searchDataSuccess,
    refetch,
    isLoading: searchDataLoading,
    isError: searchDataError,
  } = useQuery<Campaign[]>({
    queryKey: [
      "search-campaigns",
      categoryFilter,
      progressFilter,
      daysLeftFilter,
      LIMIT,
    ],
    queryFn: () =>
      getCampaignsByUiFilters(
        categoryFilter,
        progressFilter,
        daysLeftFilter,
        LIMIT
      ),
    enabled: false,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setAllCampaigns([]);
    setHasMore(true);
    setPage(1);
    setTriggerSearch(false);
  }, []);

  useEffect(() => {
    console.log(categoryFilter, progressFilter, daysLeftFilter);
  }, [categoryFilter, progressFilter, daysLeftFilter]);

  useEffect(() => {
    if (pageData) {
      setAllCampaigns((prev) => [...prev, ...pageData]);
      if (pageData.length < LIMIT) {
        setHasMore(false);
      }
    }
  }, [pageData]);

  useEffect(() => {
    if (SearchData) {
      setAllCampaigns(SearchData);
      setHasMore(false);
    }
  }, [SearchData]);

  const handleSearch = () => {
    setAllCampaigns([]);
    setHasMore(true);
    setPage(1);

    refetch();
  };

  if ((recentCampaignsLoading && page === 1) || searchDataLoading) {
    return <Loading />;
  }

  if (recentCampaignsError || searchDataError) {
    return <Error />;
  }

  return (
    <div className='space-y-6 dark:bg-zinc-950 dark:text-white p-4'>
      {/* Header */}
      <div className='flex items-center gap-2 mb-4'>
        <Button
          variant='ghost'
          size='icon'
          asChild
          className='dark:text-white dark:hover:bg-zinc-800'>
          <Link href='/dashboard/partvest'>
            <ArrowLeft className='h-5 w-5' />
          </Link>
        </Button>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            Explore Projects
          </h1>
          <p className='text-muted-foreground dark:text-zinc-400'>
            Discover and filter crowdfunding campaigns that match your
            interests.
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className='p-4 dark:border-zinc-800'>
        <CardTitle className='text-base mb-4 dark:text-white'>
          Search & Filter Campaigns
        </CardTitle>

        {/* notice the added `items-end` */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 items-end'>
          {/* Category */}
          <div>
            <label className='block text-sm mb-1 dark:text-zinc-300'>
              Category
            </label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className='w-full bg-zinc-900 border-zinc-700 text-white'>
                <SelectValue placeholder='Select category' />
              </SelectTrigger>
              <SelectContent className='bg-zinc-900 border-zinc-700 text-white'>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Progress */}
          <div>
            <label className='block text-sm mb-1 dark:text-zinc-300'>
              Progress
            </label>
            <Select value={progressFilter} onValueChange={setProgressFilter}>
              <SelectTrigger className='w-full bg-zinc-900 border-zinc-700 text-white'>
                <SelectValue placeholder='Select progress' />
              </SelectTrigger>
              <SelectContent className='bg-zinc-900 border-zinc-700 text-white'>
                <SelectItem value='All'>All</SelectItem>
                <SelectItem value='<50'>&lt; 50%</SelectItem>
                <SelectItem value='50-80'>50-80%</SelectItem>
                <SelectItem value='>80'>&gt; 80%</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Days Left */}
          <div>
            <label className='block text-sm mb-1 dark:text-zinc-300'>
              Days Left
            </label>
            <Select value={daysLeftFilter} onValueChange={setDaysLeftFilter}>
              <SelectTrigger className='w-full bg-zinc-900 border-zinc-700 text-white'>
                <SelectValue placeholder='Select days left' />
              </SelectTrigger>
              <SelectContent className='bg-zinc-900 border-zinc-700 text-white'>
                <SelectItem value='All'>All</SelectItem>
                <SelectItem value='<7'>&lt; 7 days</SelectItem>
                <SelectItem value='7-30'>7-30 days</SelectItem>
                <SelectItem value='>30'>&gt; 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <div className='flex justify-end'>
            <Button
              onClick={handleSearch}
              className='bg-emerald-600 hover:bg-emerald-700'>
              Search
            </Button>
          </div>
        </div>
      </Card>

      {/* Campaign Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {allCampaigns.map((project) => {
          const daysLeft = calculateDaysLeft(project.endDate);
          return (
            <Card
              key={project._id}
              className='overflow-hidden flex flex-col dark:bg-zinc-900 dark:border-zinc-800'>
              <CardHeader className='pb-2'>
                <div className='flex justify-between items-start'>
                  <CardTitle className='text-lg dark:text-white'>
                    {project.title}
                  </CardTitle>
                  <Badge
                    variant='outline'
                    className='bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'>
                    {project.category}
                  </Badge>
                </div>
                <CardDescription className='line-clamp-2 dark:text-zinc-400'>
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className='pb-2 flex-grow'>
                <div className='space-y-3'>
                  <div className='space-y-1'>
                    <div className='flex items-center justify-between text-xs dark:text-zinc-300'>
                      <span>
                        {(project.fundingProgress * 100).toFixed(2)}% funded
                      </span>
                      <span>
                        ${project.currentAmount.toLocaleString()} of $
                        {project.targetAmount.toLocaleString()}
                      </span>
                    </div>
                    <Progress
                      value={project.fundingProgress * 100}
                      className='h-2 bg-white/10'
                    />
                  </div>
                  <div className='flex justify-between text-xs text-muted-foreground dark:text-zinc-400'>
                    <div>{project.updates.length} updates</div>
                    <div>{daysLeft} days left</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className='w-full bg-emerald-600 hover:bg-emerald-700'>
                  <Link
                    href={`/dashboard/partvest/campaigns/${project._id}`}
                    className='w-full'>
                    View Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className='flex justify-center'>
          <Button
            variant='outline'
            onClick={() => setPage((prev) => prev + 1)}
            disabled={recentCampaignsLoading}
            className='mt-4 dark:border-zinc-700'>
            {recentCampaignsLoading ? <Loading /> : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
