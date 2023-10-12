type tSignUp = {
  username: string;
  email: string;
  password: string;
}

type tSignIn = {
  email: string;
  password: string;
}

type tSetToggleSignIn = {
  setToggleSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

type tUserAccount = object & {
  username?: string,
  email?: string,
  firstname?: string,
  lastname?: string,
  address?: string,
  phone?: string,
  birthday?: string,
}

export type {
  tSignUp,
  tSignIn,
  tSetToggleSignIn,
  tUserAccount
}