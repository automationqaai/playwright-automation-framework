import type { CustomerData } from "../data.types";

const defaultCustomer: CustomerData = {
  firstName: "Automation",
  lastName: "qaai",
  postalCode: "462001",
};

export function createCustomer(
  overrides: Partial<CustomerData> = {},
): CustomerData {
  return {
    ...defaultCustomer,
    ...overrides,
  };
}
