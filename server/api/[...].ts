export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  const pathName = url.pathname.replace("/api", "");
  const token = getCookie(event, "auth.token");
  //   const body = await readBody(event);
  //   console.log("Request body:", body);

  console.log(
    `Proxying request to backend: ${pathName} with token ${
      token ? "present" : "absent"
    }`
  );

  return await $fetch(`http://localhost:8080/api/v1${pathName}`, {
    method: event.req.method,
    headers: {
      ...event.req.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
    // body,
  });
});
