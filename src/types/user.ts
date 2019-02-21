export interface ISignInByEmail {
  email: string
  password: string
}

export interface ISignInByPhone {
  phoneNumber: string
  password: string
}

export interface ISignUpByEmail {
  currency: string
  email: string
  firstName: string
  lastName: string
  nationality: string
  password: string
  passwordConfirm: string
  username: string
}

export interface ISignUpByPhone {
  phoneNumber: string
  password: string
}

export enum UserRoles {
  Regular,
}

export interface IUser {
  avatar: Express.Multer.File
  email: string
  id: number
  phoneNumber: string
  role: UserRoles
}

export interface IUserInfos {
  user: IUser | undefined
  token: string | undefined
}
