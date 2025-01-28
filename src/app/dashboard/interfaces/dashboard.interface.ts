type Donation = {
  id: number;
  amount: number;
  donationTime: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
};

export interface DonationsResponse {
  donations: Donation[];
  total: number;
  page: number;
  limit: number;
  nextPage: number | null;
  previousPage: number | null;
  totalAmount: number;
  totalPage?: number
}
