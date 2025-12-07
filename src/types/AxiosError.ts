interface AxiosErrorResponse {
  status: number;           // 404
  statusText: string;      // "Not Found"
  data: {
    reason: string;        // "notFound" ← EL DATO MÁS RELEVANTE
    // Otros campos que pueda devolver la API
    [key: string]: any;
  };
}

export interface AxiosError {
  response?: AxiosErrorResponse;
  message: string;         // "Request failed with status code 404"
  code?: string;          // "ERR_BAD_REQUEST"
  config?: {
    url?: string;         // "/players/%23ULG"
    method?: string;      // "get"
  };
}
