import React, {useLayoutEffect , useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Input, Button} from "@rneui/themed"
import Icon from "react-native-vector-icons/FontAwesome"
import { getFirestore } from 'firebase/firestore'


import { collection, doc, setDoc, getDocs } from "firebase/firestore"; 

const AddChatScreen = ( {navigation} ) => {

    const db = getFirestore();
    const [input, setInput] = useState("")

    useLayoutEffect( () => {
        navigation.setOptions({
            title : "Add a new chat",
            headerBackTitle : "Chats",
        });

    }, [navigation])

    const createChat = async() => {
        const data  = {
             chatName : input,
        }
        const newChatRef = doc(collection(db, "chats"));
        // later...
        await setDoc(newChatRef, data);
        navigation.replace("Home")
    }


    return (
        <View style = {styles.container}>
            <Input
                placeholder = "Enter a chat name"
                value = {input}
                onChangeText = {(text) => setInput(text)}
                onSubmitEditing = {createChat}
                leftIcon = {
                    <Icon name = "wechat" type = "antdesign" size = {24} color = "black" />
                } 
            />
            <Button onPress = {createChat} title = "Create" />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container : {
        backgroundColor : "white",
        padding : 30,
        height : "100%"
    },
})
