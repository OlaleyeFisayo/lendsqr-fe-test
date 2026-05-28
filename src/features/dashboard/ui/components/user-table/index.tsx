import type {
  UserStatus,
  UserTableRow,
} from "../../../utils/users-data";
import type { DataTableColumn } from "@/shared/ui/table";
import { Icon } from "@iconify/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import DataTable from "@/shared/ui/table";
import activateUserIcon from "../../../assets/dropdown-activate-user.svg";
import blacklistUserIcon from "../../../assets/dropdown-blacklist-user.svg";
import eyeIcon from "../../../assets/dropdown-eye.svg";
import { organizations } from "../../../utils/users-data";
import { useUsersStore } from "../../../utils/users-store";
import BlacklistUserDialog from "../blacklist-user-dialog";
import "./user-table.scss";

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
  status: UserStatus;
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
  const users = useUsersStore(state => state.users);
  const updateUserStatus = useUsersStore(state => state.updateUserStatus);
  const tableData: UserTableRow[] = users.map(user => ({
    dateJoined: user.dateJoined,
    email: user.email,
    id: user.id,
    organization: user.organization,
    phoneNumber: user.phoneNumber,
    status: user.status,
    username: user.username,
  }));

  return (
    <DataTable
      columns={userTableColumns}
      data={tableData}
      initialPageSize={10}
      pageSizeOptions={[10, 25, 50, 75, 100]}
      rowActions={row => (
        <UserTableActions
          onActivate={(userId) => {
            updateUserStatus(userId, "Active");
            toast.success("User has been activated");
          }}
          onBlacklist={(userId) => {
            updateUserStatus(userId, "Blacklisted");
            toast.success("User has been blacklisted");
          }}
          status={row.status}
          userId={row.id}
          userName={row.username}
        />
      )}
    />
  );
}
