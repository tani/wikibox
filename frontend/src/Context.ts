import { createContext } from "react";
interface ContextPrams {
  token?: string;
  login: (username: string, password: string) => Promise<void>;
}
export const { Provider, Consumer } = createContext<ContextPrams>({
  token: undefined,
  async login(username: string, password: string) {
    return;
  }
});
