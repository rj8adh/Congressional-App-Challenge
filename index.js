
let query = "";
async function search()
{
    query = document.getElementById("search").value;
    console.log(query);
    console.log("Sending request to server...");
    
    try {
        const result = await fetch("http://localhost:5000/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({query: query})
        });

        if (!result.ok) {
            throw new Error(`Server responded with status ${result.status}`);
        }

        const data = await result.json();
        console.log("Response from server:", data);
        document.getElementById("responseText").innerText = data.reply;
    }
    catch(error) {
        console.error("Error:", error);

        document.getElementById("responseText").innerText = `Error: ${error.message}`;
    }
    
}











