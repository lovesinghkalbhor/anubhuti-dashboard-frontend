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
export type {
  loginInterface,
  customResponse,
  RegisterInterface,
  UpdateUserInterface,
  DonationDataInterface,
  ItemInterface,
};
