import React, { createContext, useContext, useEffect, useState } from 'react';
import { Tournament, TournamentStatus } from '@/models/tournament';
import { getTournaments, updateTournamentStatus } from '@/services/tournamentDB';

type TournamentContextType = {
  tournaments: Tournament[];
  addTournament: (tournament: Tournament) => void;
  changeTournamentStatus: (tournamentId: number, status: TournamentStatus) => Promise<void>;
  fetchTournaments: () => Promise<void>;
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

type TournamentProviderProps = {
  children: React.ReactNode;
}

export const TournamentsProvider : React.FC<TournamentProviderProps> = ({children}: TournamentProviderProps) => {

    const [tournaments, setTournaments] = useState<Tournament[]>([]);

    useEffect(() => {
        fetchTournaments();
    },[])

    const fetchTournaments = async () => {
        try {
          const fetchedTournaments = await getTournaments();
          setTournaments(fetchedTournaments);
        } catch (error) {
          console.error('Failed to fetch tournaments:', error);
        }
      }

    const addTournament = (tournament: Tournament) => {
        setTournaments(prevTournaments => [...prevTournaments, tournament]);
    }

    const changeTournamentStatus = async (id:number, status:number) => {
        try {
          //status first then id
          await updateTournamentStatus(id, status);
          await fetchTournaments();
        } catch (error) {
          console.error('Failed to change tournament status:', error);
        }
    }

  return (
    <TournamentContext.Provider value={{tournaments, addTournament, changeTournamentStatus, fetchTournaments}}>
      {children}
    </TournamentContext.Provider>
  )
}

export const useTournaments = (): TournamentContextType => {
  const context = useContext(TournamentContext);
  if (context === undefined) {
    throw new Error('useTournaments must be used within a TournamentsProvider');
  }
  return context;
}