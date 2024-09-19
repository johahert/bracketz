import React from "react";
import { TextInput, View } from "react-native";

interface ContentContainerProps {
    children: React.ReactNode;
    classes?: string;
}

export function ContentContainer({children, classes}: ContentContainerProps): React.JSX.Element {
  return (
<View className={`p-4 rounded-md mb-4 ${classes}`}>
      {children}
    </View>
  );
}