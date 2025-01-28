import { Role } from "@/util/enum/role.enum";

export interface ILoginResponse {
  userName: string,
  id: number,
  role: Role,
  accessToken: string
}