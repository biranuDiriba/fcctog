import AcmeLogo from "@/app/(client)/nonRoutesCollections/ui/acme-logo";
import React from "react";
import Banner from "@/app/(client)/nonRoutesCollections/ui/Banner";
import { lusitana } from "../nonRoutesCollections/ui/fonts";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Text from "../nonRoutesCollections/ui/components/Typography/Text";

export default function LoginPage({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <Banner />
      {children}
    </main>
  );
}
