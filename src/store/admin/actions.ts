import { api } from '@/api';
import { ActionContext } from 'vuex';
import {
  IInvestmentUpdate,
  IUserProfileUpdate,
  IInvestmentCreate,
  IUserProfileCreate,
} from '@/interfaces';
import { State } from '../state';
import { AdminState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import {
  commitSetUsers,
  commitSetUser,
  commitSetInvestment,
  commitSetInvestments,
} from './mutations';
import { dispatchCheckApiError } from '../main/actions';
import {
  commitAddNotification,
  commitRemoveNotification,
} from '../main/mutations';

type MainContext = ActionContext<AdminState, State>;

export const actions = {
  async actionGetUsers(context: MainContext) {
    try {
      const response = await api.getUsers(context.rootState.main.token);
      if (response) {
        commitSetUsers(context, response.data);
      }
    } catch (error) {
      await dispatchCheckApiError(context, error);
    }
  },
  async actionUpdateUser(
    context: MainContext,
    payload: { id: number; user: IUserProfileUpdate },
  ) {
    try {
      const loadingNotification = { content: 'saving', showProgress: true };
      commitAddNotification(context, loadingNotification);
      const response = (
        await Promise.all([
          api.updateUser(
            context.rootState.main.token,
            payload.id,
            payload.user,
          ),
          await new Promise((resolve, reject) =>
            setTimeout(() => resolve(), 500),
          ),
        ])
      )[0];
      commitSetUser(context, response.data);
      commitRemoveNotification(context, loadingNotification);
      commitAddNotification(context, {
        content: 'User successfully updated',
        color: 'success',
      });
    } catch (error) {
      await dispatchCheckApiError(context, error);
    }
  },
  async actionGetInvestments(context: MainContext) {
    try {
      const response = await api.getInvestments(context.rootState.main.token);
      if (response) {
        commitSetInvestments(context, response.data);
      }
    } catch (error) {
      await dispatchCheckApiError(context, error);
    }
  },
  async actionCreateInvestment(
    context: MainContext,
    payload: IInvestmentCreate,
  ) {
    try {
      const loadingNotification = { content: 'saving', showProgress: true };
      commitAddNotification(context, loadingNotification);
      const response = (
        await Promise.all([
          api.createInvestment(context.rootState.main.token, payload),
          await new Promise((resolve, reject) =>
            setTimeout(() => resolve(), 500),
          ),
        ])
      )[0];

      commitSetInvestment(context, response.data);
      commitRemoveNotification(context, loadingNotification);
      commitAddNotification(context, {
        content: 'Investment successfully created',
        color: 'success',
      });
    } catch (error) {
      await dispatchCheckApiError(context, error);
    }
  },
  async actionUpdateInvestment(
    context: MainContext,
    payload: { id: number; investment: IInvestmentUpdate },
  ) {
    try {
      const loadingNotification = { content: 'saving', showProgress: true };
      commitAddNotification(context, loadingNotification);
      const response = (
        await Promise.all([
          api.updateInvestment(
            context.rootState.main.token,
            payload.id,
            payload.investment,
          ),
          await new Promise((resolve, reject) =>
            setTimeout(() => resolve(), 500),
          ),
        ])
      )[0];
      commitSetInvestment(context, response.data);
      commitRemoveNotification(context, loadingNotification);
      commitAddNotification(context, {
        content: 'Investment successfully updated',
        color: 'success',
      });
    } catch (error) {
      await dispatchCheckApiError(context, error);
    }
  },
  async actionCreateUser(context: MainContext, payload: IUserProfileCreate) {
    try {
      const loadingNotification = { content: 'saving', showProgress: true };
      commitAddNotification(context, loadingNotification);
      const response = (
        await Promise.all([
          api.createUser(context.rootState.main.token, payload),
          await new Promise((resolve, reject) =>
            setTimeout(() => resolve(), 500),
          ),
        ])
      )[0];
      commitSetUser(context, response.data);
      commitRemoveNotification(context, loadingNotification);
      commitAddNotification(context, {
        content: 'User successfully created',
        color: 'success',
      });
    } catch (error) {
      await dispatchCheckApiError(context, error);
    }
  },
};

const { dispatch } = getStoreAccessors<AdminState, State>('');

export const dispatchCreateInvestment = dispatch(
  actions.actionCreateInvestment,
);
export const dispatchGetInvestments = dispatch(actions.actionGetInvestments);
export const dispatchGetUsers = dispatch(actions.actionGetUsers);
export const dispatchUpdateUser = dispatch(actions.actionUpdateUser);
export const dispatchUpdateInvestment = dispatch(
  actions.actionUpdateInvestment,
);
export const dispatchCreateUser = dispatch(actions.actionCreateUser);
