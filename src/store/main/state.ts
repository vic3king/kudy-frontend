import {
  IUserProfile,
  IInvestment,
  IWalletBalance,
  IInvestmentHistory,
  ITransactionHistory
} from "@/interfaces";

export interface AppNotification {
  content: string;
  color?: string;
  showProgress?: boolean;
}

export interface MainState {
  token: string;
  isLoggedIn: boolean | null;
  logInError: boolean;
  userProfile: IUserProfile | null;
  investment: IInvestment | null;
  investmentHistory: IInvestmentHistory[];
  transactionHistory: ITransactionHistory[];
  walletBalance: IWalletBalance | null;
  dashboardMiniDrawer: boolean;
  dashboardShowDrawer: boolean;
  notifications: AppNotification[];
}
