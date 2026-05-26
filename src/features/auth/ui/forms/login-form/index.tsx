import type {
  FieldErrors,
  Resolver,
  SubmitHandler,
} from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/shared/ui/button";

import Input from "@/shared/ui/input";
import "./login-form.scss";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const loginFormResolver: Resolver<LoginFormValues> = async (values) => {
  const result = loginSchema.safeParse(values);

  if (result.success) {
    return {
      errors: {},
      values: result.data,
    };
  }

  const errors: FieldErrors<LoginFormValues> = {};

  for (const issue of result.error.issues) {
    const fieldName = issue.path[0];

    if (fieldName === "email" || fieldName === "password") {
      errors[fieldName] = {
        message: issue.message,
        type: issue.code,
      };
    }
  }

  return {
    errors,
    values: {},
  };
};

export default function LoginForm() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: loginFormResolver,
  });

  const onSubmit: SubmitHandler<LoginFormValues> = () => undefined;

  return (
    <form
      className="login-form"
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
    >
      <Input
        error={errors.email?.message}
        placeholder="Email"
        type="email"
        {...register("email")}
      />
      <Input
        error={errors.password?.message}
        placeholder="Password"
        type="password"
        {...register("password")}
      />

      <p className="forget-password">Forgot PASSWORD?</p>

      <Button>Log in</Button>
    </form>
  );
}
