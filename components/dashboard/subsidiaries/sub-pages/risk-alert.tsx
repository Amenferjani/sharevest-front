/** @format */

"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Bell,
  Plus,
  X,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Target,
  DollarSign,
  BarChart3,
} from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createRiskAlert,
  getUserRiskAlerts,
  updateRiskAlert,
} from "@/services/risk-vest/service";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { AlertType, MarketAlert } from "@/types/types";
import AlertWizard from "./alert-wizard";
import AlertsTable from "../tables/alerts-table";

// Alert type icons


export default function AlertsPage() {
  const [showForm, setShowForm] = useState(false);

  const {
    data: userRiskAlertsData,
    isLoading: userRiskAlertsLoading,
    refetch: userRiskAlertsRefetch,
    error: userRiskAlertsError,
  } = useQuery({
    queryKey: ["getUserRiskAlerts"],
    queryFn: getUserRiskAlerts,
    enabled: typeof window !== "undefined",
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  console.log("userRiskAlertsData", userRiskAlertsData);
  const useCreateRiskAlertMutation = useMutation({
    mutationFn: createRiskAlert,
    onSuccess: () => {
      setShowForm(false);
      userRiskAlertsRefetch();
    },
  });
  const handleAlertCreation = (dto: MarketAlert) => {
    useCreateRiskAlertMutation.mutate(dto);
  };
  // — Update (toggle isActive, or any other patch fields)
  // const useUpdateRiskAlertMutation = () =>
  //   useMutation({
  //     mutationFn: updateRiskAlert,
  //     onSuccess: () => {
  //       userRiskAlertsRefetch();
  //     },
  //   });

  // // — Delete
  // const useDeleteRiskAlertMutation = () =>
  //   useMutation({
  //     mutationFn: deleteRiskAlert,
  //     onSuccess: () => {
  //       userRiskAlertsRefetch();
  //     },
  //   });
  // Form state

  // Open create form
  const openCreateForm = () => {
    setShowForm(true);
  };

  if (userRiskAlertsLoading) return <Loading />;
  if (userRiskAlertsError) return <Error />;
  if (!userRiskAlertsData || userRiskAlertsData?.length === 0) {
  }
  return (
    <div className='container mx-auto p-6 space-y-6'>
      {!showForm && (
        <>
          {/* Header */}
          <Card className='bg-gradient-to-r from-blue-950/30 to-purple-950/30 border-0'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <h1 className='text-3xl font-bold mb-2 flex items-center gap-3'>
                    <Bell className='h-8 w-8' />
                    Market Alerts
                  </h1>
                  <p className='text-muted-foreground'>
                    Manage your investment alerts
                  </p>
                </div>
                <Button
                  onClick={openCreateForm}
                  className='gap-2 bg-emerald-800 hover:bg-emerald-700'>
                  <Plus className='h-4 w-4' />
                  Create Alert
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className='grid gap-4 md:grid-cols-3'>
            <Card className='border-l-4 border-l-blue-500'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-muted-foreground'>
                      Total Alerts
                    </p>
                    <p className='text-2xl font-bold'>
                      {userRiskAlertsData?.length}
                    </p>
                  </div>
                  <Bell className='h-8 w-8 text-blue-500' />
                </div>
              </CardContent>
            </Card>

            <Card className='border-l-4 border-l-green-500'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-muted-foreground'>
                      Active Alerts
                    </p>
                    <p className='text-2xl font-bold'>
                      {userRiskAlertsData?.filter((a) => a.isActive).length}
                    </p>
                  </div>
                  <TrendingUp className='h-8 w-8 text-green-500' />
                </div>
              </CardContent>
            </Card>

            <Card className='border-l-4 border-l-orange-500'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-muted-foreground'>
                      Triggered
                    </p>
                    <p className='text-2xl font-bold'>
                      {
                        userRiskAlertsData?.filter((a) => a.lastTriggeredAt)
                          .length
                      }
                    </p>
                  </div>
                  <AlertTriangle className='h-8 w-8 text-orange-500' />
                </div>
              </CardContent>
            </Card>
          </div>

          {!userRiskAlertsData || userRiskAlertsData?.length === 0 ? (
            <Card>
              <CardContent className='p-4'>
                <div className='h-[300px] w-full flex flex-col items-center justify-center bg-gray-50 rounded-md shadow-inner'>
                  <svg
                    aria-hidden='true'
                    className='w-10 h-10 text-gray-400 mb-3'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth={1.5}
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 8v4m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z'
                    />
                  </svg>
                  <p className='text-gray-600 text-base font-medium'>
                    You have no alerts
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
              <AlertsTable
                data={userRiskAlertsData}
                onRefetch={()=>userRiskAlertsRefetch()}
              />
          )}
        </>
      )}

      {showForm && (
        <AlertWizard
          onCancel={() => setShowForm(false)}
          onComplete={handleAlertCreation}
        />
      )}
    </div>
  );
}
