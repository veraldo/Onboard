export interface GetParams {
  id?: string;
  token: string;
  page?: number;
  window?: number;
}

export interface MessageBody {
  id?: string;
  name?: string;
  role?: string;
  email?: string;
  password?: string;
  token?: string
  rememberMe?: boolean;
  errorMessage?: string;
}
