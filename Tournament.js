import { Group } from "./Group.js";
export class Tournament {
    constructor(teams) {
        this.groups = this.setGroups(teams);
    }

    setGroups(teams) {
        try {
            if (teams.length !== 16) {
                console.error(
                    "The tournament only allow 16 teams, please verify the teams array"
                );
                throw "Error";
            } else {
                let groups = [];
                let group;
                let team;
                let teamsCount = teams.length;
                for (let i = 0; i < teamsCount; i += 4) {
                    let groupTeams = [];
                    for (let j = 0; j < 4; j++) {
                        team = teams.splice(
                            Math.floor(Math.random() * teams.length),
                            1
                        );
                        groupTeams.push(team[0]);
                    }
                    groups.push(new Group(groupTeams, i / 4));
                }
                return groups;
            }
        } catch (err) {
            console.log("Error building the tournament groups");
            console.error(err);
            throw "Error";
        }
    }

    printGroups() {
        this.groups.map((group) => {
            group.printTable();
            group.printFixture();
        });
    }
}
