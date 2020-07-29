import { IUserProfile, IInvestmentCreate, IInvestment } from '@/interfaces';
import { AdminState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const mutations = {
    setUsers(state: AdminState, payload: IUserProfile[]) {
        state.users = payload;
    },
    setUser(state: AdminState, payload: IUserProfile) {
        const users = state.users.filter((user: IUserProfile) => user.id !== payload.id);
        users.push(payload);
        state.users = users;
    },
    setInvestments(state: AdminState, payload: IInvestment[]) {
        state.investments = payload;
    },
    setInvestment(state: AdminState, payload: IInvestment) {
        const investments = state.investments;
        investments.push(payload);
        state.investments = investments;
    },
};

const { commit } = getStoreAccessors<AdminState, State>('');

export const commitSetUser = commit(mutations.setUser);
export const commitSetUsers = commit(mutations.setUsers);
export const commitSetInvestment = commit(mutations.setUser);
export const commitSetInvestments = commit(mutations.setInvestments);
