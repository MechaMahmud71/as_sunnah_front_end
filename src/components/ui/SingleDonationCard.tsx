import React from 'react';

type Donation = {
  id: number;
  amount: number;
  donationTime: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  message?: string;
};

interface DonationDetailsCardProps {
  donationDetails: Donation;
  handleClose: () => void;
}

const DonationDetailsCard: React.FC<DonationDetailsCardProps> = ({ donationDetails, handleClose }) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">Donation Details</h2>

        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <p className="text-gray-800 text-lg font-medium">
            <span className="text-gray-600">User Name: </span>{donationDetails.userName}
          </p>
          <p className="text-gray-800 text-lg font-medium">
            <span className="text-gray-600">Amount: </span>{donationDetails.amount} Taka
          </p>
          <p className="text-gray-800 text-lg font-medium">
            <span className="text-gray-600">Donation Time: </span>{new Date(donationDetails.donationTime).toLocaleString()}
          </p>
          <p className="text-gray-800 text-lg font-medium">
            <span className="text-gray-600">Message: </span>{donationDetails.message || "No message provided"}
          </p>
          <p className="text-gray-800 text-lg font-medium">
            <span className="text-gray-600">Updated At: </span>{new Date(donationDetails.updatedAt).toLocaleString()}
          </p>

          <div className="flex justify-end">
            <button
              onClick={handleClose}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 focus:outline-none transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetailsCard;
