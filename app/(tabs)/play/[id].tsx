import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { getTournamentAllInfo, updateTournamentStatus } from "@/services/tournamentDB";
import { insertTournamentUsers } from "@/services/tournament_usersDB";
import {
  Tournament,
  User,
  TournamentStatus,
  getTournamentFormat,
  getTournamentStatus,
  TournamentFormat,
} from "@/models/tournament";
import { UserListTournament } from "@/components/crudComponents/UserListTournament";
import MyModal from "@/components/MyModal";
import { MyButton } from "@/components/MyButton";
import { MyCollapsible } from "@/components/MyCollapsible";

export default function TournamentView() {
  const { id } = useLocalSearchParams();

  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (id === undefined) return;
    const num = parseInt(id as string);
    getTournamentFromDB(num);
  }, [id]);
  const getTournamentFromDB = async (id: number) => {
    const initialTournament = await getTournamentAllInfo(id);
    setTournament(initialTournament);
  };
  const handleUpdateCompetitors = (updatedUsers: User[]) => {
    setTournament((prev) => {
      if (!prev) return null;
      return { ...prev, competitors: updatedUsers };
    });
  };
  const closeModal = () => setModalOpen(false);

  const handleStartTournament = async () => {
      if(tournament){
        await updateTournamentStatus(TournamentStatus.ACTIVE, tournament.id).then(() => console.log('status updated')).catch(() => console.log('status update failed'))
        if(!tournament.competitors) return;
        await insertTournamentUsers(tournament.competitors, tournament.id).then(() => console.log('users updated')).catch(() => console.log('users update failed'))
      }
  }


  return (
    <ScrollView className="py-8 px-4 bg-teal-400">
      {tournament ? (
        <View>
          <View className="flex-row justify-between">
            <Text className="text-2xl font-bold text-white">
              {tournament.name}
            </Text>
            <View className={`py-1 px-2 rounded-lg items-center justify-center
              ${tournament.status === TournamentStatus.PENDING ? 'bg-yellow-400' : 'bg-teal-500'}`}>
              <Text className={tournament.status === 0 ? " " : "text-teal-50"}>
                {getTournamentStatus(tournament.status as TournamentStatus)}
              </Text>
            </View>
          </View>
          <Text className="text-teal-50 text-xs mb-2">
            Tournament-ID: {tournament.id}
          </Text>
          <Text className="text-teal-50 text-lg mb-2">
            Type: {getTournamentFormat(tournament.format)}
          </Text>
            {tournament.status === TournamentStatus.PENDING && (
          <View className="mb-4">

              <MyButton
              text="Select Competitors"
              onPress={() => setModalOpen(true)}
              />
          </View>
            )}

          <View className="mb-4">
          {tournament.status === TournamentStatus.PENDING ? (
            <MyButton 
            text={tournament.competitors && tournament.competitors.length < 4 ? 'Atleast 4 Users needed' : 'Start Tournament'}
            onPress={handleStartTournament} 
            disabled={tournament.competitors && tournament.competitors.length < 4}/>
          ) : (
            <MyButton text="View Bracket" onPress={() => {}} />
          )} 
          </View>
          
          
          <MyModal
            isOpen={modalOpen}
            closeModal={(closeModal)}
            title="Users"
            >
            <UserListTournament
              onUpdateCompetitors={handleUpdateCompetitors}
              selectedCompetitors={
                tournament.competitors ? tournament.competitors : []
              }
              />
          </MyModal>
          
              {tournament.competitors && tournament.competitors.length > 0 ? (
                <MyCollapsible title={tournament.competitors && `Competitors (${tournament.competitors.length})`} >

                <View className="mb-4">
                 
                  {tournament.competitors.map((c, index) => (
                    <View key={index}>
                      <Text className="text-white text-lg">{c.name}</Text>
                      <Text className="text-teal-100">{c.id}</Text>
                    </View>
                  ))}
                </View>
                </MyCollapsible>
              ) : (
                <Text className="text-white mb-2  text-lg">
                  No Competitors Yet...
                </Text>
              )}
        </View>
      ) : (
        <Text>OOPS! Tournament not found...</Text>
      )}
    </ScrollView>
  );
}
