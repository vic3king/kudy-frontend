export interface IUserProfile {
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    full_name: string;
    id: number;
}

export interface IWalletBalance {
    balance: number
    owner_id: number
    id: number
}

export interface IUserProfileUpdate {
    email?: string;
    full_name?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
}

export interface IUserProfileCreate {
    email: string;
    full_name?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
}

export interface IInvestment {
    name: string;
    description: string;
    rate: number;
    lock_period: number;
    id: number;
}

export interface ITopUp {
    owner_id?: number
    balance?: number
    amount: number
}
export interface IInvestmentCreate {
    name: string;
    description: string;
    rate: number;
    lock_period: number;
}

export interface IInvestmentUpdate {
    rate?: number;
    lock_period?: number;
}
export interface IInvest {
    amount: number;
    duration: string[];
    owner_id: number;
    investment_id: number;
}