import type { DataTableColumn } from "@/shared/ui/table";
import { Icon } from "@iconify/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { Link } from "react-router";
import DataTable from "@/shared/ui/table";
import activateUserIcon from "../../../assets/dropdown-activate-user.svg";
import blacklistUserIcon from "../../../assets/dropdown-blacklist-user.svg";
import eyeIcon from "../../../assets/dropdown-eye.svg";
import BlacklistUserDialog from "../blacklist-user-dialog";
import "./user-table.scss";

type UserTableRow = {
  dateJoined: string;
  email: string;
  organization: string;
  phoneNumber: string;
  status: string;
  username: string;
  id: string;
};

const organizations = ["Lendsqr", "Irorun", "Lendstar"];
const users = [
  {
    email: "adedeji@lendsqr.com",
    phoneNumber: "08078903721",
    username: "Adedeji",
  },
  {
    email: "debby2@irorun.com",
    phoneNumber: "08160780928",
    username: "Debby Ogana",
  },
  {
    email: "grace@lendstar.com",
    phoneNumber: "07060780922",
    username: "Grace Effiom",
  },
  {
    email: "tosin@lendsqr.com",
    phoneNumber: "07003309226",
    username: "Tosin Dokunmu",
  },
  {
    email: "tosin@lendsqr.com",
    phoneNumber: "08060780900",
    username: "Tosin Dokunmu",
  },
];
const dates = ["May 15, 2020 10:00 AM", "Apr 30, 2020 10:00 AM", "Apr 10, 2020 10:00 AM"];
const statuses = ["Inactive", "Pending", "Blacklisted", "Pending", "Active", "Active", "Blacklisted", "Inactive", "Inactive"];

const userTableData: UserTableRow[] = Array.from({ length: 500 }, (_, index) => {
  const user = users[index % users.length];
  const organization = organizations[index % organizations.length];

  return {
    dateJoined: dates[index % dates.length],
    email: user.email,
    id: String(index + 1),
    organization,
    phoneNumber: user.phoneNumber,
    status: statuses[index % statuses.length],
    username: user.username,
  };
});

const userTableColumns: DataTableColumn<UserTableRow>[] = [
  {
    accessorKey: "organization",
    filterOptions: organizations.map(organization => ({
      label: organization,
      value: organization,
    })),
    filterType: "select",
    header: "Organization",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "dateJoined",
    filterType: "date",
    header: "Date Joined",
  },
  {
    accessorKey: "status",
    cell: value => (
      <span className={`user-table-status user-table-status--${String(value).toLowerCase()}`}>
        {String(value)}
      </span>
    ),
    filterOptions: ["Active", "Inactive", "Pending", "Blacklisted"].map(status => ({
      label: status,
      value: status,
    })),
    filterType: "select",
    header: "Status",
  },
];

function UserTableActions({
  onActivate,
  onBlacklist,
  status,
  userId,
  userName,
}: {
  onActivate: (userId: string) => void;
  onBlacklist: (userId: string) => void;
  status: string;
  userId: string;
  userName: string;
}) {
  const [isBlacklistDialogOpen, setIsBlacklistDialogOpen] = useState(false);
  const normalizedStatus = status.toLowerCase();
  const canActivateUser = normalizedStatus !== "active";
  const canBlacklistUser = normalizedStatus !== "blacklisted";

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="user-table-action"
            type="button"
            aria-label="Open user actions"
          >
            <Icon
              icon="tabler:dots-vertical"
              aria-hidden="true"
            />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="user-table-action-menu"
            align="end"
            sideOffset={4}
          >
            <DropdownMenu.Item
              className="user-table-action-menu-item"
              asChild
            >
              <Link to={`/users/${userId}`}>
                <img
                  src={eyeIcon}
                  alt=""
                  aria-hidden="true"
                />
                <span>View Details</span>
              </Link>
            </DropdownMenu.Item>
            {canBlacklistUser && (
              <DropdownMenu.Item
                className="user-table-action-menu-item"
                onSelect={() => setIsBlacklistDialogOpen(true)}
              >
                <img
                  src={blacklistUserIcon}
                  alt=""
                  aria-hidden="true"
                />
                <span>Blacklist User</span>
              </DropdownMenu.Item>
            )}
            {canActivateUser && (
              <DropdownMenu.Item
                className="user-table-action-menu-item"
                onSelect={() => onActivate(userId)}
              >
                <img
                  src={activateUserIcon}
                  alt=""
                  aria-hidden="true"
                />
                <span>Activate User</span>
              </DropdownMenu.Item>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <BlacklistUserDialog
        open={isBlacklistDialogOpen}
        userName={userName}
        onConfirm={() => onBlacklist(userId)}
        onOpenChange={setIsBlacklistDialogOpen}
      />
    </>
  );
}

export default function UserTable() {
  const [tableData, setTableData] = useState(userTableData);

  function updateUserStatus(userId: string, status: UserTableRow["status"]) {
    setTableData(currentData => currentData.map(user =>
      user.id === userId
        ? {
            ...user,
            status,
          }
        : user));
  }

  return (
    <DataTable
      columns={userTableColumns}
      data={tableData}
      initialPageSize={10}
      pageSizeOptions={[10, 25]}
      rowActions={row => (
        <UserTableActions
          onActivate={userId => updateUserStatus(userId, "Active")}
          onBlacklist={userId => updateUserStatus(userId, "Blacklisted")}
          status={row.status}
          userId={row.id}
          userName={row.username}
        />
      )}
    />
  );
}
