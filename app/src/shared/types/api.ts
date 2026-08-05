export type ActionResponse<D> = Promise<{
  success: boolean;
  errorMessage?: string;
  data?: D;
}>;
