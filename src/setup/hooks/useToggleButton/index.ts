import { useEffect } from "react";

function useToggleButton(
  toggleButton: boolean,
  passwordRef: React.RefObject<HTMLInputElement>
) {
  useEffect(() => {
    if (toggleButton) {
      passwordRef.current?.setAttribute("type", "text");
    } else {
      passwordRef.current?.setAttribute("type", "password");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleButton]);
}

export { useToggleButton };
