import { AdminState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const getters = {
    adminUsers: (state: AdminState) => state.users,
    adminOneUser: (state: AdminState) => (userId: number) => {
        const filteredUsers = state.users.filter((user) => user.id === userId);
        if (filteredUsers.length > 0) {
            return { ...filteredUsers[0] };
        }
    },
    investments: (state: AdminState) => state.investments,
    adminOneInvestment: (state: AdminState) => (investmentId: number) => {
        const filteredInvestments = state.investments.filter((investment) => investment.id === investmentId);
        if (filteredInvestments.length > 0) {
            return { ...filteredInvestments[0] };
        }
    },
};

const { read } = getStoreAccessors<AdminState, State>('');

export const readAdminOneUser = read(getters.adminOneUser);
export const readAdminUsers = read(getters.adminUsers);
export const readAdminOneInvestment = read(getters.adminOneInvestment);
export const readInvestments = read(getters.investments);
