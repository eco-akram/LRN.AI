/* eslint-disable prettier/prettier */
import { Account, Client, Databases, ID } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "lt.kvk.lrn_ai",
    projectId: "677651ec0037d13d9309",
    databaseId: "6776545c000c70b9a482",
    userCollectionId: "677654b100310fb03f7a",
    deckCollectionId: "67765515001611ab9ed8",
    cardCollectionId: "6776551b0024000a9845",
    userStatisticsCollectionId: "6776552f00315bf1080c",
    storageId: "67765caf003819802cb5",
};

// Init your React Native SDK
const client = new Client();
const databases = new Databases(client);

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

const account = new Account(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username,
        );

        if (!newAccount) throw Error;
        await signIn(email, password);

        const newUser = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(), {
            accountId: newAccount.$id,
            email,
            username,
        });

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};


export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}