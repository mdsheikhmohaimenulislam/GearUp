export interface ILoginUser {
  email: string;
  password: string;
}


export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?:string
  address?:string
  profilePhoto?: string;
}
