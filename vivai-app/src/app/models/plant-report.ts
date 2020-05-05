export class PlantReport {
    date: string;
    water: boolean;
    prune: boolean;
    potting: boolean;
    harvest: boolean;
    comment: string;

    constructor(date: string, water: boolean, prune: boolean, potting: boolean, harvest: boolean, comment: string ) {
        this.date = date;
        this.water = water;
        this.prune = prune;
        this.potting = potting;
        this.harvest = harvest;
        this.comment = comment;
    }
}
