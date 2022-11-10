import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import type { UserCredentials } from "../types/types";

const usersFactory = Factory.define<UserCredentials>(() => ({
  username: faker.name.firstName(),
  password: faker.word.noun(),
}));

export const getRandomUsers = (totalUsers: number): UserCredentials[] =>
  usersFactory.buildList(totalUsers);
export const getRandomUser = () => usersFactory.build;
