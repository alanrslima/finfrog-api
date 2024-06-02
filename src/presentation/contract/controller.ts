import { HttpResponse } from "./http-response";

export interface Controller<T = any> {
  handle: (params: T) => Promise<HttpResponse<any>>;
}
