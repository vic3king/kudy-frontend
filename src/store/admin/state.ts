import { IUserProfile, IInvestment } from '@/interfaces';

export interface AdminState {
    users: IUserProfile[];
    investments: IInvestment[];
}
