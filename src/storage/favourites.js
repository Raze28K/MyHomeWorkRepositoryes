import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "favourites"

export async function loadFavourites(){
    const raw = await AsyncStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
}
export async function saveFavourites(ids){
    await AsyncStorage.setItem(KEY, JSON.stringify(ids))
}