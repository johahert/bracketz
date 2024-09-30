export const enum TournamentStatus{
    PENDING = 0,
    ACTIVE = 1,
    COMPLETED = 2
}



export const enum TournamentFormat{
    KNOCKOUT = 0,
    GROUP_STAGE = 1,
}

export interface User {
    id: number;
    wins?: number;
    profile_picture?: number; 
    name: string;
}

export interface Player{
    id: any;
    name: any;
    profile_picture?: number;
    score: number;
}

export interface Match{
    id?: number;
    active: boolean;
    players: Player[];
    winner?: User;
}

export interface Round{
    id: number;
    number: number;
    matches?: Match[];
    canFinish: boolean;
    active: boolean;
}

export interface Tournament{
    id: number;
    name: string;
    format: TournamentFormat;
    status: TournamentStatus;
    competitors?: User[];
    rounds?: Round[];
}

export const getTournamentStatus = (status:TournamentStatus) : string  => {
    switch(status){
        case TournamentStatus.PENDING : return 'Pending'
        case TournamentStatus.ACTIVE : return 'Active'
        case TournamentStatus.COMPLETED : return 'Completed'
        default : return ''
    }
}

export const getTournamentFormat = (format:TournamentFormat) : string => {
    switch(format){
        case TournamentFormat.GROUP_STAGE : return 'Group Stage'
        case TournamentFormat.KNOCKOUT : return 'Knockout'
        default : return ''

    }
}