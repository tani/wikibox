import { createContext } from "react";
import Api from "./api";
export const { Provider, Consumer } = createContext({
  api: new Api(),
  async login(username: string, password: string) {}
});
