import { Group } from "./Group.js";
import { Team } from "./Team.js";
import { Tournament } from "./Tournament.js";
let england = new Team("England");
let austria = new Team("Austria");
let norway = new Team("Norway");
let northernIreland = new Team("Northern Ireland");
let germany = new Team("Germany");
let denmark = new Team("Denmark");
let spain = new Team("Spain");
let finland = new Team("Finland");
let netherlands = new Team("Netherlands");
let sweden = new Team("Sweden");
let portugal = new Team("Portugal");
let switzerland = new Team("Switzerland");
let france = new Team("France");
let italy = new Team("Italy");
let belgium = new Team("Belgium");
let iceland = new Team("Iceland");

let teams = [
    england,
    austria,
    norway,
    northernIreland,
    germany,
    denmark,
    spain,
    finland,
    netherlands,
    sweden,
    portugal,
    switzerland,
    france,
    italy,
    belgium,
    iceland,
];

let euro2022 = new Tournament(teams);
euro2022.printGroups();
euro2022.groupPhase();
