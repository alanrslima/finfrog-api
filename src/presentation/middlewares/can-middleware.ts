import { ForbiddenError } from "../../error/forbidden-error";
import { HttpResponse } from "../contract/http-response";
import { Middleware } from "../contract/middleware";
import { ok } from "../helpers/http-helper";

export class CanMiddleware implements Middleware {
  constructor(private readonly permissions: string[]) {}

  private canAccess(userPermissions?: string[]) {
    for (let index = 0; index < this.permissions.length; index++) {
      const permission = this.permissions[index];
      const hasPermission = userPermissions?.some(
        (userPermission) => userPermission === permission
      );
      if (!hasPermission) return false;
    }
    return true;
  }

  async handle(request: AuthMiddlewareRequest): Promise<HttpResponse<any>> {
    const { user } = request;
    if (this.canAccess(user?.permissions)) {
      return ok({});
    } else {
      throw new ForbiddenError();
    }
  }
}

export type AuthMiddlewareRequest = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    permissions: string[];
  };
};
