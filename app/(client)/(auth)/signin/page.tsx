import AcmeLogo from "@/app/(client)/nonRoutesCollections/ui/acme-logo";
import LoginForm from "@/app/(client)/nonRoutesCollections/ui/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
