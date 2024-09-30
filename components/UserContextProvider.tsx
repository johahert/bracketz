import React, { createContext, useContext, useEffect, useState } from 'react';
import { Tournament, TournamentStatus, User } from '@/models/tournament';
import { getTournaments, updateTournamentStatus } from '@/services/tournamentDB';
import { getUsers } from '@/services/userDB';

type UserContextType = {
  users: User[];
  addUser: (user: User) => void;
  fetchUsers: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: React.ReactNode;
}

export const UsersProvider : React.FC<UserProviderProps> = ({children}: UserProviderProps) => {

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    },[])

    const fetchUsers = async () => {
        try {
          const fetchedUsers = await getUsers();
          console.log('fetched users i contextprovider:  ', fetchedUsers);
          setUsers(fetchedUsers);
        } catch (error) {
          console.error('Failed to fetch users:', error);
        }
      }

    const addUser = (user: User) => {
        setUsers(prev => [...prev, user]);
    }

    

  return (
    <UserContext.Provider value={{users, addUser, fetchUsers}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUsers = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
}