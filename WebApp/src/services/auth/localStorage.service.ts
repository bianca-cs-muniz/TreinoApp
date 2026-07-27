class LocalStorageService {
  saveToken = (token: string) => localStorage.setItem("token", token);

  saveObject = (obj: any, key: string) =>
    localStorage.setItem(key, JSON.stringify(obj));

  getObject = (key: string) => JSON.parse(localStorage.getItem(key)!);

  removeToken = () => localStorage.removeItem("token");

  getToken = () => localStorage.getItem("token");
}

export default new LocalStorageService();
