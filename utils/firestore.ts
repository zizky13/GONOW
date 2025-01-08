import app from "./firebase"; // Import the Firebase app
import { collectionGroup, GeoPoint, getFirestore } from "firebase/firestore";
import { deleteDoc, doc, getDocs, setDoc, getDoc } from "firebase/firestore";

const db = getFirestore(app); // Firestore reference

// Helper function to format the current date as 'DD-MM-YYYY'

// Function to add a new document to '/data/joko/locationBased' with the date as the document ID
const addDocumentToTimeBased = async (
    description: string,
    title: string,
    hasConfirmed: boolean,
    priority: boolean,
    timeMark: Date,
    showNotificationModal: boolean
) => {
    try {
        // Get the current date in 'DD-MM-YYYY' format
        const date: number = Date.parse(new Date());
        const documentId = date.toString(); // Convert the date to a string

        // Reference to the '/data/joko/locationBased' subcollection
        await setDoc(
            doc(db, "data/joko/timeBased", documentId),
            {
                description: description,
                title: title,
                hasConfirmed: hasConfirmed,
                priority: priority,
                timeMark: timeMark, // Convert JS Date to Firestore Timestamp
                timeStamp: documentId,
                showNotificationModal: showNotificationModal
            },
        );

        console.log("Document successfully written with ID:", documentId);
    } catch (error) {
        console.error("Error writing document: ", error);
    }
};

const addDocumentToLocBased = async (
    description: string,
    hasConfirmed: boolean,
    location: GeoPoint,
    priority: boolean,
    radius: number,
    showNotificationModal: boolean,
    title: string
) => {
    try {
        const date: number = Date.parse(new Date());
        const documentId = date.toString(); // Convert the date to a string
        // Reference to the '/data/joko/locationBased' subcollection
        await setDoc(
            doc(db, "data/joko/locationBased", documentId),
            {
                description: description,
                hasConfirmed: hasConfirmed,
                location: location,
                priority: priority,
                radius: radius,
                showNotificationModal: showNotificationModal,
                timeStamp: documentId,
                title: title
            },
        );

        console.log("Document successfully written with ID:", documentId);
    } catch (error) {
        console.error("Error writing document: ", error);
    }
};

const getDocumentsFromTimeBased = async () => {
    try {
        const collections = collectionGroup(db, "timeBased");
        const querySnapshot = await getDocs(collections);
        const documents = querySnapshot.docs.map((doc) => doc.data());
        return documents;
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
};

const getDocumentsFromLocBased = async () => {
    try {
        const collections = collectionGroup(db, "locationBased");
        const querySnapshot = await getDocs(collections);
        const documents = querySnapshot.docs.map((doc) => doc.data());
        return documents;
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
};

const deleteDocumentFromTimeBased = async (timeStamp: string) => {
    try {
        // Validate input
        if (!timeStamp) {
            throw new Error("TimeStamp is required");
        }

        // Get document reference
        const docRef = doc(db, "data/joko/timeBased", timeStamp);

        // Check if document exists first
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            throw new Error(
                `Document with timeStamp ${timeStamp} does not exist`,
            );
        }

        // Delete document
        await deleteDoc(docRef);
        console.log("Document successfully deleted with ID:", timeStamp);
        return true;
    } catch (error) {
        console.error("Error deleting document:", error);
        throw error; // Propagate error to caller
    }
};

const deleteDocumentFromLocBased = async (timeStamp: string) => {
    try {
        // Validate input
        if (!timeStamp) {
            throw new Error("TimeStamp is required");
        }

        // Get document reference
        const docRef = doc(db, "data/joko/locationBased", timeStamp);

        // Check if document exists first
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            throw new Error(
                `Document with timeStamp ${timeStamp} does not exist`,
            );
        }

        // Delete document
        await deleteDoc(docRef);
        console.log("Document successfully deleted with ID:", timeStamp);
        return true;
    } catch (error) {
        console.error("Error deleting document:", error);
        throw error; // Propagate error to caller
    }

};

const updateDocumentFromTimeBased = async (timeStamp: string, data: any) => {
    try {
        // Validate input
        if (!timeStamp) {
            throw new Error("TimeStamp is required");
        }

        // Get document reference
        const docRef = doc(db, "data/joko/timeBased", timeStamp);

        // Check if document exists first
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            throw new Error(
                `Document with timeStamp ${timeStamp} does not exist`,
            );
        }

        // Update document
        await setDoc(docRef, data, { merge: true });
        console.log("Document successfully updated with ID:", timeStamp);
        return true;
    } catch (error) {
        console.error("Error updating document:", error);
        throw error; // Propagate error to caller
    }
};

const updateDocumentFromLocBased = async (timeStamp: string, data: any) => {
    try {
        // Validate input
        if (!timeStamp) {
            throw new Error("TimeStamp is required");
        }

        // Get document reference
        const docRef = doc(db, "data/joko/locationBased", timeStamp);

        // Check if document exists first
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            throw new Error(
                `Document with timeStamp ${timeStamp} does not exist`,
            );
        }

        // Update document
        await setDoc(docRef, data, { merge: true });
        console.log("Document successfully updated with ID:", timeStamp);
        return true;
    } catch (error) {
        console.error("Error updating document:", error);
        throw error; // Propagate error to caller
    }
}

export {
    addDocumentToTimeBased,
    addDocumentToLocBased,
    deleteDocumentFromTimeBased,
    deleteDocumentFromLocBased,
    getDocumentsFromTimeBased,
    getDocumentsFromLocBased,
    updateDocumentFromTimeBased,
    updateDocumentFromLocBased
}; // Export the function
