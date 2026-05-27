import type { RouteObject } from "react-router";
import { render } from "@testing-library/react";
import {
  createMemoryRouter,
  RouterProvider,
} from "react-router";

type Options = {
  path?: string;
  initialEntries?: string[];
  extraRoutes?: RouteObject[];
};

export function renderWithRouter(
  element: React.ReactElement,
  {
    path = "/",
    initialEntries = ["/"],
    extraRoutes = [],
  }: Options = {},
) {
  const router = createMemoryRouter(
    [{
      path,
      element,
    }, ...extraRoutes],
    { initialEntries },
  );
  return render(<RouterProvider router={router} />);
}
