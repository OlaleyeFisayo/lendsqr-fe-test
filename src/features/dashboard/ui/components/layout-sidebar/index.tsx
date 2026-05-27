import { Icon } from "@iconify/react";
import { NavLink } from "react-router";
import { SIDEBAR_DATA } from "@/features/dashboard/utils/sidebar-data";
import organizationIcon from "../../../assets/organization.svg";
import "./layout-sidebar.scss";

type LayoutSidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

export default function LayoutSidebar({
  isOpen = false,
  onClose,
}: LayoutSidebarProps) {
  return (
    <aside
      id="layout-sidebar"
      className={isOpen ? "layout-sidebar--open" : undefined}
    >
      <button
        className="sidebar-close-button"
        type="button"
        aria-label="Close sidebar"
        onClick={onClose}
      >
        <Icon
          icon="tabler:x"
          aria-hidden="true"
        />
      </button>
      <div className="organization">
        <img
          src={organizationIcon}
          alt="organization icon"
          aria-hidden="true"
          className="sidebar-child-icon"
        />
        <p>
          Switch Organization
          <Icon icon="tabler:chevron-down" />
        </p>
      </div>
      {SIDEBAR_DATA.map(data => (
        <section
          key={data.title}
          className="sidebar-data"
        >
          <p className="sidebar-title">
            {data.title}
          </p>
          {data.children.map((child) => {
            const content = (
              <>
                <img
                  src={child.icon}
                  alt=""
                  aria-hidden="true"
                  className="sidebar-child-icon"
                />
                {child.label}
              </>
            );

            if (child.href === undefined) {
              return (
                <span
                  key={child.label}
                  className="sidebar-child"
                >
                  {content}
                </span>
              );
            }

            return (
              <NavLink
                key={child.label}
                to={child.href}
                onClick={onClose}
                className={({ isActive }) =>
                  `sidebar-child${isActive ? " sidebar-child--active" : ""}`}
              >
                {content}
              </NavLink>
            );
          })}
        </section>
      ))}
    </aside>
  );
}
