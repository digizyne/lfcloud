export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const url = getRequestURL(event);
  const pathName = url.pathname.replace("/api", "");
  const token = getCookie(event, "auth.token");
  let body = null;
  if (isMethod(event, "POST")) {
    body = await readBody(event);
  }

  console.log(
    `Proxying request to backend: ${pathName} with token ${
      token ? "present" : "absent"
    }`
  );

  let options: any = {
    method: event.req.method,
    headers: {
      ...event.req.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const targetUrl = runtimeConfig.controllerBaseUrl + pathName;
  return await $fetch(targetUrl, options);
});
