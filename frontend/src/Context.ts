import { createContext } from "react";
export const { Provider, Consumer } = createContext<{
  sessionToken?: string,
  login: (username: string, password: string) => Promise<void>
}>({
  sessionToken: undefined,
  async login(username: string, password: string) {}
});
