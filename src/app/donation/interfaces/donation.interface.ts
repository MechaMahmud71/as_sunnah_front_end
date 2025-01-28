interface IUser {
  id: number;
  userName: string;
  role: string;
}

interface IDonation {
  amount: number;
  user: IUser;
  id: number;
  donationTime: string; // ISO 8601 date-time string
  createdAt: string; // ISO 8601 date-time string
  updatedAt: string; // ISO 8601 date-time string
  isDeleted?: boolean;
}
