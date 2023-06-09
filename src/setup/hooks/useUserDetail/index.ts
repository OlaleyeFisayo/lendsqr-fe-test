import { useState, useEffect } from "react";
import { getUserDetails, UserDetail } from "../../api/getUserDetail";

type ErrorType = {
  message: string;
  statusText: string;
  status: number;
} | null;

interface UserDetailsHook {
  userDetail: UserDetail;
  error: ErrorType;
}

const useUserDetail = (id: string): UserDetailsHook => {
  const [userDetail, setUserDetail] = useState<UserDetail>({} as UserDetail);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const data = await getUserDetails(id);
        setUserDetail(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err);
      }
    }

    fetchUserDetails();
  }, [id]);

  return { userDetail, error };
};

export default useUserDetail;
