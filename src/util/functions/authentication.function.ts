import { Role } from "../enum/role.enum";
import Cookies from "js-cookie";

export const verifyAuth = (route: string) => {

  const allowedUserRoutes: string[] = ["donation", "donation/user"];

  const allowedAdminRoutes: string[] = ["dashboard"];

  const token = Cookies.get('token');

  if (!token) return false;

  const userRole = Cookies.get("role");

  if (userRole === Role.USER) {
    return true && allowedUserRoutes.includes(route);
  }

  if (userRole === Role.ADMIN) {
    return true && allowedAdminRoutes.includes(route);
  }

  return false;
}