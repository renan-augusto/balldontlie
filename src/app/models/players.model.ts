import { Teams } from "./teams.model";

export interface Players {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    height_feet?: number;
    height_inches?: number;
    weight_pounds?: number;
    team: Teams;
}