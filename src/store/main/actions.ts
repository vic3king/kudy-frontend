import { api } from '@/api';
import router from '@/router';
import { getLocalToken, removeLocalToken, saveLocalToken } from '@/utils';
import { AxiosError } from 'axios';
import { getStoreAccessors } from 'typesafe-vuex';
import { AdminState } from '../admin/state';
import {
  IUserProfileCreate,
  IInvest,
  ITopUp,
  IWithdrawInvestment,
} from '@/interfaces';
import { ActionContext } from 'vuex';
import { State } from '../state';
import {
  commitAddNotification,
  commitRemoveNotification,
  commitSetLoggedIn,
  commitSetLogInError,
  commitSetToken,
  commitSetUserProfile,
  commitSetUserWalletBalance,
  commitSetInvestmentHistory,
  commitSetTransactionHistory,
} from './mutations';
import { AppNotification, MainState } from './state';

type MainContext = ActionContext<MainState, State>;
type AdminContex = ActionContext<AdminState, State>;

export const actions = {
  async actionLogIn(
    context: MainContext,
    payload: { username: string; password: string },
  ) {
    try {
      const response = await api.logInGetToken(
        payload.username,
        payload.password,
      );

      const token = response.data.access_token;
      if (token) {
        saveLocalToken(token);
        commitSetToken(context, token);
        commitSetLoggedIn(context, true);
        commitSetLogInError(context, false);
        await dispatchGetUserProfile(context);
        await dispatchGetUserWallet(context);
        await dispatchRouteLoggedIn(context);
        commitAddNotification(context, {
          content: 'Logged in',
          color: 'success',
        });
      } else {
        await dispatchLogOut(context);
      }
    } catch (err) {
      commitSetLogInError(context, true);
      await dispatchLogOut(context);
    }
  },
  async actionGetUserProfile(context: MainContext) {
    try {
      const response = await api.getMe(context.state.token);
      if (response.data) {
        commitSetUserProfile(context, response.data);
      }
    } catch (error) {
      await dispatchCheckApiError(context, error);
    }
  },
  async actionGetUserWallet(context: MainContext) {
    try {
      const response = await api.getMyWallet(context.state.token);

      if (response.data) {
        commitSetUserWalletBalance(context, response.data);
      }
    } catch (error) {
      await dispatchCheckApiError(context, error);
    }
  },
  async actionGetInvestmentHistory(context: MainContext) {
    try {
      const response = await api.getMyInvestmentHistory(context.state.token);

      if (response.data) {
        commitSetInvestmentHistory(context, response.data);
      }
    } catch (error) {
      await dispatchCheckApiError(context, error);
    }
  },

  async actionGetTransactionHistory(context: MainContext) {
    try {
      const response = await api.getMyTransactionHistory(context.state.token);

      if (response.data) {
        commitSetTransactionHistory(context, response.data);
      }
    } catch (error) {
      await dispatchCheckApiError(context, error);
    }
  },

  async actionUpdateUserProfile(context: MainContext, payload) {
    try {
      const loadingNotification = { content: 'saving', showProgress: true };
      commitAddNotification(context, loadingNotification);
      const response = (
        await Promise.all([
          api.updateMe(context.state.token, payload),
          await new Promise((resolve, reject) =>
            setTimeout(() => resolve(), 500),
          ),
        ])
      )[0];
      commitSetUserProfile(context, response.data);
      commitRemoveNotification(context, loadingNotification);
      commitAddNotification(context, {
        content: 'Profile successfully updated',
        color: 'success',
      });
    } catch (error) {
      await dispatchCheckApiError(context, error);
    }
  },
  async actionCheckLoggedIn(context: MainContext) {
    if (!context.state.isLoggedIn) {
      let token = context.state.token;
      if (!token) {
        const localToken = getLocalToken();
        if (localToken) {
          commitSetToken(context, localToken);
          token = localToken;
        }
      }
      if (token) {
        try {
          const response = await api.getMe(token);
          const wallet = await api.getMyWallet(token);
          commitSetLoggedIn(context, true);
          commitSetUserProfile(context, response.data);
          commitSetUserWalletBalance(context, wallet.data);
        } catch (error) {
          await dispatchRemoveLogIn(context);
        }
      } else {
        await dispatchRemoveLogIn(context);
      }
    }
  },
  async actionRemoveLogIn(context: MainContext) {
    removeLocalToken();
    commitSetToken(context, '');
    commitSetLoggedIn(context, false);
  },
  async actionLogOut(context: MainContext) {
    await dispatchRemoveLogIn(context);
    await dispatchRouteLogOut(context);
  },
  async actionUserLogOut(context: MainContext) {
    await dispatchLogOut(context);
    commitAddNotification(context, { content: 'Logged out', color: 'success' });
  },
  actionRouteLogOut(context: MainContext) {
    if (router.currentRoute.path !== '/login') {
      router.push('/login');
    }
  },
  async actionCheckApiError(context: MainContext, payload: AxiosError) {
    if (payload.response!.status === 401) {
      await dispatchLogOut(context);
    }
  },
  actionRouteLoggedIn(context: MainContext) {
    if (
      router.currentRoute.path === '/login' ||
      router.currentRoute.path === '/'
    ) {
      router.push('/main');
    }
  },
  async removeNotification(
    context: MainContext,
    payload: { notification: AppNotification; timeout: number },
  ) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commitRemoveNotification(context, payload.notification);
        resolve(true);
      }, payload.timeout);
    });
  },
  async passwordRecovery(context: MainContext, payload: { username: string }) {
    const loadingNotification = {
      content: 'Sending password recovery email',
      showProgress: true,
    };
    try {
      commitAddNotification(context, loadingNotification);
      const response = (
        await Promise.all([
          api.passwordRecovery(payload.username),
          await new Promise((resolve, reject) =>
            setTimeout(() => resolve(), 500),
          ),
        ])
      )[0];
      commitRemoveNotification(context, loadingNotification);
      commitAddNotification(context, {
        content: 'Password recovery email sent',
        color: 'success',
      });
      await dispatchLogOut(context);
    } catch (error) {
      commitRemoveNotification(context, loadingNotification);
      commitAddNotification(context, {
        color: 'error',
        content: 'Incorrect username',
      });
    }
  },
  async resetPassword(
    context: MainContext,
    payload: { password: string; token: string },
  ) {
    const loadingNotification = {
      content: 'Resetting password',
      showProgress: true,
    };
    try {
      commitAddNotification(context, loadingNotification);
      const response = (
        await Promise.all([
          api.resetPassword(payload.password, payload.token),
          await new Promise((resolve, reject) =>
            setTimeout(() => resolve(), 500),
          ),
        ])
      )[0];
      commitRemoveNotification(context, loadingNotification);
      commitAddNotification(context, {
        content: 'Password successfully reset',
        color: 'success',
      });
      await dispatchLogOut(context);
    } catch (error) {
      commitRemoveNotification(context, loadingNotification);
      commitAddNotification(context, {
        color: 'error',
        content: 'Error resetting password',
      });
    }
  },

  async register(context: MainContext, payload: IUserProfileCreate) {
    try {
      const response = await api.register(payload);
      if (response.data) {
        commitAddNotification(context, {
          content: 'Registration successful',
          color: 'success',
        });
        router.push('/login');
      }
    } catch (err) {
      commitAddNotification(context, {
        content: 'Registration not successful',
        color: 'error',
      });
    }
  },

  async invest(context: MainContext, payload: IInvest) {
    try {
      const response = await api.invest(context.rootState.main.token, payload);

      if (response.data) {
        commitAddNotification(context, {
          content: 'Investment made successfully',
          color: 'success',
        });
        router.push('/main/investments/history/all');
      }
    } catch (err) {
      commitAddNotification(context, {
        content: 'Low wallet balance, kindly top up.',
        color: 'error',
      });
    }
  },

  async withdrawInvestment(context: MainContext, payload: IWithdrawInvestment) {
    try {
      const response = await api.withdrawInvestment(
        context.rootState.main.token,
        payload,
      );

      if (response.data) {
        commitAddNotification(context, {
          content: 'Investment withdrawn successfully',
          color: 'success',
        });
        router.push('/main/profile/transactions');
      }
    } catch (err) {
      commitAddNotification(context, {
        color: 'error',
        content: 'No funds available for this investment',
      });
    }
  },

  async topUp(context: MainContext, payload: ITopUp) {
    try {
      const response = await api.topUp(context.rootState.main.token, payload);

      if (response.data) {
        commitAddNotification(context, {
          content: 'Top up successfully',
          color: 'success',
        });
        router.push('/main/investments/all');
      }
    } catch (err) {
      commitAddNotification(context, {
        content: 'Top up not successful',
        color: 'error',
      });
    }
  },
};

const { dispatch } = getStoreAccessors<MainState | any, State>('');

export const dispatchRegister = dispatch(actions.register);
export const dispatchInvest = dispatch(actions.invest);
export const dispatchWithdrawInvestment = dispatch(actions.withdrawInvestment);
export const dispatchTopUp = dispatch(actions.topUp);
export const dispatchCheckApiError = dispatch(actions.actionCheckApiError);
export const dispatchCheckLoggedIn = dispatch(actions.actionCheckLoggedIn);
export const dispatchGetUserProfile = dispatch(actions.actionGetUserProfile);
export const dispatchGetUserWallet = dispatch(actions.actionGetUserWallet);
export const dispatchGetInvestmentsHistory = dispatch(
  actions.actionGetInvestmentHistory,
);
export const dispatchGetTransactionsHistory = dispatch(
  actions.actionGetTransactionHistory,
);
export const dispatchLogIn = dispatch(actions.actionLogIn);
export const dispatchLogOut = dispatch(actions.actionLogOut);
export const dispatchUserLogOut = dispatch(actions.actionUserLogOut);
export const dispatchRemoveLogIn = dispatch(actions.actionRemoveLogIn);
export const dispatchRouteLoggedIn = dispatch(actions.actionRouteLoggedIn);
export const dispatchRouteLogOut = dispatch(actions.actionRouteLogOut);
export const dispatchUpdateUserProfile = dispatch(
  actions.actionUpdateUserProfile,
);
export const dispatchRemoveNotification = dispatch(actions.removeNotification);
export const dispatchPasswordRecovery = dispatch(actions.passwordRecovery);
export const dispatchResetPassword = dispatch(actions.resetPassword);
