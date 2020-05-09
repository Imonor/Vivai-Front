export class PlantReport {
    date: string;
    water: boolean;
    prune: boolean;
    repotting: boolean;
    harvest: boolean;
    comment: string;

    constructor(date: string, water: boolean, prune: boolean, repotting: boolean, harvest: boolean, comment: string ) {
        this.date = date;
        this.water = water;
        this.prune = prune;
        this.repotting = repotting;
        this.harvest = harvest;
        this.comment = comment;
    }
}
