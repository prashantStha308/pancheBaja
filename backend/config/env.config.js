import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// const __dirname = dirname(fileURLToPath(import.meta.url));

// if (process.env.NODE_ENV === "production") {
//     console.log("Running in Production mode");
//     config({ path: join(__dirname, "../../.env") });
// } else {
//     console.log("Running in Development mode");
//     config({ path: join(__dirname, "../../dev.env") });
// }

config();

export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
// JWT
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;

// Cloudinary
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const CLOUDINARY_ENV_VARIABLE = process.env.CLOUDINARY_ENV_VARIABLE;