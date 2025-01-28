import { IBaseResponse } from "@/util/interfaces/response.interfaces";
import { ILoginResponse } from "../interfaces/auth.interfaces";
import { config } from "@/environment/config";


const API_REGISTRATION_URL = `${config.api_base_url}/auth/user/register`; // Example URL, adjust it based on your config

export const registerUser = async (formData: { email: string; password: string, userName: string }): Promise<IBaseResponse<ILoginResponse>> => {
  try {
    const response = await fetch(API_REGISTRATION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data: IBaseResponse<ILoginResponse> = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message)
  }
}