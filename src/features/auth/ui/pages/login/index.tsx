import Logo from "@/shared/ui/logo";
import LoginForm from "../../forms/login-form";
import "./login.scss";

export default function Login() {
  return (
    <main id="login-page">
      <section>
        <Logo />
        <img
          alt="login page image"
          className="login-page__image"
          height={337.57}
          src="/login-image.png"
          width={600}
        />
      </section>
      <section className="login-form-container">
        <header>
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>
        </header>
        <LoginForm />
      </section>
    </main>
  );
}
