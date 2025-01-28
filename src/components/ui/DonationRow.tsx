"use client"
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./Button";
import { config } from "@/environment/config";
import Cookies from "js-cookie";

interface DonationRowProps {
  id?: number,
  donorName?: string;
  amount?: number;
  donationTime?: string;
  currentPage: number
  handleDonation?: () => void;
  isDelete?: boolean
  fromUser?: boolean
  getDonation: (pageNumber: number) => void
};

const API_DONATION_URL = `${config.api_base_url}/donations`;

const DonationRow: React.FC<DonationRowProps> = ({
  id,
  donorName,
  amount,
  donationTime,
  handleDonation,
  currentPage,
  isDelete,
  fromUser = false,
  getDonation
}) => {
  async function handleDelete(id: number) {

    const token = Cookies.get("token");

    try {
      const response = await fetch(`${API_DONATION_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (response.ok) {
        getDonation(currentPage)
      }

    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  return (
    <div className="flex items-center items-center border">
      <div onClick={handleDonation} className={fromUser === true ? " w-[100%] cursor-pointer flex items-center justify-between bg-white p-4 hover:shadow-lg" : " w-[80%] cursor-pointer flex items-center justify-between bg-white p-4 hover:shadow-lg"}>
        <div className="flex-1 flex items-center">
          <p className="text-lg font-semibold text-gray-800 text-center w-[100%]">{id ?? "Donation Id"}</p>
        </div>
        <div className="flex-1">
          <p className="text-lg text-center font-semibold text-gray-800">{donorName ?? "Donor Name"}</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-lg text-green-600 font-medium text-center">{amount ? Number(amount).toFixed(2) + "Taka" : "Amount"}</p>
        </div>
        <div className="flex-1 text-right">
          <p className="text-sm text-gray-500 text-center">{donationTime ? new Date(donationTime as string).toLocaleString() : "Donation Time"}</p>
        </div>
      </div>
      {fromUser === false && <div className="w-[20%]" >
        {isDelete && <div className="flex-1 flex justify-center items-center text-center">
          <Button onClick={() => handleDelete(id as number)}>
            Delete
          </Button>
        </div>}
        {(isDelete === false) && (
          <div className="flex-1 right">
            <p className="text-sm text-gray-500 text-center">Action</p>
          </div>
        )}
      </div>}
    </div>


  );
};


export default DonationRow;
