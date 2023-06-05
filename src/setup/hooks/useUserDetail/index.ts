import { useState, useEffect } from "react";
import { getUserDetails, UserDetail } from "../../api/getUserDetail";

type ErrorType = Error | null;

interface UserDetailsHook {
  userDetail: UserDetail;
  error: ErrorType;
}

const useUserDetail = (id: string): UserDetailsHook => {
  const [userDetail, setUsers] = useState({} as UserDetail);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const data = await getUserDetails(id);
        setUsers(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err as Error);
      }
    };

    fetchUserList();
  }, [id]);

  return { userDetail, error };
};

export default useUserDetail;
