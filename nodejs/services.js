var users = null;
var data_mod_time = null;

export async function save_users(data){
    data_mod_time = new Date();

    users = data;

    var count = 0;
    users.map(user => count++);

    return count;
}

var superusers = [];
var superusers_data_time = null;

export async function get_superusers(){
    if (superusers.length == 0 || data_mod_time.getTime() != superusers_data_time.getTime()){
        superusers_data_time = data_mod_time;

        users.map((user) => {
            if (user.score >= 900 && user.active){
                superusers.push(user.name);
            }
        });

        return superusers;
    } 

    return superusers;
}

var top_5_countries = {};
var top_5_countries_data_time = null;

export async function get_top_countries(){
    var all_countries = {};

    if (Object.keys(top_5_countries).length == 0 || top_5_countries_data_time.getTime() != data_mod_time.getTime()){
        top_5_countries_data_time = data_mod_time;

        users.map((user) => {
            if (all_countries.hasOwnProperty(user.country)){
                all_countries[user.country]++;
            } else {
                all_countries[user.country] = 1;
            }
        });

        const sorted = Object.keys(all_countries).sort(function(a,b){return all_countries[b]-all_countries[a]});

        for (var i = 0; i < 5; i++){
            top_5_countries[sorted[i]] = all_countries[sorted[i]]
        }

        return top_5_countries;
    }

    return top_5_countries;
}

var teams_ = [];
var teams_data_time = null;

export async function get_team_insights(){
    var teams = {}
    if (teams_.length == 0 || teams_data_time.getTime() != data_mod_time.getTime()){
        teams_data_time = data_mod_time;

        users.map((user) => {
            const team = user.team;
            if (teams.hasOwnProperty(team.name)){
                var projects = [];
                team.projects.map((project) => {
                    if (project.completed) projects.push(project.name);
                });
                
                teams[team.name].total_members++;
                teams[team.name].leaders = team.leader ? teams[team.name].leaders + 1 : teams[team.name].leaders,
                teams[team.name].completed_projects = teams[team.name].completed_projects + projects.length;
            } else {
                var projects = [];
                team.projects.map((project) => {
                    if (project.completed) projects.push(project.name);
                });
    
                teams[team.name] = {
                    team: team.name,
                    total_members: 1,
                    leaders: team.leader ? 1 : 0,
                    completed_projects: projects.length,
                    active_percent: 0
                };
            }
        });
    
        teams_ = [];
        for (const [key, value] of Object.entries(teams)) {
            teams_.push(value);
        }
    
        return teams_;
    }
    return teams_;
}

var logins = [];
var logins_data_time = null;

export async function get_active_users_per_day(){
    var logins_per_day = {}
    if (logins.length == 0 || logins_data_time.getTime() != data_mod_time.getTime()){
        logins_data_time = data_mod_time;
        
        users.map((user) => {
            user.logs.map((log) => {
                if (logins_per_day.hasOwnProperty(log.date)){
                    logins_per_day[log.date]++;
                } else {
                    logins_per_day[log.date] = 1;
                }
            });
        });

        logins = [];
        for (const [key, value] of Object.entries(logins_per_day)) {
            logins.push({date: key, count: value});
        }

        return logins;
    }
    return logins;
}