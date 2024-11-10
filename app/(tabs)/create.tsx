import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { Video, ResizeMode } from "expo-av";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { uploadVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const Create = () => {
  const initState = {
    title: "",
    video: {
      uri: "",
    },
    thumbnail: {
      uri: "",
    },
    prompt: "",
  };
  const [form, setForm] = useState(initState);
  const { user } = useGlobalContext();

  const [isUploading, setIsUploading] = useState(false);

  const openPicker = async (selectType: "video" | "image") => {
    let type;
    if (selectType === "video") {
      type = ["video/mp4", "video/gif"];
    } else {
      type = ["image/jpg", "image/png"];
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      } else if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const onSubmit = async () => {
    if (!form.title || !form.video.uri || !form.thumbnail.uri || !form.prompt) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setIsUploading(true);

    try {
      await uploadVideo({ ...form, userId: user.$id });

      Alert.alert("Success", "Video uploaded successfully");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to create user");
    } finally {
      setIsUploading(false);
      setForm(initState);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full border-2 border-red">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white">Upload video</Text>
        <FormField
          title="Video title"
          value={form.title}
          placeholder="Give your video a catchy title"
          handleChangeText={(title) => setForm({ ...form, title })}
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video.uri ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail.uri ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  {" "}
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(prompt) => setForm({ ...form, prompt })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Submit and Publish"
          handlePress={onSubmit}
          containerStyles="mt-7"
          isLoading={isUploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
