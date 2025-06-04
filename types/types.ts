export type UserRole = "admin" | "company_representative" ;

export const ROLE_ROUTE: Record<UserRole, string> = {
    admin: "/admin",
    company_representative: "/company-rep",
};


export enum RiskToleranceLevel {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export interface User {
    id?: string;
    username: string;
    email: string;
    role: { id: string, name: string }[]
    picture?: string;
    riskTolerance: RiskToleranceLevel;
    overallRiskScore: number;
    subscriptionPlan: string;
}

export interface Portfolio {
    id: string;
    userId: string;
    createdAt: string;
    investmentStrategy:
    | 'conservative'
    | 'balanced'
    | 'aggressive'
    | 'income'
    | 'growth'
    | 'index'
    | 'value'
    | 'momentum';
}

export interface Asset {
    id?: string;
    ticker: string;
    name: string;
    type: string;
    currentPrice: number;
    riskFactor?: number;
    quantity: number;
    portfolio?: Portfolio;
}


export interface Transaction {
    portfolio: any;
    asset: any;
    id?: string;
    type: 'buy' | 'sell';
    quantity: number;
    price: number;
    transactionRiskImpact?: number;
    transactionDate?: string;
}

export interface BenchmarkHistoryPoint {
    date: string;
    close: number;
}

export interface BenchmarkData {
    symbol: string;
    history: BenchmarkHistoryPoint[];
}

export interface PortfolioDataPoint {
    month: string;
    value: number;
}

export interface Campaign {
    _id: string;
    title: string;
    description: string;
    currentAmount: number;
    category: string;
    creatorId: string;
    fundingProgress: number;
    startDate: Date;
    endDate: Date;
    duration: number;
    successRate: number;
    minContribution: number;
    maxContribution: number;
    targetAmount: number;
    status:
    | 'active'
    | 'completed'
    | 'cancelled';
    updates: string[];
}

export interface Contribution {
    _id?: string;
    campaignId: string;
    userId: string;
    amount: number;
    date: string;
    frequency?: number;
    avgContributionAmount?: number;
}

export interface Update {
    _id?: string;
    campaignId: string;
    message: string;
    date?: string;
    sentiment?: 'positive' | 'negative' | 'neutral';
}

/* ? risk-vest */

export interface RiskProfile {
    _id?: string,
    userId?: string;
    riskType: 'low' | 'medium' | 'high';
    score: number;
    investmentGoals: string[];
    timeHorizon: 'short-term' | 'medium-term' | 'long-term';
    financialSituation: {
        income: number;
        netWorth: number;
        investmentExperience: string;
    };
    preferences: {
        assetClasses: string[];
        ethicalInvesting: boolean;
    }
    liquidityNeeds: number; // 0–100
    debtLevel: number;      // 0–100
    taxStatus: 'single' | 'married' | 'joint';
    createdAt?: Date;
    updatedAt?: Date;
    description?: string;
}

export enum AlertType {
    RiskThreshold = "riskThreshold",
    MarketDrop = "marketDrop",
    PriceIncrease = "priceIncrease",
    PriceDecrease = "priceDecrease",
    VolatilitySpike = "volatilitySpike",
    FundingProgress = "fundingProgress",
}
export enum ConditionType {
    GreaterThan = "greaterThan",
    LessThan = "lessThan",
    EqualTo = "equalTo",
    InRange = "inRange",
    OutOfRange = "outOfRange",
}
export interface MarketAlert {
    _id?: string
    userId: string;
    alertType: AlertType,
    threshold: number | [number, number];
    notificationChannel: 'email' | 'sms' | 'in-app';
    createdAt: Date;

    // optional (nullable/default=null or defaulted in schema)
    condition?: ConditionType;
    assetSymbol?: string;
    sector?: string;
    portfolioId?: string;
    campaignId?: string;
    market?: string;
    message?: string;
    alertFrequency?: 'immediate' | 'daily' | 'weekly';
    isActive?: boolean;
    lastTriggeredAt?: Date;
    isManual?: boolean;
    triggeredBy?: string;
}

/*
???????????????????????rel-vest
*/
export interface Company {
    id?: string;
    name: string;
    industry: string;
    description: string;
    headquarters: string;
    contactEmail: string;
    phoneNumber: string;
    website: string;
    status?: 'active' | 'inactive';
    events?: Event[];
    investors?: Investor[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Event {
    id?: string;
    title: string;
    description?: string;
    eventType: 'Webinar' | 'Annual Meeting' | 'Q&A Session';
    date?: Date;
    location?: string;
    status: 'upcoming' | 'completed' | 'cancelled';
    companyId: string;
    company?: Company;
    investors?: Investor[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Investor {
    id?: string;
    userId?: string;
    name: string;
    email: string;
    phoneNumber?: string;
    investmentInterest?: string;
    status: 'active' | 'inactive';
    companyId?: string;
    companies?: Company[];
    events?: Event[];
    createdAt?: Date;
    updatedAt?: Date;
}




































// =============================================================================
// CORE ENTITY TYPES
// =============================================================================

export type DealStatus = "draft" | "active" | "funded" | "closed" | "cancelled"
export type LifecycleStage = "pre-seed" | "seed" | "series-a" | "series-b" | "series-c" | "ipo" | "exit"
export type Industry =
    | "technology"
    | "healthcare"
    | "fintech"
    | "renewable-energy"
    | "real-estate"
    | "manufacturing"
    | "retail"
    | "agriculture"

// Base Deal entity matching TypeORM structure
export interface Deal {
    id: string
    name: string // Deal title for cards and forms
    description: string // Detailed description for deal pages
    industry: Industry // Industry category for filtering
    requiredInvestment: number // Total funding target in USD
    currentInvestment: number // Amount raised so far in USD
    status: DealStatus // Current deal status for badges/filters
    lifecycleStage: LifecycleStage // Business stage for categorization
    createdAt: string // ISO date string for sorting/display
    updatedAt: string // ISO date string for last modified
}

// Extended deal with calculated fields for UI display
export interface DealWithMetrics extends Deal {
    fundingProgress: number // Percentage of funding completed (0-100)
    remainingAmount: number // Required - current investment
    investorCount: number // Number of investors in this deal
    averageInvestment: number // Average investment per investor
    daysActive: number // Days since deal creation
    estimatedCompletion?: string // Projected completion date
}

// Investor tracking entity matching TypeORM structure
export interface InvestorTracking {
    id: string
    dealId: string // Foreign key to Deal
    investorId: string // Foreign key to Investor/User
    investmentAmount: number // Amount invested in USD
    investmentDate: string // ISO date string when investment was made
    roi: number // Return on Investment percentage
    irr: number // Internal Rate of Return percentage
    valuationChange: number // Change in valuation since investment
    profitLoss: number // Current profit/loss in USD
    exitCompleted: boolean // Whether investor has exited position
    createdAt: string // ISO date string
    updatedAt: string // ISO date string
}

// Extended tracking with deal information for display
export interface InvestorTrackingWithDeal extends InvestorTracking {
    deal: DealWithMetrics // Full deal information for context
    performanceGrade: "A" | "B" | "C" | "D" | "F" // Performance rating
    riskLevel: "low" | "medium" | "high" // Risk assessment
}

// =============================================================================
// DASHBOARD INTERFACES
// =============================================================================

/**
 * PrivateManagerDashboard Interface
 * Used by deal managers to create, edit, delete, and monitor deals
 */
export interface PrivateManagerDashboard {
    // User context
    managerId: string // Current manager's ID
    managerName: string // Manager's display name for header

    // Dashboard overview metrics
    overview: {
        totalDeals: number // Total deals managed
        activeDeals: number // Currently active deals
        totalFundsRaised: number // Total USD raised across all deals
        averageDealSize: number // Average deal size in USD
        successRate: number // Percentage of successfully funded deals
        pendingApprovals: number // Deals awaiting approval
    }

    // Deal management data
    deals: DealWithMetrics[] // All deals for listing/cards
    recentDeals: DealWithMetrics[] // Recently created/updated deals

    // Deal filtering and sorting options
    filters: {
        status: DealStatus[] // Available status filters
        industry: Industry[] // Available industry filters
        lifecycleStage: LifecycleStage[] // Available stage filters
        dateRange: {
            // Date range filtering
            start?: string
            end?: string
        }
    }

    // Current filter state
    activeFilters: {
        status?: DealStatus
        industry?: Industry
        lifecycleStage?: LifecycleStage
        searchQuery?: string // Text search in deal names/descriptions
        sortBy: "name" | "createdAt" | "fundingProgress" | "requiredInvestment"
        sortOrder: "asc" | "desc"
    }

    // Deal form data for create/edit operations
    dealForm: {
        isEditing: boolean // Whether form is in edit mode
        currentDeal?: Deal // Deal being edited (if any)
        validationErrors: Record<string, string> // Form validation errors
        isSubmitting: boolean // Form submission state
    }

    // Analytics data for charts/graphs
    analytics: {
        fundingTrends: Array<{
            // Monthly funding trends
            month: string
            amount: number
            dealCount: number
        }>
        industryBreakdown: Array<{
            // Deals by industry
            industry: Industry
            count: number
            totalFunding: number
        }>
        stageDistribution: Array<{
            // Deals by lifecycle stage
            stage: LifecycleStage
            count: number
        }>
    }
}

/**
 * PrivateInvestorDashboard Interface
 * Used by investors to track their investments and discover new opportunities
 */
export interface PrivateInvestorDashboard {
    // User context
    investorId: string // Current investor's ID
    investorName: string // Investor's display name

    // Portfolio overview
    portfolio: {
        totalInvested: number // Total amount invested across all deals
        currentValue: number // Current portfolio value
        totalROI: number // Overall return on investment percentage
        totalProfitLoss: number // Total profit/loss in USD
        activeInvestments: number // Number of active investments
        exitedInvestments: number // Number of completed exits
        averageHoldingPeriod: number // Average days holding investments
    }

    // Investment tracking data
    investments: InvestorTrackingWithDeal[] // All investor's investments
    topPerformers: InvestorTrackingWithDeal[] // Best performing investments
    recentActivity: InvestorTrackingWithDeal[] // Recently updated investments

    // Available deals for new investments
    availableDeals: DealWithMetrics[] // Deals open for investment
    recommendedDeals: DealWithMetrics[] // AI/algorithm recommended deals

    // Investment filtering and discovery
    dealFilters: {
        industry: Industry[] // Industry preferences
        lifecycleStage: LifecycleStage[] // Stage preferences
        minInvestment: number // Minimum investment amount
        maxInvestment: number // Maximum investment amount
        riskTolerance: "low" | "medium" | "high" // Risk preference
    }

    // Performance analytics
    performance: {
        monthlyReturns: Array<{
            // Monthly performance tracking
            month: string
            roi: number
            profitLoss: number
            portfolioValue: number
        }>
        industryPerformance: Array<{
            // Performance by industry
            industry: Industry
            roi: number
            investmentCount: number
            totalInvested: number
        }>
        riskMetrics: {
            portfolioVolatility: number // Portfolio risk measure
            sharpeRatio: number // Risk-adjusted return
            maxDrawdown: number // Maximum loss from peak
        }
    }

    // Watchlist and alerts
    watchlist: {
        deals: DealWithMetrics[] // Deals being watched
        priceAlerts: Array<{
            // Price/valuation alerts
            dealId: string
            targetPrice: number
            alertType: "above" | "below"
        }>
    }

    // Investment interest tracking (for deals not yet invested in)
    interests: Array<{
        dealId: string // Deal of interest
        interestLevel: "low" | "medium" | "high" // Level of interest
        notes: string // Personal notes about the deal
        dateAdded: string // When interest was registered
    }>
}

// =============================================================================
// UI COMPONENT PROP TYPES
// =============================================================================

// Props for deal listing card component
export interface DealCardProps {
    deal: DealWithMetrics
    onEdit?: (dealId: string) => void // Manager dashboard only
    onDelete?: (dealId: string) => void // Manager dashboard only
    onInvest?: (dealId: string) => void // Investor dashboard only
    onAddToWatchlist?: (dealId: string) => void // Investor dashboard only
    showActions?: boolean // Whether to show action buttons
}

// Props for investment tracking component
export interface InvestmentCardProps {
    investment: InvestorTrackingWithDeal
    onViewDetails: (investmentId: string) => void
    onUpdateNotes?: (investmentId: string, notes: string) => void
    showPerformanceChart?: boolean
}

// Props for deal form component
export interface DealFormProps {
    deal?: Deal // Existing deal for editing
    onSubmit: (dealData: Omit<Deal, "id" | "createdAt" | "updatedAt">) => void
    onCancel: () => void
    isSubmitting?: boolean
    validationErrors?: Record<string, string>
}










export type RiskLevel = "low" | "medium" | "high" | "very-high";
export type FundStatus = "active" | "closed" | "suspended" | "liquidating";
export type FundStrategy =
    | "long-short-equity"
    | "global-macro"
    | "event-driven"
    | "fixed-income"
    | "multi-strategy"
    | "quantitative";
export type PerformanceGrade = "A+" | "A" | "B+" | "B" | "C+" | "C" | "D" | "F";
export type TrendDirection = "up" | "down" | "stable";

export interface HedgeFund {
    id: string;
    name: string;
    manager: string;
    description: string;
    strategy: FundStrategy;
    totalAssets: number;
    investedAmount: number;
    inceptionDate: string;
    managementFees: number;
    performanceFees: number;
    status: FundStatus;
    createdAt: string;
    updatedAt: string;
    riskLevel: RiskLevel;
    investorCount: number;
    minimumInvestment: number;
    lastUpdated: string;
    performanceGrade: PerformanceGrade;
    currentReturn: number;
    totalReturn: number;
    sharpeRatio: number;
    volatility: number;
    maxDrawdown: number;
    latestReturn?: number;
}

export interface PerformanceMetric {
    id: string;
    date: string;
    returnPercentage: number;
    sharpeRatio: number;
    volatility: number;
    drawdown: number;
    benchmarkPerformance: number;
    riskScore: number;
    hedgeFundId: string;
    createdAt: string;
    updatedAt: string;
    outperformance: number;
    riskAdjustedReturn: number;
    periodLabel: string;
    trend: TrendDirection;
}

export interface Investment {
    fundId: string;
    fundName: string;
    investedAmount: number;
    currentValue: number;
    investmentDate: string;
    currentReturn: number;
    profitLoss: number;
    performanceGrade: PerformanceGrade;
}

export interface PerformanceTrend {
    date: string;
    totalReturn: number;
    benchmark: number;
    aum: number;
}

export interface DashboardOverview {
    totalAUM: number;
    aumGrowth: number;
    averageReturn: number;
    totalInvestors: number;
    activeFunds: number;
    topPerformingFund: string;
}

export interface HedgeFundManagerData {
    overview: DashboardOverview;
    funds: HedgeFund[];
    performanceTrends: PerformanceTrend[];
}





































// =============================================================================
// CORE ENTITY TYPES
// =============================================================================

export type HedgeFundStatus = "active" | "closed" | "suspended" | "liquidating"
export type HedgeFundStrategy =
    | "long-short-equity"
    | "market-neutral"
    | "event-driven"
    | "global-macro"
    | "fixed-income"
    | "multi-strategy"
    | "quantitative"


// Base HedgeFund entity matching backend structure
export interface HedgeFund {
    id: string
    name: string // Fund name for display
    manager: string // Manager name
    description: string // Fund description and investment thesis
    totalAssets: number // Total assets under management (AUM) in USD
    investedAmount: number // Currently invested amount in USD
    inceptionDate: string // ISO date string when fund started
    managementFees: number // Annual management fee percentage (e.g., 2.0 for 2%)
    performanceFees: number // Performance fee percentage (e.g., 20.0 for 20%)
    status: HedgeFundStatus // Current fund status
    createdAt: string // ISO date string
    updatedAt: string // ISO date string
}

// Extended hedge fund with calculated metrics for UI
export interface HedgeFundWithMetrics extends HedgeFund {
    currentReturn: number // Current year-to-date return percentage
    totalReturn: number // Total return since inception
    sharpeRatio: number // Risk-adjusted return measure
    volatility: number // Annualized volatility percentage
    maxDrawdown: number // Maximum peak-to-trough decline
    riskLevel: RiskLevel // Calculated risk assessment
    investorCount: number // Number of current investors
    minimumInvestment: number // Minimum investment amount
    lastUpdated: string // Last performance update date
    performanceGrade: "A+" | "A" | "B+" | "B" | "C+" | "C" | "D" | "F"
}

// Performance metrics entity matching backend structure
export interface PerformanceMetric {
    id: string
    date: string // ISO date string for the metric period
    returnPercentage: number // Return for this period
    sharpeRatio: number // Risk-adjusted return ratio
    volatility: number // Volatility for this period
    drawdown: number // Drawdown percentage
    benchmarkPerformance: number // Benchmark comparison (e.g., S&P 500)
    riskScore: number // Risk score (1-10 scale)
    comments?: string // Optional comments about performance
    hedgeFundId: string // Foreign key to HedgeFund
    createdAt: string // ISO date string
    updatedAt: string // ISO date string
}

// Extended performance metric with additional UI data
export interface PerformanceMetricWithComparison extends PerformanceMetric {
    outperformance: number // Performance vs benchmark
    riskAdjustedReturn: number // Return adjusted for risk
    periodLabel: string // Human readable period (e.g., "Q1 2024")
    trend: "up" | "down" | "stable" // Performance trend indicator
}

// =============================================================================
// DASHBOARD INTERFACES
// =============================================================================

/**
 * Hedge Manager Dashboard Interface
 * Used by fund managers to create, edit, and monitor their hedge funds
 */
export interface HedgeManagerDashboard {
    // Manager context
    managerId: string
    managerName: string
    managerEmail: string

    // Dashboard overview
    overview: {
        totalFunds: number // Total funds managed
        totalAUM: number // Total assets under management
        averageReturn: number // Average return across all funds
        totalInvestors: number // Total investors across all funds
        activeFunds: number // Currently active funds
        topPerformingFund: string // Name of best performing fund
    }

    // Fund management data
    funds: HedgeFundWithMetrics[] // All funds managed by this manager
    recentFunds: HedgeFundWithMetrics[] // Recently created/updated funds

    // Performance data
    allMetrics: PerformanceMetricWithComparison[] // All performance metrics
    recentMetrics: PerformanceMetricWithComparison[] // Recent performance updates

    // Fund creation/editing
    fundForm: {
        isEditing: boolean
        currentFund?: HedgeFund
        validationErrors: Record<string, string>
        isSubmitting: boolean
    }

    // Performance metric form
    metricForm: {
        isOpen: boolean
        selectedFundId?: string
        validationErrors: Record<string, string>
        isSubmitting: boolean
    }

    // Analytics for charts
    analytics: {
        performanceTrends: Array<{
            date: string
            totalReturn: number
            benchmark: number
            aum: number
        }>
        strategyBreakdown: Array<{
            strategy: HedgeFundStrategy
            count: number
            totalAUM: number
            averageReturn: number
        }>
        riskDistribution: Array<{
            riskLevel: RiskLevel
            count: number
        }>
    }
}

/**
 * Investor Dashboard Interface
 * Used by investors to browse, analyze, and track hedge fund performance
 */
export interface InvestorDashboard {
    // Investor context
    investorId: string
    investorName: string

    // Available funds for browsing
    availableFunds: HedgeFundWithMetrics[]
    featuredFunds: HedgeFundWithMetrics[] // Top performing or recommended funds
    watchlist: HedgeFundWithMetrics[] // Funds being watched by investor

    // Filtering and search
    filters: {
        strategy: HedgeFundStrategy[]
        riskLevel: RiskLevel[]
        minAUM: number
        maxAUM: number
        minReturn: number
        performanceGrade: string[]
        status: HedgeFundStatus[]
    }

    activeFilters: {
        strategy?: HedgeFundStrategy
        riskLevel?: RiskLevel
        minAUM?: number
        maxAUM?: number
        minReturn?: number
        searchQuery?: string
        sortBy: "name" | "totalReturn" | "sharpeRatio" | "totalAssets" | "inceptionDate"
        sortOrder: "asc" | "desc"
    }

    // Fund details view
    selectedFund?: {
        fund: HedgeFundWithMetrics
        metrics: PerformanceMetricWithComparison[]
        historicalData: Array<{
            date: string
            value: number
            benchmark: number
            drawdown: number
        }>
        riskAnalysis: {
            volatility: number
            sharpeRatio: number
            maxDrawdown: number
            beta: number
            alpha: number
        }
    }

    // Performance comparison
    comparison: {
        selectedFunds: string[] // Fund IDs for comparison
        comparisonData: Array<{
            date: string
            funds: Record<string, number> // Fund ID -> performance value
        }>
    }

    // Report generation
    reportGeneration: {
        isGenerating: boolean
        selectedFundId?: string
        reportType: "performance" | "risk" | "comprehensive"
        dateRange: {
            start: string
            end: string
        }
    }
}

// Extended investor dashboard data with portfolio and investment tracking
export interface InvestorDashboardData extends InvestorDashboard {
    // Portfolio overview data
    portfolio: {
        totalValue: number // Current total portfolio value
        totalInvested: number // Total amount invested
        totalReturn: number // Overall portfolio return percentage
        monthlyReturn: number // Current month return percentage
        activeFunds: number // Number of funds currently invested in
    }

    // Current investments
    investments: Array<{
        fundId: string
        fundName: string
        investedAmount: number
        currentValue: number
        investmentDate: string
        currentReturn: number
        profitLoss: number
        performanceGrade: string
    }>

    // Performance history for charts
    performanceHistory: Array<{
        date: string
        portfolioValue: number
        monthlyReturn: number
        benchmark: number
    }>
}

// =============================================================================
// COMPONENT PROP TYPES
// =============================================================================

export interface HedgeFundCardProps {
    fund: HedgeFundWithMetrics
    onEdit?: (fundId: string) => void // Manager only
    onDelete?: (fundId: string) => void // Manager only
    onViewDetails?: (fundId: string) => void
    onAddToWatchlist?: (fundId: string) => void // Investor only
    showActions?: boolean
    variant?: "manager" | "investor"
}

export interface PerformanceChartProps {
    data: PerformanceMetricWithComparison[]
    fundName: string
    showBenchmark?: boolean
    height?: number
    timeRange?: "1M" | "3M" | "6M" | "1Y" | "ALL"
}

export interface FundFormProps {
    fund?: HedgeFund
    onSubmit: (fundData: Omit<HedgeFund, "id" | "createdAt" | "updatedAt">) => void
    onCancel: () => void
    isSubmitting?: boolean
    validationErrors?: Record<string, string>
}

export interface MetricFormProps {
    fundId: string
    fundName: string
    onSubmit: (metricData: Omit<PerformanceMetric, "id" | "createdAt" | "updatedAt">) => void
    onCancel: () => void
    isSubmitting?: boolean
    validationErrors?: Record<string, string>
}

export interface FilterPanelProps {
    filters: InvestorDashboard["filters"]
    activeFilters: InvestorDashboard["activeFilters"]
    onFilterChange: (filters: Partial<InvestorDashboard["activeFilters"]>) => void
    onClearFilters: () => void
}
