import type {LoginCredentials, RegisterData, AuthResponse} from '@types';

export type AuthAPI = {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  register(userData: RegisterData): Promise<AuthResponse>;
  logout(): Promise<void>;
};

export type UserAPI = {
  getProfile(userId: string): Promise<any>;
  updateProfile(userId: string, data: any): Promise<any>;
};

export type ReportsAPI = {
  getReports(): Promise<any[]>;
  createReport(reportData: any): Promise<any>;
  updateReport(reportId: string, data: any): Promise<any>;
  deleteReport(reportId: string): Promise<void>;
};
