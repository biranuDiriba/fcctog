"use server";
import { SignupFormSchema, FormState } from "@/app/lib/definitions";

import bcrypt from "bcrypt";
import User from "../models/User";
import { connectedToMongodb } from "../database/mongoose";
import { createSession } from "../utils/session";
import { redirect } from "next/navigation";
export async function signup(state: FormState, formData: FormData) {
  console.log("coming here and it is fine");
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  await connectedToMongodb();
  const user = await User.create({ name, email, password: hashedPassword });

  await createSession(user.id);
  // 5. Redirect user
  redirect("/dashboard");
}
