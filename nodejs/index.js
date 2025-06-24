import express from "express";
import { get_active_users_per_day, get_superusers, get_team_insights, get_top_countries, save_users } from "./services.js";
import { readFileSync } from "fs";

const app = express();

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false }));

app.get("/", (request, response) => {
    return response.status(200).send("Server is running");
})


app.post("/users", async (request, response) => {
    const count = await save_users(request.body);

    return response.status(200).send({ message: "Arquivo recebido com sucesso", user_count: count });
});

app.get("/superusers", async (request, response) => {
    const time_start = Date.now();

    const superusers = await get_superusers();
    
    const ms = Date.now() - time_start;

    return response.status(200).send({ timestamp: new Date(), execution_time_ms: ms, data: superusers });
})

app.get("/top-countries", async (request, response) => {
    const time_start = Date.now();

    const top_5_countries = await get_top_countries();
    
    const ms = Date.now() - time_start;
    return response.status(200).send({ timestamp: new Date(), execution_time_ms: ms, countries: top_5_countries });
    
});

app.get("/team-insights", async (request, response) => {
    const time_start = Date.now();

    const teams = await get_team_insights();

    const ms = Date.now() - time_start;
    return response.status(200).send({ timestamp: new Date(), execution_time_ms: ms, teams });
});
app.get("/active-users-per-day", async (request, response) => {
    const time_start = Date.now();

    const logins = await get_active_users_per_day();

    const ms = Date.now() - time_start;
    return response.status(200).send({ timestamp: new Date(), execution_time_ms: ms, logins });
});

app.get("/evaluation", async (request, response) => {
    const users = readFileSync("usuarios.json", "utf-8");
    
    const time_start = Date.now();

    const sava_users_time_start = Date.now();
    const count = await save_users(JSON.parse(users));
    const sava_users_ms = Date.now() - sava_users_time_start;

    const superusers_time_start = Date.now();
    const superusers = await get_superusers();
    const superusers_ms = Date.now() - superusers_time_start;

    const top_5_countries_time_start = Date.now();
    const top_5_countries = await get_top_countries();
    const top_5_countries_ms = Date.now() - top_5_countries_time_start;

    const teams_time_start = Date.now();
    const teams = await get_team_insights();
    const teams_ms = Date.now() - teams_time_start;

    const logins_time_start = Date.now();
    const logins = await get_active_users_per_day();
    const logins_ms = Date.now() - logins_time_start;

    const ms = Date.now() - time_start;

    return response.status(200).send({ timestamp: new Date(), execution_time_ms: ms, evaluation: {
        "/users": { response: count, execution_time_ms: sava_users_ms },
        "/superusers": { response: superusers, execution_time_ms: superusers_ms },
        "/top-countries": { response: top_5_countries, execution_time_ms: top_5_countries_ms },
        "/team-insight": { response: teams, execution_time_ms: teams_ms },
        "/active-users-per-day": { response: logins, execution_time_ms: logins_ms }
    } });
});

app.listen(8000, () => { console.log("Server is running on http://localhost:8000"); });
