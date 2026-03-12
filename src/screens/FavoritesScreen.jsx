import React, { useContext, useMemo } from "react";
import { FlatList, Text, View } from "react-native";
import { homeStyles } from "./home.styles";
import { LESSONS } from "../data/lessons";
import Card from "../ui/Card";
import { FavouritesContext } from "../context/FavouritesContext";

export default function FavouritesScreen({ navigation }) {
  const { favourites, isReady } = useContext(FavouritesContext);

  const favLessons = useMemo(() => {
    return LESSONS.filter((l) => favourites.includes(l.id));
  }, [favourites]);

  if (!isReady) {
    return (
      <View style={homeStyles.container}>
        <Text style={homeStyles.header}>Избранное</Text>
        <Text style={homeStyles.hint}>Загрузка...</Text>
      </View>
    );
  }

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.header}>Избранное</Text>
      <Text style={homeStyles.hint}>
        {favLessons.length ? "Твои сохранённые уроки" : "Пока пусто — добавь уроки из деталей"}
      </Text>

      <FlatList
        data={favLessons}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subtitle={item.subtitle}
            onPress={() => navigation.navigate("Details", { lesson: item })}
          />
        )}
      />
    </View>
  );
}
