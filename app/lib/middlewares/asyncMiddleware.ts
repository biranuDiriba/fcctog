import { logger } from "../logger";

export default function (handler: any) {
  return async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error) {
      logger.error("Error", error);
      throw new Error("Something went wrong here");
    }
  };
}
