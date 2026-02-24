import {
  type LoginCredentials,
  type RegisterData,
  type AuthResponse,
  UserRank,
} from '@types'
import {getApiDelay} from '@config'

const delay = (ms: number) =>
  new Promise(resolve => setTimeout(() => resolve(undefined), ms))

type MockUser = {
  id: string
  email: string
  password: string
  name: string
  rank: UserRank
}

const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'Password123!',
    name: 'John Doe',
    rank: UserRank.User,
  },
  {
    id: '2',
    email: 'admin@example.com',
    password: 'Password123!',
    name: 'Admin User',
    rank: UserRank.Admin,
  },
]

export const mockLogin = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  await delay(getApiDelay())

  const user = mockUsers.find(
    user =>
      user.email === credentials.email &&
      user.password === credentials.password,
  )

  if (!user) {
    const error = new Error('Invalid email or password')

    ;(error as any).response = {
      status: 401,
      data: {message: 'Invalid email or password'},
    }

    throw error
  }

  const mockToken = `mock.jwt.token.${user.id}.${Date.now()}`

  const {id, email, name, rank} = user

  return {
    token: mockToken,
    user: {
      id,
      email,
      name,
      rank,
    },
  }
}

export const mockRegister = async (
  userData: RegisterData,
): Promise<AuthResponse> => {
  await delay(getApiDelay())

  const existingUser = mockUsers.find(user => user.email === userData.email)

  if (existingUser) {
    const error = new Error('Email already registered')

    ;(error as any).response = {
      status: 409,
      data: {message: 'Email already registered'},
    }

    throw error
  }

  const {email, password, name} = userData

  const newUser: MockUser = {
    id: (mockUsers.length + 1).toString(),
    email: email,
    password: password,
    name: name,
    rank: UserRank.User,
  }

  mockUsers.push(newUser)

  const mockToken = `mock.jwt.token.${newUser.id}.${Date.now()}`

  return {
    token: mockToken,
    user: newUser,
  }
}
