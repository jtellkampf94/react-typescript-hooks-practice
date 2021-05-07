export const login = async (username: string, password: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "username" && password === "password") {
        resolve(true);
      } else {
        reject(false);
      }
    }, 1000);
  });
};
