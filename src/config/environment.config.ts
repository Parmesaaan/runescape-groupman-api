import "dotenv/config";

export const NODE_ENV = process.env.NODE_ENV;
export const TIMEZONE = process.env.TIMEZONE || "Asia/Dubai";
export const VERSION = process.env.VERSION;
export const SERVER_PORT = process.env.SERVER_PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET || "cgimbackendsecret";

export const dbConfig = {
  host: process.env.DB_HOST || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "",
  port: +(process.env.DB_PORT || 5432),
  logging: false,
};