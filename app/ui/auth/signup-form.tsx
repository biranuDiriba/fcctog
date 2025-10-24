"use client";

import { signup } from "@/app/lib/actions/auth";
import { FormState } from "@/app/lib/definitions";
import asyncMiddleware from "@/app/lib/middlewares/asyncMiddleware";
import { useActionState } from "react";

export default function SignupForm() {
  const [state, action, pending] = useActionState<FormState>(
    asyncMiddleware(signup),
    undefined
  );

  return (
    <form action={action}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" />
      </div>
      {state?.errors?.name && <p>{state.errors.name}</p>}

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="submit"
        disabled={pending}
        className={`w-full px-4 py-2 rounded-md text-white font-semibold transition-colors duration-200
    ${
      pending
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }`}
      >
        Sign Up
      </button>
    </form>
  );
}
