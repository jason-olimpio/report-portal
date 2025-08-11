import type {LoginCredentials, RegisterData, AuthResponse} from '@types'

/**
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Defines the contract for authentication-related operations
 * including user login, registration, and logout functionality.
 */
export type AuthAPI = {
  /**
   * Authenticates a user with provided credentials
   *
   * @param credentials - User's login credentials containing email and password
   * @returns Promise resolving to an AuthResponse with user data and authentication token
   * @throws Error if authentication fails
   */
  login(credentials: LoginCredentials): Promise<AuthResponse>

  /**
   * Registers a new user in the system
   *
   * @param userData - Registration data including name, email, and password
   * @returns Promise resolving to an AuthResponse with user data and authentication token
   * @throws Error if registration fails (e.g., email already exists)
   */
  register(userData: RegisterData): Promise<AuthResponse>

  /**
   * Logs out the current user and invalidates their session
   *
   * @returns Promise that resolves when logout is complete
   */
  logout(): Promise<void>
}

/**
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Defines the contract for user profile-related operations
 * including retrieving and updating user profile information.
 */
export type UserAPI = {
  /**
   * Retrieves a user's profile information
   *
   * @param userId - Unique identifier of the user
   * @returns Promise resolving to the user's profile data
   */
  getProfile(userId: string): Promise<any>

  /**
   * Updates a user's profile information
   *
   * @param userId - Unique identifier of the user
   * @param data - Updated profile data
   * @returns Promise resolving to the updated user profile data
   */
  updateProfile(userId: string, data: any): Promise<any>
}

/**
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Defines the contract for report-related operations
 * including creating, retrieving, updating, and deleting environmental issue reports.
 */
export type ReportsAPI = {
  /**
   * Retrieves all reports from the system
   *
   * @returns Promise resolving to an array of report objects
   */
  getReports(): Promise<any[]>

  /**
   * Creates a new report
   *
   * @param reportData - Data for the new report
   * @returns Promise resolving to the created report object
   */
  createReport(reportData: any): Promise<any>

  /**
   * Updates an existing report
   *
   * @param reportId - Unique identifier of the report to update
   * @param data - Updated report data
   * @returns Promise resolving to the updated report object
   */
  updateReport(reportId: string, data: any): Promise<any>

  /**
   * Deletes a report from the system
   *
   * @param reportId - Unique identifier of the report to delete
   * @returns Promise that resolves when deletion is complete
   */
  deleteReport(reportId: string): Promise<void>
}
