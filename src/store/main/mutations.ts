import {
  IUserProfile,
  IInvestment,
  IWalletBalance,
  IInvestmentHistory,
  ITransactionHistory,
} from '@/interfaces';
import { MainState, AppNotification } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const mutations = {
  setToken(state: MainState, payload: string) {
    state.token = payload;
  },
  setLoggedIn(state: MainState, payload: boolean) {
    state.isLoggedIn = payload;
  },
  setLogInError(state: MainState, payload: boolean) {
    state.logInError = payload;
  },
  setUserProfile(state: MainState, payload: IUserProfile) {
    state.userProfile = payload;
  },
  setUserWalletBalance(state: MainState, payload: IWalletBalance) {
    state.walletBalance = payload;
  },
  setInvestment(state: MainState, payload: IInvestment) {
    state.investment = payload;
  },
  setInvestmentHistory(state: MainState, payload: IInvestmentHistory[]) {
    state.investmentHistory = payload;
  },
  setTransactionHistory(state: MainState, payload: ITransactionHistory[]) {
    state.transactionHistory = payload;
  },
  setDashboardMiniDrawer(state: MainState, payload: boolean) {
    state.dashboardMiniDrawer = payload;
  },
  setDashboardShowDrawer(state: MainState, payload: boolean) {
    state.dashboardShowDrawer = payload;
  },
  addNotification(state: MainState, payload: AppNotification) {
    state.notifications.push(payload);
  },
  removeNotification(state: MainState, payload: AppNotification) {
    state.notifications = state.notifications.filter(
      (notification) => notification !== payload,
    );
  },
};

const { commit } = getStoreAccessors<MainState | any, State>('');

export const commitSetDashboardMiniDrawer = commit(
  mutations.setDashboardMiniDrawer,
);
export const commitSetDashboardShowDrawer = commit(
  mutations.setDashboardShowDrawer,
);
export const commitSetLoggedIn = commit(mutations.setLoggedIn);
export const commitSetLogInError = commit(mutations.setLogInError);
export const commitSetToken = commit(mutations.setToken);
export const commitSetUserProfile = commit(mutations.setUserProfile);
export const commitSetUserWalletBalance = commit(
  mutations.setUserWalletBalance,
);
export const commitSetInvestmentHistory = commit(
  mutations.setInvestmentHistory,
);
export const commitSetTransactionHistory = commit(
  mutations.setTransactionHistory,
);
export const commitSetInvestment = commit(mutations.setInvestment);
export const commitAddNotification = commit(mutations.addNotification);
export const commitRemoveNotification = commit(mutations.removeNotification);
