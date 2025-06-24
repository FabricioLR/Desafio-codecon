const URL = "http://localhost:8000";

async function fn(){
    const response = await fetch(URL + "/evaluation", {
        method: "GET"
    });

    console.log("response status: ", response.status, " content: ", await response.json());
};



fn();