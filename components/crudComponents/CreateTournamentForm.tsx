import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { MyTextInput } from "../MyTextInput";
import { MyButton } from "../MyButton";
import { insertUser } from "@/services/userDB";
import { Tournament } from "@/models/tournament";
import { insertTournament } from "@/services/tournamentDB";
import { insertRound } from "@/services/roundsDB";

interface Props {
  handleGetUsers: () => void;
}

export const CreateTournamentForm = ({ handleGetUsers }: Props) => {
  const [tournamentName, setTournamentName] = useState("");
  const [tournamentType, setTournamentType] = useState("");
  const [tournamentStages, setTournamentStages] = useState("");

  const handleInsertTournament = async () => {
    if (tournamentName.length < 3 || tournamentName == null) return;
    if (isNaN(Number(tournamentType)) || isNaN(Number(tournamentStages)))
      return;

    Alert.alert(
      "Create Tournament",
      `Are you sure you want to create ${tournamentName}?`,
      [
        {
          text: "Yes",
          onPress: async () => {
            try {
              await insertTournament(tournamentName, Number(tournamentType));
              const rounds = Number(tournamentStages);
              for (let i = 1; i <= rounds; i++) {
                await insertRound(1, `Round ${i}`, i);
              }
              setTimeout(() => {
                Alert.alert(
                  "Tournament Created",
                  `${tournamentName} has been created!`
                );
              }, 1000);
            } catch (error) {
              console.log("Error adding user", error);
            }
          },
        },
        { text: "No" },
      ]
    );
  };

  //bryt ut i validationsfunktioner
  const handleSetType = (value: string) => {
    if (isNaN(Number(value))) return;
    const num = Number(value);
    if (num < 0 || num > 2) return;
    setTournamentType(value);
  };
  const handleSetStage = (value: string) => {
    if (isNaN(Number(value))) return;
    const num = Number(value);
    if (num < 1 || num > 5) return;
    setTournamentStages(value);
  };

  
  return (
    <View className="pb-4">
      <MyTextInput
        placeholder={"Enter name"}
        label="Tournament Name"
        value={tournamentName}
        onChangeText={setTournamentName}
      />

      {/* TODO - BYT TILL RADIOBUTTON ELLER NÅT */}
      <MyTextInput
        placeholder={"Type 0-2"}
        label="Enter type"
        isNumeric={true}
        value={tournamentType}
        onChangeText={(value) => handleSetType(value)}
      />

      <MyTextInput
        placeholder={"Type 1-5"}
        label="Stages"
        isNumeric={true}
        value={tournamentStages}
        onChangeText={(value) => handleSetStage(value)}
      />
      <MyButton
        text="Create User"
        onPress={() => handleInsertTournament()}
      />
    </View>
  );
};
