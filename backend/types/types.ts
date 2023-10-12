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


export type {
  tSignUp,
  tSignIn,
  tSetToggleSignIn
}