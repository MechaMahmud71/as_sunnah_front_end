export interface IBaseResponse<T> {
  success: boolean,
  message: string | null,
  data: T | null
}