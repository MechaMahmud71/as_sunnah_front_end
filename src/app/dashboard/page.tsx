"use client"

import Navbar from '@/components/ui/nav';
import { verifyAuth } from '@/util/functions/authentication.function';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchDonations } from './api';
import { toast } from 'react-toastify';
import DonationRow from '@/components/ui/DonationRow';
import LoadingModal from '@/components/ui/laoder';
import { DonationsResponse } from './interfaces/dashboard.interface';
import { Card, CardContent } from '@/components/ui/Card';
import DonationDetailsCard from '@/components/ui/SingleDonationCard';


type Donation = {
  id: number;
  amount: number;
  donationTime: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  message?: string;
};

export default function DashboardPage() {

  const [loading, setLoading] = useState<boolean>(true);
  const [donations, setDonations] = useState<Donation[] | []>([]);
  const [donationResponse, setDonationResponse] = useState<DonationsResponse>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [donationDetails, setDonationDetails] = useState<Donation>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const authStatus = verifyAuth("dashboard");
    if (!authStatus) {
      redirect("/auth/login");
    }
  }, []);

  useEffect(() => {
    getDonation(currentPage);
  }, [currentPage])

  async function getDonation(currentPage: number) {
    const response = await fetchDonations(currentPage);
    if (!response.success) {
      toast.error(response.message);
    } else {
      setDonationResponse((response.data) as DonationsResponse)
      setDonations((response?.data?.donations) as Donation[])
    }
    setLoading(false)
  }

  function getDonationDetails(donation: Donation) {
    setOpenModal(true);
    setDonationDetails(donation);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= (donationResponse?.total as number)) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Navbar />
      {loading && <LoadingModal />}
      <div className='p-6'>
        {!loading && (
          <div>
            <div className='flex justify-center items-center mb-6 mt-6'>
              <Card className="w-full max-w-md shadow-xl rounded-2xl">
                <CardContent className="p-6 text-center">
                  <h1 className="text-2xl font-bold text-gray-800">
                    Total Donation Amount
                  </h1>
                  <p className="text-lg text-gray-600 mt-2">
                    {donationResponse?.totalAmount || 0} Taka
                  </p>
                </CardContent>
              </Card>
            </div>
            <DonationRow isDelete={false} currentPage={currentPage} getDonation={getDonation} fromUser={false} />
            {donations.map((donation) => (
              <DonationRow
                key={donation.id}
                id={donation.id}
                donorName={donation.userName}
                amount={donation.amount}
                donationTime={donation.donationTime}
                handleDonation={() => { getDonationDetails(donation) }}
                currentPage={currentPage}
                getDonation={getDonation}
                isDelete={true}
                fromUser={false}
              />
            ))}
          </div>
        )}
      </div>
      {
        openModal && (
          <DonationDetailsCard donationDetails={donationDetails as Donation} handleClose={() => handleCloseModal()} />
        )
      }
      <div className="flex items-center justify-center space-x-2 mt-4 mb-4">
        <div className="join">
          <button className="join-item btn" disabled={donationResponse?.previousPage !== null ? false : true} onClick={() => handlePageChange(currentPage - 1)}>«</button>
          <button className="join-item btn">Page {currentPage} of {donationResponse?.totalPage as number}</button>
          <button className="join-item btn" disabled={donationResponse?.nextPage !== null ? false : true} onClick={() => handlePageChange(currentPage + 1)}>»</button>
        </div>
      </div>
    </>
  )
}
