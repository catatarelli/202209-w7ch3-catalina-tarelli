import type { RegisterData, User, UserCredentials } from "../types/types";

export const itemsMock = {
  name: "banana",
};

export const userMock: User = {
  username: "paquito",
  password: "paquito123",
};

export const userMockWithId: UserCredentials = {
  username: "paquito",
  password: "paquito123",
  _id: "ñlaksdjfl",
};

export const userMockCredentials: RegisterData = {
  username: "paquito",
  password: "paquito123",
  email: "paquito@gmail.com",
  _id: "ñasokdfjdsñlk",
};
