export type User = {
  id: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  lastActiveDate: string;
};

export async function getAllUser() {
  const res = await fetch(
    "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users"
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

export type UserList = User[];
