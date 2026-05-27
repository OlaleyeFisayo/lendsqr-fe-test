import { Icon } from "@iconify/react";
import { Avatar } from "radix-ui";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";
import Logo from "@/shared/ui/logo";
import "./layout-header.scss";

type LayoutHeaderProps = {
  onMenuClick?: () => void;
};

export default function LayoutHeader({ onMenuClick }: LayoutHeaderProps) {
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
        <div className="user-details">
          <Avatar.Root className="avatar-root">
            <Avatar.Image
              alt="user avatar"
              src="/avatar-image.png"
              className="avatar-image"
            />
          </Avatar.Root>
          <p className="avatar-name">
            Adedeji
            <Icon
              icon="tabler:caret-down-filled"
              width="19"
              height="22"
              aria-hidden="true"
            />
          </p>
        </div>
      </section>
    </header>
  );
}
