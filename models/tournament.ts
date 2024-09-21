const enum RoundName{
    QUALIFIERS = "Qualifiers",
    GROUP_STAGE = "Group Stage",
    ROUND_OF_16 = "Round of 16",
    QUARTER_FINALS = "Quarter Finals",
    SEMI_FINALS = "Semi Finals",
    FINALS = "Finals"
}

const enum TournamentStatus{
    PENDING = "Pending",
    ACTIVE = "Active",
    COMPLETED = "Completed"
}

export interface User {
    id: number;
    name: string;
}

export interface Match{
    id: number;
    completed: boolean;
    player1: User;
    player2: User;
    score1: number;
    score2: number;
    winner?: User;
}

export interface Round{
    id: number;
    roundName: RoundName;
    matches: Match[];
}

export interface Tournament{
    id: number;
    name: string;
    format: number;
    status?: TournamentStatus;
    competitors?: User[];
    rounds?: Round[];
}