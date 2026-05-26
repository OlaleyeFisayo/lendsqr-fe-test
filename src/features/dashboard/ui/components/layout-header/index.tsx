import { Icon } from "@iconify/react";
import { Avatar } from "radix-ui";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";
import Logo from "@/shared/ui/logo";
import "./layout-header.scss";

export default function LayoutHeader() {
  return (
    <header id="layout-header">
      <Logo />
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
      <section>
        <p className="docs">Docs</p>
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
            />
          </p>
        </div>
      </section>
    </header>
  );
}
