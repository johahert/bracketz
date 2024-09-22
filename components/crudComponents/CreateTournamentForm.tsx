import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { MyTextInput } from "../MyTextInput";
import { MyButton } from "../MyButton";
import { insertUser } from "@/services/userDB";
import { Tournament } from "@/models/tournament";
import { insertTournament } from "@/services/tournamentDB";
import { insertRound } from "@/services/roundsDB";

interface Props {
  handleGetUsers?: () => void;
}

export const CreateTournamentForm = ({ handleGetUsers }: Props) => {
  const [tournamentName, setTournamentName] = useState("");


  const handleInsertTournament = async () => {
    if (tournamentName.length < 3 || tournamentName == null) return;

    await insertTournament(tournamentName)
    .then(() => Alert.alert("Tournament created!"))
    .catch((error) => Alert.alert("Error creating tournament", error)); 
  };

  

  
  return (
    <View className="pb-4">
      <MyTextInput
        placeholder={"Enter name"}
        label="Tournament Name"
        value={tournamentName}
        onChangeText={setTournamentName}
      />    
      <MyButton
        text="Create User"
        onPress={() => handleInsertTournament()}
      />
    </View>
  );
};
