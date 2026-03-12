import React from "react"
import {Pressable, Text, View} from "react-native"
import {cardStyles} from "./card.styles"

export default function Card({title, subtitle, onPress}){
    return(
        <Pressable onPress={onPress}>
            <View style = {cardStyles.card}>
                <Text style ={cardStyles.title}>{title}</Text>
                <Text style = {cardStyles.subtitle}>{subtitle}</Text>
            </View>
        </Pressable>
    )
}