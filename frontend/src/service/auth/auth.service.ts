import { acervoHttp } from "../api/axios";

export async function login(email: string, senha: string) {
  await acervoHttp.post("auth/login", { email, senha });
}

export async function logout() {
  await acervoHttp.post("auth/logout");
}

export async function getMe() {
  const { data } = await acervoHttp.get("/auth/me");
  return data;
}
