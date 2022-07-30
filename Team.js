export class Team {
    constructor(name) {
        this.name = name;
        this.points = 0;
        this.goalFavor = 0;
        this.goalAgainst = 0;
        this.goalDifference = 0;
    }

    /***
     * @param {Number} teamScore - Describes the score of the Team object who call the function
     * @param {Number} rivalScore - Describes the score of the rival Team
     */
    calculateResult(teamScore, rivalScore) {
        this.goalFavor += teamScore;
        this.goalAgainst += rivalScore;
        if (teamScore === rivalScore) {
            this.points += 1;
        } else if (teamScore > rivalScore) {
            this.points += 3;
        }
        this.calculateGoalDifference();
    }

    calculateGoalDifference() {
        this.goalDifference = this.goalFavor - this.goalAgainst;
    }
}
