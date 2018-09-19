import { createContext } from "react";
interface ContextPrams {
  token?: string;
  getToken: (username: string, password: string) => Promise<void>;
}
export const { Provider, Consumer } = createContext<ContextPrams>({
  token: undefined,
  async getToken(username: string, password: string) {
    return;
  }
});
