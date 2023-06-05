export type UserDetail = {
  accountNumber: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar: string;
    bvn: string;
    phoneNumber: string;
  };
};

export async function getUserDetails(id: string) {
  const res = await fetch(
    `https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users/${id}`
  );
  if (!res.ok) {
    throw {
      message: "Failed to fetch user list",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data;
}
