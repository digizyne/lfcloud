const user = () => useState<string | null>("user", () => null);
const loggedIn = () => useState<boolean>("loggedIn", () => false);

export const useAuth = () => {
  return {
    user: user(),
    loggedIn: loggedIn(),
  };
};
