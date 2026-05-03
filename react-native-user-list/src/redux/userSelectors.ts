import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const selectUsersState = (state: RootState) => state.users;

export const selectFilteredUsers = createSelector([selectUsersState], (s) => {
  const q = s.searchQuery.trim().toLowerCase();
  if (!q) return s.items;
  return s.items.filter((u) => u.name.toLowerCase().includes(q));
});

export const selectDisplayedUsers = createSelector(
  [selectFilteredUsers, selectUsersState],
  (filtered, s) => filtered.slice(0, s.visibleCount)
);

export const selectHasMoreUsers = createSelector(
  [selectFilteredUsers, selectUsersState],
  (filtered, s) => s.visibleCount < filtered.length
);
