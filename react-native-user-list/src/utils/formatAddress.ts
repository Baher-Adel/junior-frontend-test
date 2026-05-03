import type { User } from "../types/user";

export function formatAddress(address: User["address"]): string {
  return `${address.street}, ${address.city}, ${address.zipcode}`;
}
