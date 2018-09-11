import { createContext } from "react";
interface ContextPrams {
  sessionToken?: string;
  login: (username: string, password: string) => Promise<void>;
}
export const { Provider, Consumer } = createContext<ContextPrams>({
  sessionToken: undefined,
  async login(username: string, password: string) {
    return;
  }
});
