import { StatusMap } from "elysia";

const AUTH_SECRET = Bun.env.AUTH_SECRET;

export function isAuthSecretAvailable(): boolean {
  return typeof AUTH_SECRET === "string" && AUTH_SECRET.trim().length > 0;
}

export class AuthService {
  static async verify(secret: string) {
    return secret === AUTH_SECRET;
  }
}

export class UnauthorizedError extends Error {
  status: number = StatusMap.Unauthorized;
  message = "Unauthorized";
  constructor() {
    super();
    this.name = "Unauthorized";
  }

  toResponse() {
    return Response.json(
      {
        error: this.message,
      },
      {
        status: this.status,
      }
    );
  }
}
