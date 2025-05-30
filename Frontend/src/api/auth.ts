import client from './client';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await client.post('/users/register', data);
  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await client.post('/users/login', data);
  return response.data;
};

export const getProfile = async (): Promise<Omit<AuthResponse, 'token'>> => {
  const response = await client.get('/users/profile');
  return response.data;
};