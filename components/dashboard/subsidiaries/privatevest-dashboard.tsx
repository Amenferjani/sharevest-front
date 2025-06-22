"use client"
import React, { useState } from 'react';
import {
  Briefcase,
  DollarSign,
  BarChart3,
  User,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useDeals } from '@/hooks/use-deals';
import { useInvestments } from '@/hooks/use-investment';
import { Deal, InvestorTracking } from '@/types/types';
import { DealsList } from './lists/deals-list';
import { InvestmentModal } from './sub-pages/private-investor-model';
import { MyInvestments } from './sub-pages/my-interests';

type ActiveTab = 'deals' | 'investments';

export const PrivateVestDashboard = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('deals');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modal states
  const [investmentModalOpen, setInvestmentModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [selectedInvestment, setSelectedInvestment] = useState<InvestorTracking | null>(null);
  const [isEditingInvestment, setIsEditingInvestment] = useState(false);

  // Hooks
  const { deals, loading: dealsLoading, error: dealsError } = useDeals();
  const {
    investments,
    loading: investmentsLoading,
    error: investmentsError,
    addInvestment,
    updateInvestment,
    removeInvestment
  } = useInvestments();

  // Navigation items
  const navigationItems = [
    { id: 'deals', label: 'Available Deals', icon: Briefcase, count: deals.length },
    { id: 'investments', label: 'My Investments', icon: DollarSign, count: investments.length },
  ];

  // Modal handlers
  const handleAddInvestment = (deal: Deal) => {
    setSelectedDeal(deal);
    setSelectedInvestment(null);
    setIsEditingInvestment(false);
    setInvestmentModalOpen(true);
  };

  const handleEditInvestment = (deal: Deal, investment: InvestorTracking) => {
    setSelectedDeal(deal);
    setSelectedInvestment(investment);
    setIsEditingInvestment(true);
    setInvestmentModalOpen(true);
  };

  const handleRemoveInvestment = (investment: InvestorTracking) => {
    setSelectedInvestment(investment);
    setConfirmModalOpen(true);
  };

  const handleInvestmentSubmit = async (formData: any) => {
    if (!selectedDeal) return { success: false, message: 'No deal selected' };

    if (isEditingInvestment && selectedInvestment) {
      return await updateInvestment(selectedInvestment.id!, formData);
    } else {
      return await addInvestment(selectedDeal.id!, formData);
    }
  };

  const handleConfirmRemove = async () => {
    if (!selectedInvestment) return;

    await removeInvestment(selectedInvestment.id!);
    setConfirmModalOpen(false);
    setSelectedInvestment(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="">
        {/* Header */}
        <header className="bg-white shadow-sm ">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {activeTab === 'deals' ? 'Available Deals' : 'My Investments'}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {activeTab === 'deals'
                      ? 'Discover and invest in private equity opportunities'
                      : 'Track and manage your investment portfolio'
                    }
                  </p>
                </div>
              </div>

              
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'deals' && (
            <DealsList
              deals={deals}
              loading={dealsLoading}
              error={dealsError}
              onAddInvestment={handleAddInvestment}
              onEditInvestment={handleEditInvestment}
              onRemoveInvestment={handleRemoveInvestment}
            />
          )}

          {activeTab === 'investments' && (
            <MyInvestments
              investments={investments}
              loading={investmentsLoading}
              error={investmentsError}
              onEditInvestment={handleEditInvestment}
              onRemoveInvestment={handleRemoveInvestment}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <InvestmentModal
        isOpen={investmentModalOpen}
        dealName={selectedDeal?.name || ''}
        dealId={selectedDeal?.id || ''}
        requiredInvestment={selectedDeal?.requiredInvestment || 0}
        existingInvestment={isEditingInvestment ? selectedInvestment : null}
        // onSubmit={handleInvestmentSubmit}
        onClose={() => setInvestmentModalOpen(false)}
      />

      {/* <ConfirmModal
        isOpen={confirmModalOpen}
        title="Remove Investment"
        message="Are you sure you want to remove this investment? This action cannot be undone and will affect your portfolio tracking."
        confirmText="Remove Investment"
        onConfirm={handleConfirmRemove}
        onCancel={() => setConfirmModalOpen(false)}
      /> */}
    </div>
  );
};