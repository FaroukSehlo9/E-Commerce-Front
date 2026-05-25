export interface GeneralResponse<T> {
    message: string;
    resource: T;
    resourceCount: number;
    status: number;
    success: boolean;
  }
