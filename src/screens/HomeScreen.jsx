import React from "react";
import { FlatList, Text, View } from "react-native";
import { LESSONS } from "../data/lessons";
import Card from "../ui/Card";
import { homeStyles } from "./home.styles";

export default function HomeScreen({navigation}){
    return(
        <View style = {homeStyles.container}>
            <Text style = {homeStyles.header}>
                StudyMate Mini
            </Text>
            <Text style = {homeStyles.hint}>
                Открой урок - перейдем в детали
            </Text>
        
            <FlatList
             data={LESSONS}
             keyExtractor={(item) => item.id}
             contentContainerStyle = {{gap:12}}
             renderItem={({item}) => (
                <Card 
                title={item.title}
                subtitle={item.subtitle}
                onPress={() => navigation.navigate("Details", {lesson:item})}
                />
             )}
             >

            </FlatList>
        </View>
    )
}