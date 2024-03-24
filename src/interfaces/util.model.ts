export interface IServiceResponseDTO<T> {
  isSuccess: boolean;
  message?: string;
  data: T;
}
