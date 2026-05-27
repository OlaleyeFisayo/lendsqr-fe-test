import usersData from "./users.json";

export type UserStatus = "Active" | "Inactive" | "Pending" | "Blacklisted";

export type DashboardUser = {
  accountBalance: string;
  accountNumber: string;
  bankName: string;
  dateJoined: string;
  educationAndEmployment: {
    durationOfEmployment: string;
    employmentStatus: string;
    levelOfEducation: string;
    loanRepayment: string;
    monthlyIncome: string;
    officeEmail: string;
    sectorOfEmployment: string;
  };
  email: string;
  fullName: string;
  guarantor: {
    emailAddress: string;
    fullName: string;
    phoneNumber: string;
    relationship: string;
  };
  id: string;
  organization: string;
  personalInformation: {
    bvn: string;
    children: string;
    emailAddress: string;
    fullName: string;
    gender: string;
    maritalStatus: string;
    phoneNumber: string;
    typeOfResidence: string;
  };
  phoneNumber: string;
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  status: UserStatus;
  tier: number;
  userCode: string;
  username: string;
};

export type UserTableRow = Pick<
  DashboardUser,
  "dateJoined" | "email" | "id" | "organization" | "phoneNumber" | "status" | "username"
>;

export const dashboardUsers = usersData.users as DashboardUser[];

export const userTableData: UserTableRow[] = dashboardUsers.map(user => ({
  dateJoined: user.dateJoined,
  email: user.email,
  id: user.id,
  organization: user.organization,
  phoneNumber: user.phoneNumber,
  status: user.status,
  username: user.username,
}));

export const organizations = Array.from(new Set(dashboardUsers.map(user => user.organization)));

export function getDashboardUserById(userId: string | undefined) {
  return dashboardUsers.find(user => user.id === userId);
}
