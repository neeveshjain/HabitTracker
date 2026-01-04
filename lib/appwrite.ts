import { Account, Client, Databases } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

export const account = new Account(client)
export const databases = new Databases(client)

export const Database_Id = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
export const habits_collection_id = process.env.EXPO_PUBLIC_APPWRITE_Habits_Collection;
export const habits_completion_id = process.env.EXPO_PUBLIC_APPWRITE_Habits_Completion;

export interface RealtimeResponse{
  events:string[];
  payload:any;
}