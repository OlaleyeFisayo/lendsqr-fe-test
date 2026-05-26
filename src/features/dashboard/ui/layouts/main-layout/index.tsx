import { Outlet } from "react-router";

import "./main-layout.scss";

export default function MainLayout() {
  return (
    <section id="main-layout">
      Main Layout
      <Outlet />
    </section>
  );
}
