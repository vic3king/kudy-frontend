import { MainState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const getters = {
    hasAdminAccess: (state: MainState) => {
        return (
            state.userProfile &&
            state.userProfile.is_superuser && state.userProfile.is_active);
    },
    hasUserAccess: (state: MainState) => {
        return (
            state.userProfile &&
            !state.userProfile.is_superuser && state.userProfile.is_active);
    },
    loginError: (state: MainState) => state.logInError,
    dashboardShowDrawer: (state: MainState) => state.dashboardShowDrawer,
    dashboardMiniDrawer: (state: MainState) => state.dashboardMiniDrawer,
    userProfile: (state: MainState) => state.userProfile,
    userWalletBalance: (state: MainState) => state.walletBalance,
    investment: (state: MainState) => state.investment,
    investmentHistory: (state: MainState) => state.investmentHistory,
    transactionHistory: (state: MainState) => state.transactionHistory,
    token: (state: MainState) => state.token,
    isLoggedIn: (state: MainState) => state.isLoggedIn,
    firstNotification: (state: MainState) => state.notifications.length > 0 && state.notifications[0],
};

const {read} = getStoreAccessors<MainState, State>('');

export const readDashboardMiniDrawer = read(getters.dashboardMiniDrawer);
export const readDashboardShowDrawer = read(getters.dashboardShowDrawer);
export const readHasAdminAccess = read(getters.hasAdminAccess);
export const readHasUserAccess = read(getters.hasUserAccess);
export const readIsLoggedIn = read(getters.isLoggedIn);
export const readLoginError = read(getters.loginError);
export const readToken = read(getters.token);
export const readUserProfile = read(getters.userProfile);
export const readUserWalletBalance = read(getters.userWalletBalance);
export const readInvestment = read(getters.investment);
export const readFirstNotification = read(getters.firstNotification);
export const readInvestmentHistory = read(getters.investmentHistory);
export const readTransactionHistory = read(getters.transactionHistory);
