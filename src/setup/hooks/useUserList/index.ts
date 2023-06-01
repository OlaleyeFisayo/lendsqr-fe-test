import { useState, useEffect } from "react";
import { getAllUser, User } from "../../api/getAllUser";

type ErrorType = Error | null;

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
      } catch (err: any) {
        setError(err as Error);
      }
    };

    fetchUserList();
  }, []);

  return { users, error };
};

export default useUserList;
