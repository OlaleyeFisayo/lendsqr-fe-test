import { Icon } from "@iconify/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Avatar } from "radix-ui";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";
import Logo from "@/shared/ui/logo";
import "./layout-header.scss";

type LayoutHeaderProps = {
  onMenuClick?: () => void;
};

export default function LayoutHeader({ onMenuClick }: LayoutHeaderProps) {
  const navigate = useNavigate();

  function handleLogout() {
    toast.success("User has been logged out");
    void navigate("/");
  }

  return (
    <header id="layout-header">
      <button
        className="header-menu-button"
        type="button"
        aria-label="Open sidebar"
        onClick={onMenuClick}
      >
        <Icon
          icon="tabler:menu-2"
          aria-hidden="true"
        />
      </button>
      <Logo className="header-logo" />
      <Input
        placeholder="Search for anything"
        className="header-input"
      >
        <Button>
          <Icon
            icon="tabler:search"
          />
        </Button>
      </Input>
      <section className="header-actions">
        <a
          className="docs"
          href="/"
        >
          Docs
        </a>
        <Icon
          icon="tabler:bell"
          width="19"
          height="22"
          className="bell-icon"
        />
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="user-details"
              type="button"
              aria-label="Open account menu"
            >
              <Avatar.Root className="avatar-root">
                <Avatar.Image
                  alt="user avatar"
                  src="/avatar-image.png"
                  className="avatar-image"
                />
              </Avatar.Root>
              <span className="avatar-name">
                Adedeji
                <Icon
                  icon="tabler:caret-down-filled"
                  width="19"
                  height="22"
                  aria-hidden="true"
                />
              </span>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="header-user-menu"
              align="end"
              sideOffset={8}
            >
              <DropdownMenu.Item
                className="header-user-menu-item"
                onSelect={handleLogout}
              >
                <Icon
                  icon="tabler:logout"
                  aria-hidden="true"
                />
                <span>Log out</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </section>
    </header>
  );
}
