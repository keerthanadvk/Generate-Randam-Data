import path from "path";
import { env } from "process";


export const ROOT_FOLDER:string = process.cwd();
export const CONFIG_FOLDER:string = path.join(ROOT_FOLDER, "config");
export const EMAIL_TEMPLATES_FOLDER:string = path.join(ROOT_FOLDER, "email-templates");
export const PROGRAM_FILE_NAME:string = env.PROGRAM_FILE_NAME || "programs.json";
