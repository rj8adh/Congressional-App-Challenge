import { Client, Databases, Query } from "appwrite";

// Load .env if APPWRITE_KEY isn't present
if (!process.env.APPWRITE_KEY) {
    try {
        const dotenv = await import('dotenv');
        dotenv.config();
    } catch (e) {
        // ignore
    }
}

const apiKey = process.env.APPWRITE_KEY;
if (!apiKey) {
    console.error('Missing APPWRITE_KEY. Set it in the environment or .env file.');
    process.exit(1);
}

const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject('68bc86c4001f6c07bd54');

// Attach API key to client headers
client.headers['X-Appwrite-Key'] = apiKey;

const databases = new Databases(client);

async function listRows() {
    try {
            // Request top 5 documents ordered by points (server-side)
            const response = await databases.listDocuments(
                '68bc936f0017d97aa4d4', // databaseId
                'individualpoints', // collectionId
                [
                    Query.orderDesc('points'),
                    Query.limit(5)
                ]
            );

            // Print only the returned documents (top 5)
            console.log(response.documents || response);
    } catch (error) {
        console.error('Error listing rows:', error);
    }
}

listRows();