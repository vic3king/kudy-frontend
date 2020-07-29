import axios from "axios";
import { apiUrl } from "@/env";
import {
  IUserProfile,
  IUserProfileUpdate,
  IUserProfileCreate,
  IInvestmentCreate,
  IInvestment,
  IInvestmentUpdate,
  IInvest,
  IWalletBalance,
  ITopUp,
  IInvestmentHistory,
  ITransactionHistory,
} from "./interfaces";

function authHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export const api = {
  async logInGetToken(username: string, password: string) {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    return axios.post(`${apiUrl}/api/v1/login/access-token`, params);
  },

  async getMe(token: string) {
    return axios.get<IUserProfile>(
      `${apiUrl}/api/v1/users/me`,
      authHeaders(token)
    );
  },
  async getMyWallet(token: string) {
    return axios.get<IWalletBalance>(
      `${apiUrl}/api/v1/wallet/me`,
      authHeaders(token)
    );
  },

  async getMyInvestmentHistory(token: string) {
    return axios.get<IInvestmentHistory[]>(
      `${apiUrl}/api/v1/investments/history`,
      authHeaders(token)
    );
  },

  async getMyTransactionHistory(token: string) {
    return axios.get<ITransactionHistory[]>(
      `${apiUrl}/api/v1/transactions/history`,
      authHeaders(token)
    );
  },

  async updateMe(token: string, data: IUserProfileUpdate) {
    return axios.put<IUserProfile>(
      `${apiUrl}/api/v1/users/me`,
      data,
      authHeaders(token)
    );
  },
  async getUsers(token: string) {
    return axios.get<IUserProfile[]>(
      `${apiUrl}/api/v1/users/`,
      authHeaders(token)
    );
  },
  async updateUser(token: string, userId: number, data: IUserProfileUpdate) {
    return axios.put(
      `${apiUrl}/api/v1/users/${userId}`,
      data,
      authHeaders(token)
    );
  },
  async createUser(token: string, data: IUserProfileCreate) {
    return axios.post(`${apiUrl}/api/v1/users/`, data, authHeaders(token));
  },

  async createInvestment(token: string, data: IInvestmentCreate) {
    return axios.post(`${apiUrl}/api/v1/investments`, data, authHeaders(token));
  },
  async getInvestments(token: string) {
    return axios.get<IInvestment[]>(
      `${apiUrl}/api/v1/investments/`,
      authHeaders(token)
    );
  },
  async updateInvestment(
    token: string,
    investmentId: number,
    data: IInvestmentUpdate
  ) {
    return axios.patch(
      `${apiUrl}/api/v1/investments/${investmentId}`,
      data,
      authHeaders(token)
    );
  },
  async register(data: IUserProfileCreate) {
    return axios.post(`${apiUrl}/api/v1/users/register`, data);
  },
  async invest(token: string, data: IInvest) {
    return axios.post(
      `${apiUrl}/api/v1/investments/invest`,
      data,
      authHeaders(token)
    );
  },

  async topUp(token: string, data: ITopUp) {
    return axios.post(
      `${apiUrl}/api/v1/wallet/top-up`,
      data,
      authHeaders(token)
    );
  },
  async passwordRecovery(email: string) {
    return axios.post(`${apiUrl}/api/v1/password-recovery/${email}`);
  },
  async resetPassword(password: string, token: string) {
    return axios.post(`${apiUrl}/api/v1/reset-password/`, {
      new_password: password,
      token,
    });
  },
};
