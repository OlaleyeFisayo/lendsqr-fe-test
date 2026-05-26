import { Icon } from "@iconify/react";
import { NavLink } from "react-router";
import { SIDEBAR_DATA } from "@/features/dashboard/utils/sidebar-data";
import organizationIcon from "../../../assets/organization.svg";
import "./layout-sidebar.scss";

export default function LayoutSidebar() {
  return (
    <aside id="layout-sidebar">
      <div className="organization">
        <img
          src={organizationIcon}
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
                  alt={child.label}
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
