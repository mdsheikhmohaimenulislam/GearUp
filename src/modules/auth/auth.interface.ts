import { Role } from "../../../generated/prisma/enums";

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
  role?:Role
}
