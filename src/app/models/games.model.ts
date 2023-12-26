import { Teams } from "./teams.model";

export interface Games {
    id: number;
    date: string;
    home_team_score: number;
    visitor_team_score: number;
    season: number;
    period: number;
    status: string;
    time: string;
    postseason: boolean;
    home_team: Teams;
    visitor_team: Teams;
}