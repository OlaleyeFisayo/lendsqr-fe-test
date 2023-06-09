import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import "./index.scss";
import { AppContext } from "../../../../setup/context";
import { useToggleButton } from "../../../../setup/hooks/useToggleButton";

export default function Form() {
  const { toggleButton, showPassword, handleSubmit } = useContext(AppContext);

  const passwordRef = useRef<HTMLInputElement>(null);
  
  useToggleButton(toggleButton, passwordRef);
  
  return (
    <form onSubmit={handleSubmit}>
      <h1>Welcome!</h1>
      <h2>Enter details to login</h2>

      <input type="email" name="email" id="email" placeholder="Email" />
      <div className="password-input">
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          ref={passwordRef}
        />
        <button onClick={showPassword}>{toggleButton ? "hide" : "show"}</button>
      </div>
      <p>forget password?</p>
      <Link to="dashboard/user">Log in</Link>
    </form>
  );
}
