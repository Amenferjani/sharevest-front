"use client"

import { useMemo, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, PlusCircle, Search } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CrowdfundingProjectsTable from "./tables/crowdfunding-projects-table"
import InvestmentTrendChart from "./charts/investment-trend-chart"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createCampaign, getAllByContributor, getOwnerCampaigns, getSixMonthInvestmentTrend } from "@/services/part-vest/service"
import Loading from "@/components/ui/loading"
import Error from "@/components/ui/error"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/authContext"
import ContributionsTable from "./tables/contributions-table"

export default function PartVestDashboard() {
  const {user} = useAuth()
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'contributor' | 'owner'>('contributor')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAmount: 0,
    category: '',
    startDate: new Date().toISOString().substr(0, 10),
    endDate: '',
    minContribution: 0,
    maxContribution: 0,
  })

  const investmentsTableRef = useRef<HTMLDivElement | null>(null)

  const scrollToInvestments = () => {
    investmentsTableRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  console.log(user)
  const isCampaignContributor = user?.role.some(
    (r: { name: string }) => r.name === "campaign_contributor"
  );

  const isCampaignManager = user?.role.some(
    (r: { name: string }) => r.name === "campaign_manager"
  );
    
  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]:
        type === 'number' ? (value === '' ? '' : Number(value))
        : value
    }))
  }

  const handleSelectChange = (name, value) => setFormData(prev => ({ ...prev, [name]: value }))

  const { data: contributorCampaignsData, isLoading: contributorCampaignsLoading, error: contributorCampaignsError } = useQuery({
    queryKey: ["contributorCampaignsData"],
    queryFn: getAllByContributor,
    enabled: typeof window !== 'undefined',
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  console.log("contributorCampaignsData",contributorCampaignsData)

  const contributorCampaignsCount = contributorCampaignsData?.length || 0;

  const { data: ownerCampaignsData, isLoading: ownerCampaignsLoading, error: ownerCampaignsError } = useQuery({
    queryKey: ["OwnerCampaigns"],
    queryFn: getOwnerCampaigns,
    enabled: typeof window !== 'undefined' && isCampaignManager,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const ownerCampaignsCount = ownerCampaignsData?.length;

  const { data: sixMonthsInvestmentsTrend, isLoading: sixMonthsInvestmentsTrendLoading, error: sixMonthsInvestmentsTrendError } = useQuery({
    queryKey: ["sixMonthsInvestmentsTrend"],
    queryFn: getSixMonthInvestmentTrend,
    enabled: contributorCampaignsCount !== 0,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log(sixMonthsInvestmentsTrend)

  const nearestEndDate = ownerCampaignsData && ownerCampaignsData.length > 0
    ? new Date(
        ownerCampaignsData
          .map(c => new Date(c.endDate))
          .sort((a, b) => a.getTime() - b.getTime()) 
          [0]
      )
    : null;

  // format it however you prefer:
  const nearestEndDateStr = nearestEndDate
    ? nearestEndDate.toLocaleDateString('en-US', {
        month: 'short',
        day:   'numeric',
        year:  'numeric',
      })
      : '—';
    
  const totalContributed = useMemo(() => {
    return contributorCampaignsData?.reduce((sum, c) => sum + c.amount, 0)
  }, [contributorCampaignsData]);

  const createCampaignMutation = useMutation({
    mutationFn: createCampaign,
    onSuccess: (data) => {
      console.log("from campaign mutation",data);
      setOpen(false);
    },
    onError: (err: any) => {
      console.error("Failed to add campaign:", err);
    },
  })
  
  if (ownerCampaignsLoading || contributorCampaignsLoading ||sixMonthsInvestmentsTrendLoading ) return <Loading />;
  if (ownerCampaignsError || contributorCampaignsError || sixMonthsInvestmentsTrendError) return <Error />;
  
    const handleSubmit = (e : any) => {
      e.preventDefault()
      console.log("campaign form data :" , formData )
      createCampaignMutation.mutate(formData);
    }


  return (
    <div className="space-y-6 dark:bg-zinc-950 dark:text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">PartVest</h1>
          <p className="text-muted-foreground dark:text-zinc-400">
            Crowdfunding and participatory investment opportunities.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="dark:bg-zinc-900 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">Active Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{contributorCampaignsCount}</div>
            {
              contributorCampaignsCount > 0 ?
                <p className="text-xs text-muted-foreground dark:text-zinc-400">
                <span className="text-emerald-500">+3</span> from last month
                </p> :
                        <p className="text-xs text-muted-foreground text-red-500">
                          You haven’t contributed yet.
                        </p>
            }
          </CardContent>
        </Card>
        <Card className="dark:bg-zinc-900 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">Total Invested</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">
              {
                contributorCampaignsCount > 0 ?
                  `$${totalContributed?.toLocaleString()}`:
                        `$0`
              }
            </div>
            <p className="text-xs text-muted-foreground dark:text-zinc-400">Across all projects</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-zinc-900 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">
              My Campaigns
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* static count */}
            <div className="text-2xl font-bold dark:text-white">
              {ownerCampaignsCount ? ownerCampaignsCount : 0}
            </div>
            {
              (ownerCampaignsCount <= 0 || !ownerCampaignsCount)?
                <p className="text-xs text-muted-foreground dark:text-zinc-400">
                  
                  <span className="text-red-500">
                    You own None
                </span>
                </p> :
                        <p className="text-xs text-muted-foreground dark:text-zinc-400">
                          Next ends on{' '}
                          <span className="text-emerald-500">
                            {nearestEndDateStr}
                          </span>
                        </p> 
            }
          </CardContent>
        </Card>

      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4 dark:bg-zinc-900 dark:border-zinc-800">
          <CardHeader>
            <CardTitle className="dark:text-white">Investment Trend</CardTitle>
            <CardDescription className="dark:text-zinc-400">
              Cumulative total invested over the past 6 months
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <InvestmentTrendChart data={sixMonthsInvestmentsTrend as { month: string; amount: number }[]} />
          </CardContent>
        </Card>
        <Card className="md:col-span-3 dark:bg-black-900 dark:border-zinc-800 ">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="dark:text-white">Quick Actions</CardTitle>
              <CardDescription className="dark:text-zinc-400">Manage your participatory investments</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="w-full flex items-center justify-start gap-2 bg-orange-600 hover:bg-orange-700">
                  <PlusCircle className="h-4 w-4" />
                  Start a Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]dark:bg-zinc-900 max-h-[80vh] overflow-y-auto dark:border-zinc-800">
                <DialogHeader>
                  <DialogTitle className="dark:text-white">Create New Campaign</DialogTitle>
                  <DialogDescription className="dark:text-zinc-400">
                    Fill in the details to start your crowdfunding campaign.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={e => handleSubmit(e)}>
                  <div className="grid gap-4 py-4">
                    {/* Title */}
                    <div className="grid gap-2">
                      <Label htmlFor="title" className="dark:text-white">
                        Campaign Title
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter campaign title"
                        className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="grid gap-2">
                      <Label htmlFor="description" className="dark:text-white">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe your campaign"
                        rows={4}
                        className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                        maxLength={500}
                      />
                    </div>

                    {/* Target Amount */}
                    <div className="grid gap-2">
                      <Label htmlFor="targetAmount" className="dark:text-white">
                        Funding Goal ($)
                      </Label>
                      <Input
                        id="targetAmount"
                        name="targetAmount"
                        type="number"
                        min={0}
                        value={formData.targetAmount}
                        onChange={handleInputChange}
                        placeholder="Enter funding goal"
                        className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div className="grid gap-2">
                      <Label htmlFor="category" className="dark:text-white">
                        Category
                      </Label>
                      <Select
                        name="category"
                        value={formData.category}
                        onValueChange={v => handleSelectChange('category', v)}
                      >
                        <SelectTrigger className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-zinc-800 dark:border-zinc-700">
                          <SelectItem value="renewable-energy">Renewable Energy</SelectItem>
                          <SelectItem value="agriculture">Agriculture</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="real-estate">Real Estate</SelectItem>
                          <SelectItem value="arts-culture">Arts & Culture</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Dates */}
                    <div className="grid gap-2">
                      <Label htmlFor="endDate" className="dark:text-white">
                        End Date
                      </Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                        required
                      />
                    </div>

                    {/* Min & Max Contribution */}
                    <div className="grid gap-2">
                      <Label htmlFor="minContribution" className="dark:text-white">
                        Minimum Contribution 
                      </Label>
                      <Input
                        id="minContribution"
                        name="minContribution"
                        type="number"
                        min={0}
                        value={formData.minContribution}
                        onChange={handleInputChange}
                        placeholder="0"
                        className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="maxContribution" className="dark:text-white">
                        Maximum Contribution 
                      </Label>
                      <Input
                        id="maxContribution"
                        name="maxContribution"
                        type="number"
                        min={0}
                        value={formData.maxContribution}
                        onChange={handleInputChange}
                        placeholder="0"
                        className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button type="submit">Create Campaign</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Button
              className="w-full flex items-center justify-start gap-2 bg-blue-600 hover:bg-blue-700"
              onClick={scrollToInvestments}
            >
              <BarChart className="h-4 w-4" />
              View Your Investments
            </Button>

            <Button className="w-full flex items-center justify-start gap-2 bg-purple-600 hover:bg-purple-700" asChild>
              <Link href="/dashboard/partvest/campaigns">
                <Search className="h-4 w-4" />
                Browse New Projects
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div ref={investmentsTableRef}>
          <Card className="dark:bg-zinc-900 dark:border-zinc-800">
  <Tabs
    value={mode}
    onValueChange={(value: string) =>
      setMode(value as 'contributor' | 'owner')
    }
    className="w-full md:w-auto"
  >
    <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <CardTitle className="dark:text-white">
          Your Crowdfunding Activities
        </CardTitle>
        <CardDescription className="dark:text-zinc-400">
          {mode === 'owner'
            ? 'Campaigns you own and manage'
            : "Contributions you've invested in"}
        </CardDescription>
      </div>

      {/* Styled TabsList */}
      <TabsList className="space-x-2 rounded-md bg-zinc-800 p-1">
        <TabsTrigger
          value="contributor"
          className="
            data-[state=active]:bg-zinc-700
            hover:bg-zinc-700/50
          "
        >
          Contribution
        </TabsTrigger>
        <TabsTrigger
          value="owner"
          className="
            data-[state=active]:bg-zinc-700
            hover:bg-zinc-700/50
          "
        >
          Ownership
        </TabsTrigger>
      </TabsList>
    </CardHeader>

            <CardContent>
              {mode === 'owner' ?
                
                (
              <CrowdfundingProjectsTable
        campaigns={ownerCampaignsData}
        mode={mode}
        onCreateCampaign={() => setOpen(true)}
      />
                ) : (
                  <ContributionsTable contributions={contributorCampaignsData}/>
              )
            }
      
    </CardContent>
  </Tabs>
</Card>

      </div>
    </div>
  )
}
