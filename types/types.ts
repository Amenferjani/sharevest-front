export type UserRole = "admin" | "company_representative" | "hedge_manager" ;

export const ROLE_ROUTE: Record<UserRole, string> = {
    admin: "/admin",
    company_representative: "/company-rep",
    hedge_manager: "/hedge-manager"
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

/*
???????????????????hedge
*/
export interface HedgeFund {
    id?: string;
    name: string;
    manager: string;
    description: string;
    strategy: string;
    totalAssets: number;
    investedAmount: number;
    inceptionDate: string;
    managementFees: number;
    performanceFees: number;
    status?: string;
    performanceMetrics?: PerformanceMetric[];
}

export interface PerformanceMetric {
    id?: string;
    date?: string;
    returnPercentage: number;
    sharpeRatio: number;
    volatility: number;
    drawdown: number;
    benchmarkPerformance: number;
    riskScore: number;
    comments: string;
    updatedAt?: string;
    hedgeFundId: string;
}

export interface FilterOptions {
    strategy: string;
    category: string;
    performanceTier: string;
    searchTerm: string;
}

export type PerformanceTier = 'top-performer' | 'above-average' | 'average' | 'below-average';
export type FundCategory = 'equity' | 'fixed-income' | 'commodity' | 'currency' | 'multi-asset';


/*
????????????private vest 
*/

// Database entity types matching your TypeORM entities
export interface Deal {
    id?: string;
    name: string;
    description: string;
    industry: string;
    requiredInvestment: number;
    currentInvestment: number;
    status: 'open' | 'closed' | 'pending';
    lifecycleStage: 'Idea' | 'Funding' | 'Growth' | 'Exit';
    createdAt?: string;
    updatedAt?: string;
    investorTrackings?: InvestorTracking[];
}

export interface InvestorTracking {
    id?: string;
    investorId: string;
    dealId: string;
    deal?: Deal;
    investmentAmount: number;
    investmentDate: string;
    roi?: number;
    valuationChange?: number;
    irr?: number;
    profitLoss?: number;
    exitCompleted: boolean;
}

export interface InterestFormData {
    investmentAmount: number;
    note?: string;
}

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hover?: boolean;
}

export interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

export interface TableColumn<T> {
    key: keyof T | string;
    header: string;
    render?: (item: T) => React.ReactNode;
    sortable?: boolean;
    className?: string;
}

export interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    loading?: boolean;
    onRowClick?: (item: T) => void;
    className?: string;
}