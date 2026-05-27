import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Outlet,
  useLocation,
} from "react-router";

import LayoutHeader from "../../components/layout-header";
import LayoutSidebar from "../../components/layout-sidebar";
import "./main-layout.scss";

export default function MainLayout() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    mainRef.current?.scrollTo({
      left: 0,
      top: 0,
    });
    window.scrollTo({
      left: 0,
      top: 0,
    });
  }, [pathname]);

  return (
    <section id="main-layout">
      <LayoutHeader onMenuClick={() => setIsSidebarOpen(true)} />
      <main
        ref={mainRef}
        className="main-layout-main"
      >
        <LayoutSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        {isSidebarOpen && (
          <button
            className="main-layout-sidebar-overlay"
            type="button"
            aria-label="Close sidebar"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <section className="child">
          <Outlet />
        </section>
      </main>
    </section>
  );
}
