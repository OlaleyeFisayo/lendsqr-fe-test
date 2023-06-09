import { useState, useEffect } from "react";
import { getAllUser, User } from "../../api/getAllUser";

type ErrorType = {
  message: string;
  statusText: string;
  status: number;
} | null;

interface UserListHook {
  users: User[];
  error: ErrorType;
}

const useUserList = (): UserListHook => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const data = await getAllUser();
        setUsers(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err);
      }
    };

    fetchUserList();
  }, []);

  return { users, error };
};

export default useUserList;
