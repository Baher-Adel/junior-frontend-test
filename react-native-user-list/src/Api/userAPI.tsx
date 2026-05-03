import type { User } from "../types/user";

const API_URL = "https://jsonplaceholder.typicode.com/users";

interface AddressDto {
  street: string;
  city: string;
  zipcode: string;
}

interface UserDto {
  id: number;
  name: string;
  email: string;
  address: AddressDto;
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data: UserDto[] = await response.json();
  return data.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    address: {
      street: user.address.street,
      city: user.address.city,
      zipcode: user.address.zipcode,
    },
  }));
};

export { fetchUsers };
