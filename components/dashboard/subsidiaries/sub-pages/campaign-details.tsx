/** @format */

"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    addContribution,
    createUpdate,
    deleteUpdate,
    getCampaignById,
    getCampaignContributions,
    getCampaignContributionsByContributor,
    getUpdatesByCampaign,
    updateCampaign,
} from "@/services/part-vest/service";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { format, differenceInDays } from "date-fns";
import { getDurationShort } from "@/lib/utils";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ArrowLeft,
    Calendar,
    Clock,
    DollarSign,
    Target,
    TrendingUp,
    Share2,
    AlertTriangle,
    Users,
    Edit,
    CheckCircle,
    ChevronRight,
    Rocket,
    Shield,
    Award,
} from "lucide-react";
import { Campaign, Update } from "@/types/types";

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

export default function CampaignDetails() {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const campaignId = id as string;
    const { user } = useAuth();
    const router = useRouter();
    const updatesRef = useRef<HTMLDivElement | null>(null);
    const [contributionAmount, setContributionAmount] = useState(0);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [updateMessage, setUpdateMessage] = useState("");
    const [updateError, setUpdateError] = useState("");
    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const [editForm, setEditForm] = useState({
        title: "",
        description: "",
        targetAmount: 0,
        minContribution: 0,
        maxContribution: 0,
    });

    const {
        data: campaign,
        refetch: campaignRefetch,
        isLoading,
        error,
        isRefetching,
    } = useQuery({
        queryKey: ["campaignById", campaignId],
        queryFn: () => getCampaignById(campaignId),
        enabled: !!campaignId,
        staleTime: 24 * 60 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
    const isOwner = user?.id === campaign?.creatorId;

    const {
        data: campaignUpdates,
        refetch: campaignUpdatesRefetch,
        isLoading: campaignUpdatesLoading,
        error: campaignUpdatesError,
    } = useQuery({
        queryKey: ["campaignUpdatesById", campaignId],
        queryFn: () => getUpdatesByCampaign(campaignId),
        enabled: !!campaignId,
        staleTime: 24 * 60 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
    const {
        data: campaignContributions,
        refetch: campaignContributionsRefetch,
        isLoading: campaignContributionsLoading,
        error: campaignContributionsError,
    } = useQuery({
        queryKey: ["campaignContributions", campaignId, isOwner],
        queryFn: () => {
            // When campaign data is available, choose the right function:
            if (isOwner) {
                return getCampaignContributions(campaignId);
            }
            return getCampaignContributionsByContributor(campaignId);
        },
        enabled: !!campaignId && !!campaign, // Only run after campaign data is loaded.
        staleTime: 24 * 60 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    console.log("campaignContributionsByContributor : ", campaignContributions);
    const campaignEditMutation = useMutation({
        mutationFn: updateCampaign,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["campaignById", campaignId],
            });
            campaignRefetch();
        },
    });

    const postUpdateMutation = useMutation<
        Update,
        Error,
        { campaignId: string; message: string }
    >({
        mutationFn: createUpdate,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["postUpdate", campaignId],
            });
            setShowUpdateForm(false);
            setUpdateMessage("");
            setUpdateError("");
            campaignUpdatesRefetch();
        },
    });

    const deleteUpdateMutation = useMutation({
        mutationFn: deleteUpdate,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["deleteUpdate", campaignId],
            });
            setShowUpdateForm(false);
            setUpdateMessage("");
            setUpdateError("");
            setActiveMenu(null);
            campaignUpdatesRefetch();
        },
    });

    const addContributionMutation = useMutation({
        mutationFn: addContribution,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["addContribution", campaignId, user?.id],
            });
            setContributionAmount(0);
            campaignContributionsRefetch();
            campaignRefetch();
        },
    });

    useEffect(() => {
        if (campaign) {
            setEditForm({
                title: campaign.title,
                description: campaign.description,
                targetAmount: campaign.targetAmount,
                minContribution: campaign.minContribution,
                maxContribution: campaign.maxContribution,
            });
        }
    }, [campaign]);

    const hasChanged =
        campaign &&
        (editForm.title !== campaign.title ||
            editForm.description !== campaign.description ||
            editForm.targetAmount !== campaign.targetAmount ||
            editForm.minContribution !== campaign.minContribution ||
            editForm.maxContribution !== campaign.maxContribution);

    if (
        isLoading ||
        isRefetching ||
        campaignContributionsLoading ||
        campaignUpdatesLoading
    )
        return <Loading />;
    if (error || !campaign || campaignContributionsError || campaignUpdatesError)
        return <Error />;

    // const isOwner = false;
    const isContributor = !isOwner;
    const formatDate = (d: string | Date) => format(new Date(d), "MMM d, yyyy");
    const daysLeft = differenceInDays(new Date(campaign.endDate), new Date());

    const scrollToUpdates = () => {
        updatesRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleContribute = () => {
        console.log(
            `Contributing $${contributionAmount} to campaign ${campaignId}`
        );
        addContributionMutation.mutate({
            amount: contributionAmount,
            campaignId: campaignId,
        });
    };

    const handleDelete = (updateId: string) => {
        deleteUpdateMutation.mutate({ updateId, campaignId });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        campaignEditMutation.mutate({ id: `${id}`, campaignDto: editForm });
        console.log("Updating campaign  with:", id, ":", editForm);
    };

    const handlePostingUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!updateMessage.trim()) return setUpdateError("Message required.");
        postUpdateMutation.mutate({
            campaignId: `${campaignId}`,
            message: updateMessage,
        });
    };

    return (
        <div className='min-h-screen bg-gradient-to-br text-white'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Navigation */}
                <nav className='flex items-center gap-4 mb-8'>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => router.back()}
                        className='h-10 w-10 rounded-full bg-white/5 hover:bg-white/10'>
                        <ArrowLeft className='h-5 w-5' />
                    </Button>
                    <div className='flex items-center gap-2 text-white/60'>
                        <span>Campaigns</span>
                        <ChevronRight className='h-4 w-4' />
                        <span className='text-white font-medium'>{campaign.title}</span>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className='mb-12'>
                    <div className='flex flex-col lg:flex-row gap-8'>
                        {/* Campaign Info */}
                        <div className='flex-1 space-y-6'>
                            <div className='space-y-4'>
                                <div className='flex gap-3'>
                                    <Badge
                                        variant='outline'
                                        className='bg-indigo-500/10 text-indigo-400 border-indigo-500/20'>
                                        {campaign.category}
                                    </Badge>
                                    <Badge
                                        variant='outline'
                                        className={
                                            campaign.status.toLowerCase() === "active"
                                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                        }>
                                        {campaign.status.charAt(0).toUpperCase() +
                                            campaign.status.slice(1)}
                                    </Badge>
                                </div>
                                <h1 className='text-4xl font-bold tracking-tight'>
                                    {campaign.title}
                                </h1>
                            </div>

                            {/* Campaign Stats */}
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'></div>
                        </div>

                        {/* Funding Status */}
                        <div className='lg:w-96'>
                            <Card className='bg-white/5 border-0'>
                                <CardContent className='p-6'>
                                    <div className='space-y-6'>
                                        <div>
                                            <div className='flex justify-between mb-2'>
                                                <span className='text-2xl font-bold'>
                                                    ${campaign.currentAmount.toLocaleString()}
                                                </span>
                                                <span className='text-white/60'>
                                                    of ${campaign.targetAmount.toLocaleString()}
                                                </span>
                                            </div>
                                            <Progress
                                                value={campaign.fundingProgress * 100}
                                                className='h-2 bg-white/10'
                                            />
                                            <div className='flex justify-between mt-2'>
                                                <span className='text-sm text-white/60'>
                                                    {(campaign.fundingProgress * 100).toFixed(2)}% funded
                                                </span>
                                                <span className='text-sm text-white/60'>
                                                    {daysLeft} days left
                                                </span>
                                            </div>
                                        </div>

                                        {isOwner ? (
                                            <Button
                                                className='w-full bg-emerald-800 hover:bg-emerald-700'
                                                onClick={() =>
                                                    document
                                                        .getElementById("edit-section")
                                                        ?.scrollIntoView({ behavior: "smooth" })
                                                }
                                                disabled={daysLeft <= 0}>
                                                <Edit className='h-4 w-4 mr-2' />
                                                Edit Campaign
                                            </Button>
                                        ) : (
                                            <Button
                                                className='w-full bg-emerald-800 hover:bg-emerald-700'
                                                disabled={daysLeft <= 0}
                                                onClick={() =>
                                                    document
                                                        .getElementById("contribute-section")
                                                        ?.scrollIntoView({ behavior: "smooth" })
                                                }>
                                                <DollarSign className='h-4 w-4 mr-2' />
                                                Contribute Now
                                            </Button>
                                        )}

                                        {daysLeft <= 0 && (
                                            <div className='flex items-center gap-2 text-amber-400 text-sm'>
                                                <AlertTriangle className='h-4 w-4' />
                                                <span>This campaign has ended</span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className='space-y-8'>
                    {/* Tabs */}
                    <Tabs defaultValue='details' className='space-y-6'>
                        <TabsList className='bg-white/5 border-0'>
                            <TabsTrigger value='details'>Details</TabsTrigger>
                            <TabsTrigger value='updates'>
                                Updates{" "}
                                {campaign.updates.length > 0 && `(${campaignUpdates?.length})`}
                            </TabsTrigger>
                            <TabsTrigger value='contributions'>Contributions</TabsTrigger>
                        </TabsList>

                        <TabsContent value='details'>
                            <Card className='bg-white/5 border-0'>
                                <CardContent className='p-6'>
                                    <div className='space-y-6'>
                                        <div>
                                            <h3 className='text-xl font-semibold mb-4'>
                                                About This Campaign
                                            </h3>
                                            <p className='text-white/70 leading-relaxed'>
                                                {campaign.description}
                                            </p>
                                        </div>

                                        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6'>
                                            <div className='space-y-4'>
                                                <div className='flex items-center gap-3'>
                                                    <Calendar className='h-5 w-5 text-blue-400' />
                                                    <div>
                                                        <p className='font-medium'>Timeline</p>
                                                        <p className='text-sm text-white/60'>
                                                            {formatDate(campaign.startDate)} -{" "}
                                                            {formatDate(campaign.endDate)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='space-y-4'>
                                                <div className='flex items-center gap-3'>
                                                    <DollarSign className='h-5 w-5 text-emerald-400' />
                                                    <div>
                                                        <p className='font-medium'>Investment Range</p>
                                                        <p className='text-sm text-white/60'>
                                                            ${campaign.minContribution} - $
                                                            {campaign.maxContribution}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='space-y-4'>
                                                <div className='flex items-center gap-3'>
                                                    <Target className='h-5 w-5 text-purple-400' />
                                                    <div>
                                                        <p className='font-medium'>Success Rate</p>
                                                        <p className='text-sm text-white/60'>
                                                            {(campaign.successRate * 100).toFixed(1)}%
                                                            historical performance
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value='updates' ref={updatesRef}>
                            <Card className='bg-white/5 border-0'>
                                <CardHeader>
                                    <CardTitle>Campaign Updates</CardTitle>
                                </CardHeader>
                                <CardContent className='space-y-4 max-h-80 overflow-y-auto pr-2 '>
                                    {(campaignUpdates ?? []).length > 0 ? (
                                        (campaignUpdates ?? []).map((update, i) => (
                                            <div
                                                key={i}
                                                className='bg-white/5 rounded-lg p-4 relative'>
                                                <div className='flex justify-between items-center mb-2 bg-transparent'>
                                                    <h3 className='font-medium'>
                                                        <span className='text-sm text-white/60'>
                                                            {formatDate(update?.date as string)}
                                                        </span>
                                                    </h3>
                                                    <div className='flex gap-2 items-center bg-transparent relative'>
                                                        {/* Sentiment Badge */}
                                                        {update.sentiment && (
                                                            <Badge
                                                                variant='outline'
                                                                className={
                                                                    update.sentiment === "positive"
                                                                        ? "bg-emerald-600/20 text-emerald-400 border-emerald-700/10"
                                                                        : update.sentiment === "negative"
                                                                            ? "bg-rose-600/20 text-rose-400 border-rose-700/10"
                                                                            : "bg-gray-500/20 text-gray-300 border-gray-700/10"
                                                                }>
                                                                {update.sentiment.charAt(0).toUpperCase() +
                                                                    update.sentiment.slice(1)}
                                                            </Badge>
                                                        )}

                                                        {/* Three Dot Action */}
                                                        {isOwner && (
                                                            <button
                                                                onClick={() =>
                                                                    setActiveMenu(activeMenu === i ? null : i)
                                                                }
                                                                className='text-white/50 hover:text-white px-2'>
                                                                ⋯
                                                            </button>
                                                        )}
                                                        {/* Popup Menu */}
                                                        {activeMenu === i && (
                                                            <div className='absolute right-0 top-full mt-2 bg-zinc-800 text-white text-sm rounded shadow-lg z-10'>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDelete(update?._id as string)
                                                                    }
                                                                    className='block px-4 py-2 hover:bg-zinc-700 w-full text-left'>
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <p className='text-white/70'>{update?.message}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className='text-center py-12'>
                                            <p className='text-white/60'>
                                                No updates have been posted yet.
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                                {isOwner && (
                                    <CardFooter className='border-t border-white/10 pt-6 flex flex-col gap-4'>
                                        {showUpdateForm ? (
                                            <form
                                                className='w-full flex flex-col gap-3'
                                                onSubmit={handlePostingUpdate}>
                                                <Textarea
                                                    rows={3}
                                                    className='bg-white/5 border-white/10'
                                                    placeholder='Type your campaign update...'
                                                    value={updateMessage}
                                                    onChange={(e) => setUpdateMessage(e.target.value)}
                                                    disabled={postUpdateMutation.isPending}
                                                />
                                                {updateError && (
                                                    <span className='text-rose-400 text-sm'>
                                                        {updateError}
                                                    </span>
                                                )}
                                                <div className='flex gap-2'>
                                                    <Button
                                                        type='submit'
                                                        className='bg-emerald-800 hover:bg-emerald-700 flex-1'
                                                        disabled={
                                                            postUpdateMutation.isPending ||
                                                            !updateMessage.trim()
                                                        }>
                                                        {postUpdateMutation.isPending
                                                            ? "Posting..."
                                                            : "Post Update"}
                                                    </Button>
                                                    <Button
                                                        type='button'
                                                        variant='outline'
                                                        onClick={() => {
                                                            setShowUpdateForm(false);
                                                            setUpdateMessage("");
                                                            setUpdateError("");
                                                        }}
                                                        disabled={postUpdateMutation.isPending}
                                                        className='flex-1'>
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </form>
                                        ) : (
                                            <Button
                                                onClick={() => setShowUpdateForm(true)}
                                                className='w-full bg-emerald-900 hover:bg-emerald-800 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-200'>
                                                📢 Post Update
                                            </Button>
                                        )}
                                    </CardFooter>
                                )}
                            </Card>
                        </TabsContent>

                        <TabsContent value='contributions'>
                            <Card className='bg-white/5 border-0'>
                                <CardHeader>
                                    <CardTitle>Contributions</CardTitle>
                                    <CardDescription className='text-white/60'>
                                        {isOwner
                                            ? "All contributions to your campaign"
                                            : "Your contribution to this campaign"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {campaignContributions && campaignContributions.length > 0 ? (
                                        <div className='space-y-6'>
                                            {/* Shared Contribution List */}
                                            <div className='max-h-80 overflow-y-auto pr-2 space-y-4'>
                                                {campaignContributions.map((contributor) => (
                                                    <div
                                                        key={contributor._id}
                                                        className='bg-white/5 rounded-lg p-4 flex justify-between items-center shadow-sm'>
                                                        <div className='bg-transparent'>
                                                            <p className='text-sm text-white/70'>
                                                                Date: {formatDate(contributor.date)}
                                                            </p>
                                                            <p className='text-sm text-white/60'>
                                                                Frequency:{" "}
                                                                {contributor.frequency === 1
                                                                    ? "One-time"
                                                                    : `${contributor.frequency}x`}
                                                            </p>
                                                        </div>
                                                        <div className='text-right bg-transparent'>
                                                            <p className='text-lg font-semibold text-emerald-400'>
                                                                ${contributor.amount.toLocaleString()}
                                                            </p>
                                                            <p className='text-sm text-white/60'>
                                                                {(
                                                                    (contributor.amount / campaign.targetAmount) *
                                                                    100
                                                                ).toFixed(1)}
                                                                % of goal
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Owner-only summary cards */}
                                            {isOwner && (
                                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                                    <div className='bg-white/5 rounded-lg p-4 shadow-sm'>
                                                        <div className='flex items-center gap-3 bg-transparent'>
                                                            <Users className='h-5 w-5 text-blue-400 bg-transparent' />
                                                            <div className='bg-transparent'>
                                                                <p className='text-sm text-white/60'>
                                                                    Total Contributors
                                                                </p>
                                                                <p className='text-xl font-semibold'>
                                                                    {campaignContributions.length}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='bg-white/5 rounded-lg p-4 shadow-sm'>
                                                        <div className='flex items-center gap-3 bg-transparent'>
                                                            <DollarSign className='h-5 w-5 text-emerald-400 bg-transparent' />
                                                            <div className='bg-transparent'>
                                                                <p className='text-sm text-white/60 '>
                                                                    Total Amount
                                                                </p>
                                                                <p className='text-xl font-semibold'>
                                                                    $
                                                                    {campaignContributions
                                                                        .reduce((sum, c) => sum + c.amount, 0)
                                                                        .toLocaleString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        // No Data Message
                                        <div className='text-center py-12'>
                                            <Users className='h-12 w-12 mx-auto mb-4 text-white/40' />
                                            <p className='text-white/60 mb-6'>
                                                {isOwner
                                                    ? "No contributions have been made to this campaign yet."
                                                    : "You haven't contributed to this campaign yet."}
                                            </p>
                                            {!isOwner && (
                                                <Button
                                                    className='bg-emerald-800 hover:bg-emerald-700'
                                                    onClick={() =>
                                                        document
                                                            .getElementById("contribute-section")
                                                            ?.scrollIntoView({ behavior: "smooth" })
                                                    }>
                                                    Make Your First Contribution
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Edit Form for Owner */}
                    {isOwner && (
                        <Card className='bg-white/5 border-0' id='edit-section'>
                            <CardHeader>
                                <CardTitle>Edit Campaign</CardTitle>
                                <CardDescription className='text-white/60'>
                                    Update your campaign details
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleEditSubmit} className='space-y-6'>
                                    <div className='space-y-4'>
                                        <div className='space-y-2'>
                                            <Label>Campaign Title</Label>
                                            <Input
                                                defaultValue={campaign.title}
                                                onChange={(e) =>
                                                    setEditForm({ ...editForm, title: e.target.value })
                                                }
                                                className='bg-white/5 border-white/10'
                                            />
                                        </div>

                                        <div className='space-y-2'>
                                            <Label>Description</Label>
                                            <Textarea
                                                rows={4}
                                                defaultValue={campaign.description}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        description: e.target.value,
                                                    })
                                                }
                                                className='bg-white/5 border-white/10'
                                            />
                                        </div>

                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                            <div className='space-y-2'>
                                                <Label>Min Contribution ($)</Label>
                                                <Input
                                                    type='number'
                                                    defaultValue={campaign.minContribution}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            minContribution: Number(e.target.value),
                                                        })
                                                    }
                                                    className='bg-white/5 border-white/10'
                                                />
                                            </div>

                                            <div className='space-y-2'>
                                                <Label>Max Contribution ($)</Label>
                                                <Input
                                                    type='number'
                                                    defaultValue={campaign.maxContribution}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            maxContribution: Number(e.target.value),
                                                        })
                                                    }
                                                    className='bg-white/5 border-white/10'
                                                />
                                            </div>
                                            <div className='space-y-2'>
                                                <Label>Target Amount ($)</Label>
                                                <Input
                                                    type='number'
                                                    defaultValue={campaign.targetAmount}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            targetAmount: Number(e.target.value),
                                                        })
                                                    }
                                                    className='bg-white/5 border-white/10'
                                                />
                                            </div>

                                            <div className='space-y-2'>
                                                <Label>Category</Label>
                                                <Input
                                                    type='text'
                                                    disabled
                                                    defaultValue={campaign.category}
                                                    className='bg-white/5 border-white/10'
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        type='submit'
                                        className='w-full bg-emerald-800 hover:bg-emerald-700'
                                        disabled={!hasChanged || daysLeft <= 0}>
                                        Save Changes
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {/* Contribute Form for Visitors and Contributors */}
                    {!isOwner && (
                        <Card className='bg-white/5 border-0' id='contribute-section'>
                            <CardHeader>
                                <CardTitle>Contribute to This Campaign</CardTitle>
                                <CardDescription className='text-white/60'>
                                    Support this project with your investment
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='space-y-6'>
                                    <div>
                                        <div className='flex justify-between mb-2'>
                                            <Label>Contribution Amount</Label>
                                            <span className='text-white/60'>
                                                ${contributionAmount.toLocaleString()}
                                            </span>
                                        </div>
                                        <Slider
                                            min={campaign.minContribution}
                                            max={campaign.maxContribution}
                                            step={1}
                                            value={[contributionAmount]}
                                            onValueChange={(value) => setContributionAmount(value[0])}
                                            className='mb-4'
                                        />
                                        <div className='flex justify-between text-sm text-white/60'>
                                            <span>Min: ${campaign.minContribution}</span>
                                            <span>Max: ${campaign.maxContribution}</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleContribute}
                                        className='w-full bg-emerald-800 hover:bg-emerald-700'
                                        disabled={daysLeft <= 0 || contributionAmount <= 0}>
                                        Contribute ${contributionAmount.toLocaleString()}
                                    </Button>

                                    {daysLeft <= 0 && (
                                        <div className='flex items-center gap-2 text-amber-400 text-sm'>
                                            <AlertTriangle className='h-4 w-4' />
                                            <span>This campaign has ended</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
