import { View, Text } from "react-native";
import React from "react";

interface InfoboxProps {
  title: string | number;
  containerStyle?: string;
  titleStyle?: string;
  subtitle?: string;
}

const Infobox = ({
  title,
  containerStyle,
  titleStyle,
  subtitle,
}: InfoboxProps) => {
  return (
    <View className={`${containerStyle}`}>
      <Text className={`text-white text-center font-psemibold ${titleStyle}`}>
        {title}
      </Text>
      <Text className="text-sm text-gray-100 text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default Infobox;
