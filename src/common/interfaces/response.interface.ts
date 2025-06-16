export interface ResponseDto<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponseDto<T> extends ResponseDto<T> {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
