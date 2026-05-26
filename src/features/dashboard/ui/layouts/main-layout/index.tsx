import { Outlet } from "react-router";

import LayoutHeader from "../../components/layout-header";
import "./main-layout.scss";

export default function MainLayout() {
  return (
    <section id="main-layout">
      <LayoutHeader />
      <Outlet />
    </section>
  );
}
