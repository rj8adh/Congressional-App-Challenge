import "./style.css";
import { account, client } from "./appwrite";
import { OAuthProvider, Databases, Query } from "appwrite";



const app = document.getElementById("app");
const loginBtn = document.getElementById("btn-siwg");

const loginSIWG = async () => {
    account.createOAuth2Session(
        OAuthProvider.Google,
        "http://localhost:5173",
        "http://localhost:/5173/fail"
    );
};

const init = async () => {
    try {
        const user = await account.get();
        app.innerHTML = `<h3>Hi ${user.name || user.email} 👋</h3>`;
        // reuse client configured in ./appwrite.js (uses VITE_ environment variables)
        const databases = new Databases(client);

        const result = await databases.listDocuments(
            '68bc936f0017d97aa4d4', // databaseId
            'individualpoints', // collectionId
            [
                Query.orderDesc("points"),
                Query.limit(3)
            ] // queries (optional)
        );

        console.log(result);
    } catch (error) {
        console.error(error);
    }
};

init();

loginBtn.addEventListener("click", loginSIWG);
