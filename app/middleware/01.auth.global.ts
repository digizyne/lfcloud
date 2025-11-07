import * as jose from "jose";

export default defineNuxtRouteMiddleware((to, from) => {
  const { user, loggedIn } = useAuth();

  //   console.log("🔍 Global auth middleware executing", {
  //     server: import.meta.server,
  //     client: import.meta.client,
  //     to: to.path,
  //     from: from?.path,
  //   });

  const token = useCookie("auth.token");

  if (import.meta.server) {
    // console.log("🔧 SERVER: Global auth middleware on server side", {
    //   token: token.value,
    //   path: to.path,
    // });

    if (token.value) {
      const claims: any = jose.decodeJwt(token.value);
      //   console.log(claims);
      user.value = claims.username;
      loggedIn.value = true;
    } else {
      user.value = null;
      loggedIn.value = false;
    }

    if ((to.path === "/login" || to.path === "/") && loggedIn.value) {
      return navigateTo("/dashboard");
    }
  }

  if (import.meta.client) {
    // console.log("🔧 CLIENT: Global auth middleware on client side", {
    //   token: token.value,
    //   path: to.path,
    // });

    // console.log("🔧 CLIENT: Logged In State:", loggedIn.value);

    if ((to.path === "/login" || to.path === "/") && loggedIn.value) {
      return navigateTo("/dashboard");
    }
  }

  const nuxtApp = useNuxtApp();
  if (
    import.meta.client &&
    nuxtApp.isHydrating &&
    nuxtApp.payload.serverRendered
  ) {
    // console.log(
    //   "Global auth middleware during initial client load",
    //   token.value
    // );
  }
});
