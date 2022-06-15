import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";

interface AxiosErrorResponse {
  code?: string;
}

let cookies = parseCookies();

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${cookies["listagreen.token"]}`,
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<AxiosErrorResponse>) => {
    if (error.response.status === 401) {
      if (error.response.data?.code === "token.expired") {
        cookies = parseCookies();

        const { "listagreen.refreshToken": refresh_token } = cookies;

        api
          .post("/refresh", {
            refresh_token,
          })
          .then((response) => {
            const { token } = response.data;

            setCookie(undefined, "listagreen.token", token, {
              maxAge: 60 * 60 * 24 * 7, // 1 week
              path: "/",
            });

            setCookie(
              undefined,
              "listagreen.refreshToken",
              response.data.refresh_token,
              {
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: "/",
              }
            );

            api.defaults.headers["Authorization"] = `Bearer ${token}`;
          });
      } else {
        // deslogar usuário
      }
    }
  }
);
