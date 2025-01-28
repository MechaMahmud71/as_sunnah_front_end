import { IBaseResponse } from "@/util/interfaces/response.interfaces";
import { config } from "@/environment/config";
import Cookies from 'js-cookie'
import { DonationsResponse } from "@/app/dashboard/interfaces/dashboard.interface";

const API_DONATION_URL = `${config.api_base_url}/donations/user`;

export const fetchDonations = async (page: number = 1): Promise<IBaseResponse<DonationsResponse>> => {

  const token = Cookies.get("token") as string;

  try {
    const response = await fetch(`${API_DONATION_URL}?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const data: IBaseResponse<DonationsResponse> = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message)
  }
};
