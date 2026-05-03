import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { User } from "../types/user";
import { formatAddress } from "../utils/formatAddress";

export type UserCardProps = {
  user: User;
};

function UserCardComponent({ user }: UserCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.address}>{formatAddress(user.address)}</Text>
    </View>
  );
}

const UserCard = memo(UserCardComponent);

const styles = StyleSheet.create({
  card: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "#f4f4f5",
  },
  name: {
    fontSize: 17,
    fontWeight: "600",
    color: "#18181b",
  },
  email: {
    marginTop: 4,
    fontSize: 14,
    color: "#52525b",
  },
  address: {
    marginTop: 8,
    fontSize: 14,
    color: "#3f3f46",
    lineHeight: 20,
  },
});

export default UserCard;
