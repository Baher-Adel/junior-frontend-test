import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { USERS_CACHE_KEY } from "../constants/cache";
import type { User } from "../types/user";
import { fetchUsers as fetchUsersApi } from "../Api/userAPI";

export type { User } from "../types/user";

export const INITIAL_VISIBLE_COUNT = 4;
export const LOAD_MORE_INCREMENT = 2;

export interface UsersState {
  items: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchQuery: string;
  visibleCount: number;
}

const initialState: UsersState = {
  items: [],
  status: "idle",
  error: null,
  searchQuery: "",
  visibleCount: INITIAL_VISIBLE_COUNT,
};

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchUsersApi();
      await AsyncStorage.setItem(USERS_CACHE_KEY, JSON.stringify(data));
      return data;
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to fetch users";
      return rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    hydrateUsers: (state, action: PayloadAction<User[]>) => {
      state.items = action.payload;
      state.visibleCount = Math.min(
        INITIAL_VISIBLE_COUNT,
        action.payload.length
      );
      if (action.payload.length > 0) {
        state.status = "succeeded";
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.visibleCount = INITIAL_VISIBLE_COUNT;
    },
    loadMoreVisible: (state) => {
      state.visibleCount += LOAD_MORE_INCREMENT;
    },
    clearUsersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.visibleCount = Math.min(
          INITIAL_VISIBLE_COUNT,
          action.payload.length
        );
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ??
          action.error.message ??
          "Failed to fetch users";
      });
  },
});

export const { hydrateUsers, setSearchQuery, loadMoreVisible, clearUsersError } =
  userSlice.actions;
export default userSlice.reducer;
