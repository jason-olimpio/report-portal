import type {LoginCredentials, RegisterData, AuthResponse, Report} from '@types'

export type AuthAPI = {
  login(credentials: LoginCredentials): Promise<AuthResponse>
  register(userData: RegisterData): Promise<AuthResponse>
  logout(): Promise<void>
}

export type UserAPI = {
  getProfile(userId: string): Promise<any>
  updateProfile(userId: string, data: any): Promise<any>
}

export type ReportsAPI = {
  getReports(): Promise<any[]>
  createReport(reportData: Report): Promise<Report>
  updateReport(reportId: string, data: Report): Promise<Report>
  deleteReport(reportId: string): Promise<void>
}
