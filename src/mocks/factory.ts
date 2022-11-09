import { Factory } from "fishery";
import type { User } from "../types/types";
import { faker } from "@faker-js/faker";

const usersFactory = Factory.define<User>(() => ({
  username: faker.name.firstName(),
  password: faker.word.noun(),
}));

export const getRandomUsers = (totalUsers: number): User[] =>
  usersFactory.buildList(totalUsers);
export const getRandomUser = () => usersFactory.build;
