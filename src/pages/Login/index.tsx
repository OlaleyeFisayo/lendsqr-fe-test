import "./index.scss";
import logo from "../../assets/svg/logo.svg";
import signIn from "../../assets/svg/signIn.svg";
import Form from "./components/Form";

export default function Login() {
  return (
    <section className="login">
      <div className="login-content">
        <div className="img-side">
          <img src={logo} alt="logo" />
          <img src={signIn} alt="sign in image" />
        </div>
        <div className="form-side">
          <Form />
        </div>
      </div>
    </section>
  );
}
