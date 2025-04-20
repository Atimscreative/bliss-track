import { Client, Account } from "appwrite";
import { appwriteConfig } from "./config";

export const client = new Client();

client
  .setEndpoint(appwriteConfig.ENDPOINT)
  .setProject(appwriteConfig.PROJECT_ID); // Replace with your project ID

export const account = new Account(client);
export { ID } from "appwrite";
