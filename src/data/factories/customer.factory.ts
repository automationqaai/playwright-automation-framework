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

export function createUniqueCustomer(
  overrides: Partial<CustomerData> = {},
): CustomerData {
  const uniqueData = new Date().getTime().toString();
  return {
    ...defaultCustomer,
    ...overrides,
    firstName: overrides.firstName ?? `User${uniqueData}`,
    lastName: overrides.lastName ?? `Test${uniqueData}`,
  };
}
