import { Group } from "./Group.js";
export class Tournament {
    constructor(teams) {
        this.groups = this.setGroups(teams);
        this.quarters = [];
        this.semis = [];
        this.final = [];
        this.thirdPlace = [];
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

    groupPhase() {
        console.log(`===============================================`);
        console.log(`=============GROUP PHASE STARTING==============`);
        console.log(`===============================================\n`);
        this.groups.map((group) => {
            console.log(
                `===================Group ${group.groupName}=================== \n`
            );
            group.playFixture();
        });
        this.setPlayOffs();
    }

    setPlayOffs() {
        console.log(`===============================================`);
        console.log(`=============GROUP PHASE FINISHED==============`);
        console.log(`===============================================\n`);
        this.groups.map((group) => {
            console.log(
                `===================Group ${group.groupName}=================== \n`
            );
            group.printTable();
        });
        let legA = [];
        let legB = [];
        this.groups.map((group, index) => {
            if (index < group / 2) {
                legA.push(group.teams[0]);
                legB.push(group.teams[1]);
            } else {
                legB.push(group.teams[0]);
                legA.push(group.teams[1]);
            }
        });

        legA.map((team, index) => {
            this.quarters.push([team, legA[legA.length - 1 - index]]);
        });

        legB.map((team, index) => {
            this.quarters.push([team, legB[legB.length - 1 - index]]);
        });

        console.log(this.quarters);
    }
}
