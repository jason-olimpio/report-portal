/**
 * ApiConfig.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Type definitions for API configuration.
 * Contains enums and types for configuring the application's API behavior,
 * including mode selection (mock/real), base URL, timeouts, and mock delay settings.
 */

export enum ApiMode {
  Mock,
  Real,
}

type MockDelayConfig = {
  readonly min: number
  readonly max: number
}

type AxiosConfig = {
  readonly timeout: number
  readonly headers: {
    readonly 'Content-Type': string
    readonly Accept: string
  }
}

export type ApiConfig = {
  mode: ApiMode
  readonly baseUrl: string
  readonly timeout: number
  readonly mockDelay: MockDelayConfig
  readonly axios: AxiosConfig
}
