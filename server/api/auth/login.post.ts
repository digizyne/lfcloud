import * as jose from "jose";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const body = await readBody(event);
  const { token } = await $fetch<any>(
    `${runtimeConfig.controllerBaseUrl}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  setCookie(event, "auth.token", token, {
    httpOnly: true,
    secure: false, // TODO: set to true in production
    maxAge: 3600, // 1 hour
    path: "/",
    domain: "",
  });

  const claims: any = jose.decodeJwt(token);
  return {
    loggedIn: true,
    user: claims.username,
  };
});
