import type {
  DashboardUser,
  UserStatus,
} from "./users-data";
import { create } from "zustand";
import { dashboardUsers } from "./users-data";

type UsersStore = {
  users: DashboardUser[];
  updateUserStatus: (userId: string, status: UserStatus) => void;
};

export const useUsersStore = create<UsersStore>(set => ({
  users: dashboardUsers,
  updateUserStatus: (userId, status) =>
    set(state => ({
      users: state.users.map(user =>
        user.id === userId
          ? {
              ...user,
              status,
            }
          : user),
    })),
}));
