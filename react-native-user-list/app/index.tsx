import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { USERS_CACHE_KEY } from "../src/constants/cache";
import UserCard from "../src/components/UserCard";
import { useAppDispatch, useAppSelector } from "../src/redux/hooks";
import {
  selectDisplayedUsers,
  selectHasMoreUsers,
} from "../src/redux/userSelectors";
import {
  fetchUsers,
  hydrateUsers,
  loadMoreVisible,
  setSearchQuery,
} from "../src/redux/userSlice";
import type { User } from "../src/types/user";

export default function Index() {
  const dispatch = useAppDispatch();
  const displayedUsers = useAppSelector(selectDisplayedUsers);
  const hasMore = useAppSelector(selectHasMoreUsers);
  const status = useAppSelector((s) => s.users.status);
  const error = useAppSelector((s) => s.users.error);
  const searchQuery = useAppSelector((s) => s.users.searchQuery);
  const itemCount = useAppSelector((s) => s.users.items.length);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const raw = await AsyncStorage.getItem(USERS_CACHE_KEY);
        if (cancelled || !raw) return;
        const parsed = JSON.parse(raw) as User[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch(hydrateUsers(parsed));
        }
      } catch {
        /* ignore bad cache */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const renderItem: ListRenderItem<User> = useCallback(
    ({ item }) => <UserCard user={item} />,
    []
  );

  const keyExtractor = useCallback((item: User) => String(item.id), []);

  const listHeader = useMemo(
    () => (
      <View style={styles.header}>
        <Text accessibilityRole="header" style={styles.welcomeTitle}>
          Welcome to user list
        </Text>
        <TextInput
          accessibilityLabel="Search users by name"
          placeholder="Search by name"
          placeholderTextColor="#a1a1aa"
          style={styles.search}
          value={searchQuery}
          onChangeText={(text) => dispatch(setSearchQuery(text))}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    ),
    [dispatch, error, searchQuery]
  );

  const listFooter = useMemo(() => {
    if (!hasMore) return null;
    return (
      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.loadMore,
          pressed && styles.loadMorePressed,
        ]}
        onPress={() => dispatch(loadMoreVisible())}
      >
        <Text style={styles.loadMoreText}>Load 2 more</Text>
      </Pressable>
    );
  }, [dispatch, hasMore]);

  const showInitialSpinner = status === "loading" && itemCount === 0;

  if (showInitialSpinner) {
    return (
      <SafeAreaView style={styles.centered} edges={["top", "left", "right", "bottom"]}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right", "bottom"]}>
      <FlatList
        data={displayedUsers}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        ListFooterComponent={listFooter}
        contentContainerStyle={styles.listContent}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  listContent: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#18181b",
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  search: {
    borderWidth: 1,
    borderColor: "#e4e4e7",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: "#18181b",
    backgroundColor: "#fafafa",
  },
  error: {
    marginTop: 8,
    color: "#b91c1c",
    fontSize: 14,
  },
  loadMore: {
    marginHorizontal: 16,
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#27272a",
    alignItems: "center",
  },
  loadMorePressed: {
    opacity: 0.88,
  },
  loadMoreText: {
    color: "#fafafa",
    fontSize: 16,
    fontWeight: "600",
  },
});
