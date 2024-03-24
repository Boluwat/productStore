import { Document } from "mongoose";

export interface IUserDocument extends Document {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateUserDTO {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
}

export interface IUserDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile?: string;
}

export interface IUserLoginSuccessResponseDTO {
  user: IUserDTO;
  token: string;
}

export interface IUserLoginDTO {
  email: string;
  password: string;
}

export interface IUserLoginTokenDTO {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}
