/* eslint-disable prettier/prettier */
import { Account, Client, Databases, ID, Query } from "react-native-appwrite";
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PLATFORM,
  APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID,
  APPWRITE_DECK_COLLECTION_ID,
  APPWRITE_CARD_COLLECTION_ID,
  APPWRITE_USER_STATISTICS_COLLECTION_ID,
  APPWRITE_STORAGE_ID,
} from '@env';

export const appwriteConfig = {
  endpoint: APPWRITE_ENDPOINT,
  platform: APPWRITE_PLATFORM,
  projectId: APPWRITE_PROJECT_ID,
  databaseId: APPWRITE_DATABASE_ID,
  userCollectionId: APPWRITE_USER_COLLECTION_ID,
  deckCollectionId: APPWRITE_DECK_COLLECTION_ID,
  cardCollectionId: APPWRITE_CARD_COLLECTION_ID,
  userStatisticsCollectionId: APPWRITE_USER_STATISTICS_COLLECTION_ID,
  storageId: APPWRITE_STORAGE_ID,
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

export const getUserDeckById = async (deckId) => {
    try {
        const deck = await databases.getDocument(appwriteConfig.databaseId, appwriteConfig.deckCollectionId, deckId);
        return deck;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

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

export const createAiDeck = async (deckName, cards, userId) => {
    try {
        // Sukuriamas unikalus dekos ID
        const deckId = ID.unique();

        // Sukuriamas dekas ir priskiriamas naudotojui
        const newDeck = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.deckCollectionId,
            deckId,
            {
                deckId,         // Dekos unikalus ID
                deckName,         // Deko pavadinimas
                userId: userId        // Naudotojo ID
            }
        );

        // Sukuriamos kortelės ir priskiriamos šiai dekai
        await Promise.all(
            cards.map((card) =>
                createCard(deckId, card.cardName, card.frontText, card.backText)
            )
        );

        console.log("Dekas sėkmingai sukurtas ir priskirtas naudotojui:", userId);
        return newDeck; // Grąžinamas sukurtas dekas
    } catch (error) {
        console.error("Klaida kuriant deką:", error);
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

export const updateCardStatus = async (cardId, status) => {
    try {
        const card = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.cardCollectionId,
            cardId,
            {
                status,
            }
        );

        return card;
    } catch (error) {
        console.error("Error updating card status:", error);
        throw new Error(error);
    }
}

export const createUserStatistics = async (userId) => {
    try {
        const newUserStatistics = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userStatisticsCollectionId,
            ID.unique(),
            {
                streakCounterId: ID.unique(),
                userId,
                currentStreak: 0,
                cardsReviewed: 0,
                lastReviewedDate: null,
            }
        );

        return newUserStatistics;
    } catch (error) {
        console.error("Error creating user statistics:", error);
        throw new Error(error);
    }
}

export const updateUserStatistics = async (statisticsId, updatedStats) => {
    try {
        await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userStatisticsCollectionId,
            statisticsId,
            updatedStats
        );
    } catch (error) {
        console.error("Error updating user statistics:", error);
        throw new Error(error);
    }
};


export const getUserStatistics = async (userId) => {
    try {
        const userStatistics = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userStatisticsCollectionId, [Query.equal('userId', userId)]);
        return userStatistics.documents[0];
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
