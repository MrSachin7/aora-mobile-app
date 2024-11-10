import { ScrollView, View, Image, Text, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [isSubmitting, setIsSumbitting] = useState(false);

  const submitForm = async () => {
    if (isSubmitting) return;

    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setIsSumbitting(true);
    try {
      const token = await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to create user");
    } finally {
      setIsSumbitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Login to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) =>
              setform({
                ...form,
                email: e,
              })
            }
            otherStyles="mt-7"
            keyboardtype="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) =>
              setform({
                ...form,
                password: e,
              })
            }
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submitForm}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href={"/sign-up"}
              className="text-lg font-psemibold text-secondary"
            >
              {" "}
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
