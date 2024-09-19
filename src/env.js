import dotenv from "dotenv";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

const config = dotenv.config({ path: envFile });

if (config.error) {
  throw new Error("Error loading .env file");
}
