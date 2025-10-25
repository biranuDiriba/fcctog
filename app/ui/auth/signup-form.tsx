// "use client";

import Link from "next/link";
import Text from "../components/Typography/Text";
import {
  ArrowRightIcon,
  AtSymbolIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "../fonts";
import { Button } from "../button";
import { Divider } from "../components/elements/Divider";

// import { signup } from "@/app/lib/actions/auth";
// import { FormState } from "@/app/lib/definitions";
// import asyncMiddleware from "@/app/lib/middlewares/asyncMiddleware";
// import { useActionState } from "react";

// export default function SignupForm() {
//   const [state, action, pending] = useActionState<FormState>(
//     asyncMiddleware(signup),
//     undefined
//   );

//   return (
//     <form action={action}>
//       <div>
//         <label htmlFor="name">Name</label>
//         <input id="name" name="name" placeholder="Name" />
//       </div>
//       {state?.errors?.name && <p>{state.errors.name}</p>}

//       <div>
//         <label htmlFor="email">Email</label>
//         <input id="email" name="email" placeholder="Email" />
//       </div>
//       {state?.errors?.email && <p>{state.errors.email}</p>}

//       <div>
//         <label htmlFor="password">Password</label>
//         <input id="password" name="password" type="password" />
//       </div>
//       {state?.errors?.password && (
//         <div>
//           <p>Password must:</p>
//           <ul>
//             {state.errors.password.map((error) => (
//               <li key={error}>- {error}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//       <button
//         type="submit"
//         disabled={pending}
//         className={`w-full px-4 py-2 rounded-md text-white font-semibold transition-colors duration-200
//     ${
//       pending
//         ? "bg-gray-400 cursor-not-allowed"
//         : "bg-blue-600 hover:bg-blue-700"
//     }`}
//       >
//         Sign Up
//       </button>
//     </form>
//   );
// }

export default function SignupForm() {
  return (
    <div className="mt-4 flex grow flex-col gap-4 md:flex-row justify-center">
      <div className="flex   flex-col justify-center gap-6 rounded-lg  px-6 py-10 md:w-2/5 md:px-20">
        <Text
          className={` ${lusitana.className} text-xl text-blue-500 md:text-3xl md:leading-normal uppercase`}
        >
          Welcome to CCTOG.
        </Text>

        <Link
          href="/signup"
          className="flex items-center gap-1 self-start  flex-wrap"
        >
          <span> Don’t have an account? </span>
          <div className="flex items-center gap-2 self-start  py-3 text-sm font-medium  text-blue-500 transition-colors hover:text-blue-300    md:text-base ">
            <span>Create new account</span>
            <ArrowRightIcon className="w-5 md:w-6" />
          </div>
        </Link>
      </div>

      <form className="space-y-3">
        <div className=" rounded-lg bg-gray-200 px-6 pb-4 pt-8">
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Create new account
          </h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <Button className="mt-4 w-full">Log in</Button>
          <div className="flex h-8 items-end space-x-1">
            {/* Add form errors here */}
          </div>
          <Divider />
          <Button className="mt-4 w-full">Continue with Google</Button>
        </div>
      </form>
    </div>
  );
}
