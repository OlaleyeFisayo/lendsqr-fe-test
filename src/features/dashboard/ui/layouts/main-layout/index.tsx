import { Outlet } from "react-router";

import LayoutHeader from "../../components/layout-header";
import LayoutSidebar from "../../components/layout-sidebar";
import "./main-layout.scss";

export default function MainLayout() {
  return (
    <section id="main-layout">
      <LayoutHeader />
      <main className="main-layout-main">
        <LayoutSidebar />
        <section className="child">
          <Outlet />
        </section>
      </main>
    </section>
  );
}
