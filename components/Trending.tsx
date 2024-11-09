import { View, Text, FlatList } from "react-native";
import React from "react";

interface TrendingProps {
  posts: Array<any>;
}

const Trending = ({ posts }: TrendingProps) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id + ""}
      renderItem={(item) => (
        <Text className="text-3xl text-white">{item.item.id}</Text>
      )}
      horizontal
    />
  );
};

export default Trending;
