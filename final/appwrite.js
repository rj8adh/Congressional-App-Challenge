import { Client, Account } from "appwrite";

const { VITE_PROJECT_ID, VITE_ENDPOINT } = import.meta.env;
// Use environment variables for endpoint/project to avoid leaking secrets in code
const client = new Client()
    .setEndpoint(VITE_ENDPOINT)
    .setProject(VITE_PROJECT_ID);

const account = new Account(client);

export { account, client };
