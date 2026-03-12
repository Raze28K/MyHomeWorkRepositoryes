import React, { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { detailsStyles } from "./detail.styles";
import { FavouritesContext } from "../context/FavouritesContext";

export default function DetailsScreen({ route, navigation }) {
  const lesson = route.params?.lesson;
  const { toggleFavourite, isFavourite, isReady } = useContext(FavouritesContext);

  const id = lesson?.id;
  const fav = id ? isFavourite(id) : false;

  return (
    <View style={detailsStyles.container}>
      <Text style={detailsStyles.title}>{lesson?.title ?? "Details"}</Text>
      <Text style={detailsStyles.subtitle}>{lesson?.subtitle ?? "Нет данных"}</Text>

      <Pressable
        style={[detailsStyles.button, !isReady && { opacity: 0.6 }]}
        disabled={!isReady || !id}
        onPress={() => toggleFavourite(id)}
      >
        <Text style={detailsStyles.buttonText}>
          {fav ? "★ Убрать из избранного" : "☆ В избранное"}
        </Text>
      </Pressable>

      <Pressable style={detailsStyles.button} onPress={() => navigation.goBack()}>
        <Text style={detailsStyles.buttonText}>⬅ Назад</Text>
      </Pressable>
      
    </View>
  );
}
