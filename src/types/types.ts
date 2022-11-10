import type { JwtPayload } from "jsonwebtoken";
import type { Request } from "express";

export interface Username {
  username: string;
}
export interface UserCredentials {
  username: string;
  password: string;
}

export interface RegisterData extends UserCredentials {
  email: string;
}

export interface ItemId {
  id: string;
}

export interface ItemName {
  name: string;
}

export interface UserTokenPayload extends JwtPayload {
  id: string;
  username: string;
}

export interface CustomRequest extends Request {
  userId: string;
}
