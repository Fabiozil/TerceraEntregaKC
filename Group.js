export class Group {
    /**
     * @param {String} groupName - Group name, usually a letter eg. A
     * @param {Team[]} teams - Array of teams who are part of the group
     */
    constructor(teams, groupName) {
        let groupEnum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.teams = teams;
        this.groupName = groupEnum[groupName];
        this.fixture = this.generateFixture();
    }

    printTable() {
        this.teams = this.teams.sort((a, b) => {
            if (a.points > b.points) {
                return -1;
            } else if (b.points > a.points) {
                return 1;
            } else if (a.goalDifference > b.goalDifference) {
                return -1;
            } else if (b.goalDifference > a.goalDifference) {
                return 1;
            } else if (a.teamName > b.teamName) {
                return 1;
            } else {
                return 1;
            }
        });
        console.table(this.teams);
        console.log("\n");
    }

    playFixture() {
        let firstTeamScore = 0;
        let secondTeamScore = 0;
        this.fixture.map((matchDay, index) => {
            console.log(`========= Match Day ${index + 1} =========`);
            matchDay.map((match, index) => {
                firstTeamScore = Math.floor(Math.random() * 5);
                secondTeamScore = Math.floor(Math.random() * 5);
                console.log(
                    `Match ${index + 1}:\n${
                        match[0].name
                    } ${firstTeamScore} - ${secondTeamScore} ${match[1].name}`
                );
                match[0].calculateResult(firstTeamScore, secondTeamScore);
                match[1].calculateResult(secondTeamScore, firstTeamScore);
            });
            console.log(" ");
            this.printTable();
        });
    }

    generateFixture() {
        let fixture = [];
        let matchDay = [];
        let matches = [];
        let teamsCopy = [];
        let pivot = [];
        for (let i = 0; i < this.teams.length - 1; i++) {
            teamsCopy = [...this.teams];
            matches = [];
            matchDay = [];
            matches.push(teamsCopy.splice(teamsCopy.length - 1 - i, 1));
            pivot = teamsCopy.splice(0, 1);
            matches[0].push(pivot[0]);
            matchDay.push(...matches, teamsCopy);
            fixture.push(matchDay);
        }
        return fixture;
    }

    printFixture() {
        this.fixture.map((matchDay, index) => {
            console.log(`==== Match Day ${index + 1} ====`);
            console.log(
                `Match 1: \n${matchDay[0][0].name} VS ${matchDay[0][1].name}`
            );
            console.log(
                `Match 2: \n${matchDay[1][0].name} VS ${matchDay[1][1].name}`
            );
        });
    }
}
