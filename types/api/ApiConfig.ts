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
