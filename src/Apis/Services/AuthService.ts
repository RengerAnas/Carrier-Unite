import BaseApiService from "./BaseApiService";

class AuthService extends BaseApiService {
  authController = new AbortController();
  login(data: Record<string, unknown>) {
    return this.post("/auth/login", data);
  }
}
