import { HttpResponse } from "../contract/http-response";

export const ok = (data: any): HttpResponse<any> => ({
  statusCode: 200,
  body: data,
});

export const created = (data: any): HttpResponse<any> => ({
  statusCode: 201,
  body: data,
});

export const noContent = (): HttpResponse<any> => ({
  statusCode: 204,
  body: null,
});
