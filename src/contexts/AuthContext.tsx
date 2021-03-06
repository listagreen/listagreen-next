import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { api } from "../services/api";

type User = {
  email: string;
  permissions: string;
  profile: string;
};

type SignInCrendentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn({ email, password }: SignInCrendentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  destroyCookie(undefined, "listagreen.token");
  destroyCookie(undefined, "listagreen.refreshToken");

  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "listagreen.token": token } = parseCookies();

    if (token) {
      api
        .get("/users/me")
        .then((response) => {
          const { email, permissions, profile } = response.data;

          setUser({ email, permissions, profile });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCrendentials) {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { token, refresh_token, permissions, profile } = response.data;

      setCookie(undefined, "listagreen.token", token, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      setCookie(undefined, "listagreen.refreshToken", refresh_token, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      setUser({
        email,
        permissions,
        profile,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
