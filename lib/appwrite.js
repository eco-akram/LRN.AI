/* eslint-disable prettier/prettier */
import { Account, Client, Databases, ID, Query } from "react-native-appwrite";

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
            userId: newAccount.$id,
            email,
            username,
        });

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};



export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const signOut = async () => {
    try {
        await account.deleteSession('current');
    } catch (error) {
        console.error("Failed to log out:", error);
        throw error;
    }
};


export const getCurrentUser = async () => {

    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [Query.equal('userId', currentAccount.$id)]);

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const changeUserName = async (userId, username) => {
    try {
        const user = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            userId,
            {
                username,
            }
        );

        return user;
    } catch (error) {
        console.error("Error changing username:", error);
        throw new Error(error);
    }
}

export const getUserDecks = async (userId) => {
    try {
        const decks = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.deckCollectionId, [Query.equal('userId', userId)]);
        return decks.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const getUserCards = async (deckId) => {
    try {
        const cards = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.cardCollectionId, [Query.equal('deckId', deckId)]);
        return cards.documents;

    } catch (error) {
        console.log(error);
        throw new Error(error);
    };

}

export const getDeckCardsList = async (userId) => {
    try {
        const userDecks = await getUserDecks(userId);

        const deckCardsList = await Promise.all(
            userDecks.map(async (deck) => {
                const deckCards = await getUserCards(deck.$id);

                const cards = deckCards.map((card) => ({
                    cardId: card.$id,
                    cardName: card.cardName,
                }));

                return {
                    deckId: deck.$id,
                    deckName: deck.deckName,
                    cards: cards,
                };
            })
        );

        return deckCardsList;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const createDeck = async (userId, deckName) => {
    try {
        const newDeck = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.deckCollectionId,
            ID.unique(),
            {
                deckId: ID.unique(),
                userId,
                deckName,
            }
        );

        return newDeck;
    } catch (error) {
        console.error("Error creating deck:", error);
        throw new Error(error);
    }
};

export const deleteDeckWithCards = async (deckId) => {
    try {
        const deckCards = await getUserCards(deckId);

        await Promise.all(
            deckCards.map(async (card) => {
                await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.cardCollectionId, card.$id);
            })
        );

        await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.deckCollectionId, deckId);
    } catch (error) {
        console.error("Error deleting deck:", error);
        throw new Error(error);
    }
}

export const editDeck = async (deckId, deckName) => {
    try {
        const deck = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.deckCollectionId,
            deckId,
            {
                deckName,
            }
        );

        return deck;
    } catch (error) {
        console.error("Error editing deck:", error);
        throw new Error(error);
    }
}

export const createCard = async (deckId, cardName, frontText, backText, imageUrl = null) => {
    try {
        const newCard = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.cardCollectionId,
            ID.unique(),
            {
                cardId: ID.unique(),
                deckId,
                cardName,
                frontText,
                backText,
                imageUrl,
                status: false, // Default status
            }
        );

        return newCard;
    } catch (error) {
        console.error("Error creating card:", error);
        throw new Error(error);
    }
};

export const editCard = async (cardId, cardName, frontText, backText, imageUrl = null) => {
    try {
        const card = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.cardCollectionId,
            cardId,
            {
                cardName,
                frontText,
                backText,
                imageUrl,
            }
        );

        return card;
    } catch (error) {
        console.error("Error editing card:", error);
        throw new Error(error);
    }
}

export const deleteCard = async (cardId) => {
    try {
        await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.cardCollectionId, cardId);
    } catch (error) {
        console.error("Error deleting card:", error);
        throw new Error(error);
    }
}
export { databases };