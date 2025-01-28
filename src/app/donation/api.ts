import { IBaseResponse } from "@/util/interfaces/response.interfaces";
import { config } from "@/environment/config";
import Cookies from 'js-cookie'

const API_DONATION_URL = `${config.api_base_url}/donations`;



export const Donate = async (formData: { amount: number; message?: string }): Promise<IBaseResponse<IDonation>> => {

  const token = Cookies.get("token") as string;

  try {
    const response = await fetch(API_DONATION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    });

    const data: IBaseResponse<IDonation> = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message)
  }
};
