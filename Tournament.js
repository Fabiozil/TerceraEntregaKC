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
            legA.push({
                team: group.teams[0],
                position: 1,
                group: group.groupName,
            });
            legB.push({
                team: group.teams[1],
                position: 2,
                group: group.groupName,
            });
        });

        legA.map((team, index) => {
            this.quarters.push([team, legB[legB.length - 1 - index]]);
        });
        console.log(`===============================================`);
        console.log(`============= QUARTER FINALS STARTING ==============`);
        console.log(`===============================================\n`);
        this.playQuarters();
    }

    playQuarters() {
        let winners = [];
        this.quarters.map((quarterMatch, i) => {
            console.log(
                `=========== Quarter Final Match ${i + 1} (Winner of Group ${
                    quarterMatch[0].group
                } VS Second of Group ${quarterMatch[1].group}) ===========\n`
            );
            winners.push(this.finalMatch(quarterMatch[0], quarterMatch[1]));
        });

        this.semis.push([winners[0], winners[1]]);
        this.semis.push([winners[2], winners[3]]);
        this.playSemis();
    }

    playSemis() {
        let winners = [];
        this.semis.map((semisMatch, i) => {
            console.log(
                `=========== Semi Finals Match ${i + 1} (${
                    semisMatch[0].position
                } of Group ${semisMatch[0].group} VS ${
                    semisMatch[1].position
                } of Group ${semisMatch[1].group}) ===========\n`
            );
            winners.push(this.finalMatch(semisMatch[0], semisMatch[1]));
        });

        this.final.push([winners[0], winners[1]]);
        this.playFinal();
    }

    playFinal() {
        console.log(
            `=========== THE FINAL(${this.final[0][0].position} of Group ${this.final[0][0].group} VS ${this.final[0][1].position} of Group ${this.final[0][1].group}) ===========\n`
        );
        const winner = this.finalMatch(this.final[0][0], this.final[0][1]);
        console.log(
            `==========================================================`
        );
        console.log(
            `================= THE CHAMPION IS ${winner.team.name} =================`
        );
        console.log(
            `==========================================================`
        );
    }

    finalMatch(teamOne, teamTwo) {
        let teamOneScore = Math.floor(Math.random() * 5);
        let teamTwoScore = Math.floor(Math.random() * 5);
        console.log(
            `${teamOne.team.name} ${teamOneScore} VS ${teamTwoScore} ${teamTwo.team.name}\n`
        );
        if (teamOneScore > teamTwoScore) {
            return teamOne;
        } else if (teamTwoScore > teamOneScore) {
            return teamTwo;
        } else {
            console.log(`We have a tie, penalty kicks!`);
            const winner = this.penaltyKicks();
            if (winner === 1) {
                console.log(`${teamOne.team.name} Wins!\n`);
                return teamOne;
            } else {
                console.log(`${teamTwo.team.name} Wins!\n`);
                return teamTwo;
            }
        }
    }

    penaltyKicks() {
        let teamOneScore = Math.floor(Math.random() * 5);
        let teamTwoScore = Math.floor(Math.random() * 5);
        if (teamOneScore > teamTwoScore) {
            console.log(
                `Penalty Results: ${teamOneScore} VS ${teamTwoScore}\n`
            );
            return 1;
        } else if (teamTwoScore > teamOneScore) {
            console.log(
                `Penalty Results: ${teamOneScore} VS ${teamTwoScore}\n`
            );
            return 2;
        } else {
            while (teamOneScore === teamTwoScore) {
                teamOneScore += Math.floor(Math.random() * 2);
                teamTwoScore += Math.floor(Math.random() * 2);
            }
            console.log(
                `Penalty Results: ${teamOneScore} VS ${teamTwoScore}\n`
            );
            if (teamOneScore > teamTwoScore) {
                return 1;
            } else {
                return 2;
            }
        }
    }
}
