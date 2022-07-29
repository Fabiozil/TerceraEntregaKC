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
        console.log(
            `===================Group ${this.groupName}=================== \n`
        );
        console.table(this.teams);
        console.log("\n");
    }

    generateFixture() {
        let fixture = [];
        let matchDay = [];
        let pivot = 0;
        for (let i = 0; i < this.teams.length - 1; i++) {
            matchDay = [];
            if (pivot === this.teams.length - 2) {
                matchDay.push({
                    team1: this.teams[pivot],
                    team2: this.teams[pivot + 1],
                });
                pivot++;
                matchDay.push({
                    team1: this.teams[pivot],
                    team2: this.teams[0],
                });
                pivot = 1;
            } else {
                matchDay.push({
                    team1: this.teams[pivot],
                    team2: this.teams[pivot + 1],
                });
                pivot++;
                matchDay.push({
                    team1: this.teams[pivot + 1],
                    team2: this.teams[pivot + 2],
                });
                pivot++;
            }
            fixture.push(matchDay);
        }
        return fixture;
    }

    printFixture() {
        this.fixture.map((matchDay, index) => {
            console.log(`==== Match Day ${index + 1} ====`);
            console.log(matchDay);
        });
    }
}
