interface customResponse {
  apiResponse: any;
  storageStatus: boolean;
}

interface RegisterInterface {
  name: string;
  mobile: string;
  email: string;
  adhar_card: string;
  password: string;
  confirmPassword: string;
}

interface loginInterface {
  mobile: string;
  password: string;
}
interface UpdateUserInterface {
  name: string | null;
  mobile: string | null;
  email: string | null;
  adhar_card: string | null;
}
interface ItemInterface {
  name: string;
  quantity: string;
  approxAmount: string;
}
interface DonationDataInterface {
  donorName: string;
  phoneNumber: string;
  aadhar?: string; // Made optional to align with Prisma model
  pan?: string; // Made optional to align with Prisma model
  address: string;
  amount?: number; // Made optional to allow item donations
  items?: ItemInterface[]; // Made optional for monetary donations
  purpose: string;
  // authorizedPersonName: string;
  // authorizedPersonId: number;
}
interface DonationListInterface {
  receiptNo: number;
  date: string;
  authorizedPersonName: string;
  donorName: string;
  phoneNumber: string;
  amount: number;
  _count: any;
}
enum DonationCategory {
  SCHOOL_HOSTEL_OPERATIONS = "Donation for operational activities of school and hostel",
  LIFETIME_MEMBERSHIP = "Donation for Life time membership",
  LIFETIME_LUNCH = "Donation for Life time lunch",
  IN_KIND = "Donation in-kind",
  LAND_AND_BUILDING = "Donation for Land and building",
  OTHER = "Donation for Any other",
}
interface PaginationState {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

export type {
  loginInterface,
  customResponse,
  RegisterInterface,
  UpdateUserInterface,
  DonationDataInterface,
  ItemInterface,
  PaginationState,
  DonationListInterface,
};
export { DonationCategory };
