import AcmeLogo from "@/app/ui/acme-logo";
import LoginForm from "@/app/ui/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
