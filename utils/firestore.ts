import app from "./firebase"; // Import the Firebase app
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

const db = getFirestore(app); // Firestore reference

// Helper function to format the current date as 'DD-MM-YYYY'
const getFormattedDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0"); // Get day and ensure it's 2 digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month and ensure it's 2 digits (0-indexed)
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Return formatted date
};

// Function to add a new document to '/data/joko/locationBased' with the date as the document ID
const addDocumentToTimeBased = async (
    description: string,
    title: string,
    hasConfirmed: boolean,
    priority: boolean,
    timeMark: Date,
) => {
    try {
        // Get the current date in 'DD-MM-YYYY' format
        const documentId = getFormattedDate();

        // Reference to the '/data/joko/locationBased' subcollection
        await setDoc(
            doc(db, "data/joko/timeBased", documentId),
            {
                description: description,
                title: title,
                hasConfirmed: hasConfirmed,
                priority: priority,
                timeMark: timeMark, // Convert JS Date to Firestore Timestamp
            },
        );

        console.log("Document successfully written with ID:", documentId);
    } catch (error) {
        console.error("Error writing document: ", error);
    }
};

export { addDocumentToTimeBased }; // Export the function
