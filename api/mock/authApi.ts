import type {LoginCredentials, RegisterData, AuthResponse} from '@types';
import {getApiDelay} from '@config';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockUsers = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'Password123!',
    name: 'John Doe',
  },
  {
    id: '2',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
  },
];

export const mockLogin = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  await delay(getApiDelay());

  const user = mockUsers.find(
    user =>
      user.email === credentials.email &&
      user.password === credentials.password,
  );

  if (!user) {
    const error = new Error('Invalid email or password');

    (error as any).response = {
      status: 401,
      data: {message: 'Invalid email or password'},
    };

    throw error;
  }

  const mockToken = `mock.jwt.token.${user.id}.${Date.now()}`;

  return {
    token: mockToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
};

export const mockRegister = async (
  userData: RegisterData,
): Promise<AuthResponse> => {
  await delay(getApiDelay());

  const existingUser = mockUsers.find(user => user.email === userData.email);

  if (existingUser) {
    const error = new Error('Email already registered');

    (error as any).response = {
      status: 409,
      data: {message: 'Email already registered'},
    };

    throw error;
  }

  const newUser = {
    id: (mockUsers.length + 1).toString(),
    email: userData.email,
    password: userData.password,
    name: userData.name,
  };

  mockUsers.push(newUser);

  const mockToken = `mock.jwt.token.${newUser.id}.${Date.now()}`;

  return {
    token: mockToken,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    },
  };
};
