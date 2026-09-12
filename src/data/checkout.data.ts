import { CustomerData } from "./data.types";

export const checkoutData: Record<string, CustomerData> = {
  standardCustomer: {
    firstName: "Shajan",
    lastName: "Baikari",
    postalCode: "462001",
  },
  alternateCustomer: {
    firstName: "Test",
    lastName: "User",
    postalCode: "123456",
  },
} as const;
