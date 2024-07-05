import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import { client } from "../sanity";

const HomeScreen = () => {
  // can use navigation by declaring and initializing it explicitly or it automatically pass so just declare argument in screen.
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const [featuredCategories, setFeaturedCategories] = useState();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    client
      .fetch(
        `
        *[_type == "featured"] {
            ...,
            restaurants[]->{
              ...,
              dishes[]->
            }
    }
        `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);
  return (
    <View style={{ paddingTop: inset.top }} className="bg-white">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            <ChevronDownIcon size={20} color="#00CCBB" />
            Current Location
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>
      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3 items-center">
          <MagnifyingGlassIcon color="#00CCBB" size={20} />
          <TextInput
            placeholder="Restaurant and Cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>
      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Categories */}
        <Categories></Categories>
        {/* Featured Rows */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </View>
    // </View>
  );
};

export default HomeScreen;
