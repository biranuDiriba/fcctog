import AcmeLogo from "@/app/ui/acme-logo";
import React from "react";
import Banner from "@/app/ui/Banner";
import { lusitana } from "../ui/fonts";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Text from "../ui/components/Typography/Text";

export default function LoginPage({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <Banner />
      {children}
    </main>
  );
}
