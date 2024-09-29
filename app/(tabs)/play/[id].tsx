import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { getTournamentAllInfo, updateTournamentStatus } from "@/services/tournamentDB";
import { insertTournamentUsers } from "@/services/tournament_usersDB";
import { generateRounds, initializeTournament } from "@/services/roundsDB";
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
import { BracketView } from "@/components/BracketView";

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
  
  

  const handleStartTournament = async () => {
      if(tournament){
        await initializeTournament(tournament);
        await getTournamentFromDB(parseInt(id as string));
      }
  }
//TODO - Home screen ska visa alla turneringar, sortera på kommande, avslutade och pågående turneringar
//även sökfunktion för att hitta turneringar

//TODO - create view ska ha en dropdown för att välja format på turneringen (endast single elimination för tillfället)
// ska bara ha create turnering och create användare i create view samt beskrivande text innan, ev. en bild på en turnering

//sista view - ska visa stats för användaren, antal vinster, antal turneringar spelade, antal matcher spelade, antal matcher vunna
//sökfunktion för att hitta användare, lista på användare, klicka på användare för att se stats
  return (
    <ScrollView className="py-8 px-4 bg-neutral-50">
      {tournament ? (
        <View>
          <View className="flex-row justify-between">
            <Text className="text-2xl font-bold text-neutral-900">
              {tournament.name}
            </Text>
            <View className={`py-1 px-2 rounded-lg items-center justify-center
              ${tournament.status === TournamentStatus.PENDING ? 'bg-yellow-500' : 'bg-green-500'}`}>
              <Text className={tournament.status === 0 ? " " : "text-white"}>
                {getTournamentStatus(tournament.status as TournamentStatus)}
              </Text>
            </View>
          </View>
          <Text className="text-neutral-800 text-xs mb-2">
            Tournament-ID: {tournament.id}
          </Text>
          <Text className="text-neutral-700 text-lg mb-2">
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
            text={tournament.competitors && (tournament.competitors.length < 4  || tournament.competitors?.length > 16) ? 'Select 4-16 users' : 'Start Tournament'}
            onPress={handleStartTournament} 
            disabled={tournament.competitors && (tournament.competitors.length < 4  || tournament.competitors?.length > 16)}/>
          ) : (
            <></>
          )} 
          </View>
          
          
          <MyModal
            isOpen={modalOpen}
            closeModal={() => setModalOpen(false)}
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
                    <View key={index} className={` py-2 ${
                      (index + 1) === tournament.competitors?.length ? '' : 'border-b border-neutral-300'
                    }`}>
                      <Text className="font-bold text-neutral-950 text-lg">{c.name}</Text>
                      <Text className="text-neutral-700 text-xs">Player ID : {c.id}</Text>
                    </View>
                  ))}
                </View>
                </MyCollapsible>
              ) : (
                <Text className="text-white mb-2  text-lg">
                  No Competitors Yet...
                </Text>
              )}
              
              {/** Bracket view */}

              {tournament && tournament.status == TournamentStatus.ACTIVE && (
                <View>
                  <BracketView tournamentId={tournament.id} tournamentStatusProp={tournament.status} />



                </View>
              )}






        </View>
      ) : (
        <Text>OOPS! Tournament not found...</Text>
      )}
    </ScrollView>
  );
}
