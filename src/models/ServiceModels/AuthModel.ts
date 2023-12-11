/* API Data Types ----------------------------------------------------------------- */
export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  loginType: string;
};

export type RegisterResponse = {
  status: string;
  code: string;
  msg: string;
  data: {
    tokens: string;
    users: [];
  };
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  status: string;
  code: string;
  msg: string;
  data: {};
};

export type refreshTokenRequest = {
  refreshToken: string;
};

export type refreshTokenResponse = {
  status: string;
  code: string;
  msg: string;
  data: {
    token: string;
  };
};

export type logoutRequest = {
  refreshToken: string;
};

export type logoutResponse = {
  status: string;
  code: string;
  msg: string;
  data: [];
};

/* Child Types ----------------------------------------------------------- */

/* Error Type --------------------------------------------------------------- */
export type CustomError = {
  data: {
    code: number;
    message: string;
  };
};
