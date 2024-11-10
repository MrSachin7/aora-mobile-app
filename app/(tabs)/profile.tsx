import { View, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import { getUserPosts, logout } from "@/lib/appwrite";
import useAppWrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants";
import Infobox from "@/components/Infobox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: userPosts } = useAppWrite(() => getUserPosts(user.$id));

  const signOut = async () => {
    await logout();
    setIsLoggedIn(false);
    setUser(null);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={userPosts}
        keyExtractor={(video) => video.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={signOut}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <Infobox
              title={user?.username}
              containerStyle="mt-5"
              titleStyle="text-lg"
            />

            <View className="mt-5 flex-row">
              <Infobox
                title={userPosts?.length || 0}
                subtitle="Posts"
                containerStyle="mr-10"
                titleStyle="text-xl"
              />
              <Infobox title="1.2k" subtitle="Followers" titleStyle="text-xl" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
        // refreshControl={
        //   <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        // }
      />
    </SafeAreaView>
  );
};

export default Profile;
