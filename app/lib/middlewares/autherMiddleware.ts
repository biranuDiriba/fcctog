import { cookies } from "next/headers";
import { logger } from "../logger";
import { decrypt } from "../utils/session";
import { redirect } from "next/navigation";

export default function (handler: any) {
  return async (...args: any[]) => {
    try {
      const cookie = (await cookies()).get("session")?.value;
      const session = await decrypt(cookie);
      if (!session?.role) {
        return redirect("/acessdenial");
      }
      await handler(args);
    } catch (error) {
      logger.error("Error", error);
      throw new Error("Something went wrong here");
    }
  };
}
