import { Client, Account, Databases, Storage } from "appwrite";
import { ENDPOINT, PROJECT_ID } from "./config";

export const client = new Client();

client.setEndpoint(ENDPOINT).setProject(PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { ID } from "appwrite";
