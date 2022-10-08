import React from 'react'
import { ScrollView } from 'react-native'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import CustomListItem from "../components/CustomListItem"
import {useState, useLayoutEffect,useEffect} from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { ListItem, Avatar } from "@rneui/themed"
import { TouchableOpacity } from 'react-native'
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import { getFirestore } from 'firebase/firestore'
import { collection, doc, setDoc, getDocs } from "firebase/firestore"; 

const HomeScreen = ({navigation}) => {

    const [chats, setChats] = useState([])
    const auth = getAuth()
    const db = getFirestore()
    const signOutUser = () => {
        signOut(auth).then(()=>{
            navigation.replace("login")
        }).catch((error) => {alert(error)})
    }

    useEffect(() => {
    
    let isSubscribed = true;
    const getChats = async () => {
        const querySnapshot = await getDocs(collection(db, "chats"));
        let chatitems = []
        querySnapshot.forEach((doc) => (
            chatitems.push({
                id : doc.id, 
                chatName : doc.data(),
            })
        ))
        if (isSubscribed){
            setChats(chatitems)
            console.log(chatitems)
        }
    }
    getChats().catch((error) => console.log(error))
    return () => isSubscribed = false
    }, [])
    

    useLayoutEffect(() => {
        navigation.setOptions({
            title : "Signal",
            headerStyle :  {
                backgroundColor : "#fff"
            },
            headerTitleStyle : { color : "black"},
            headerTintColor : "black",

            headerLeft : () => (
                <View style = {{ marginLeft : 20}}>
                    <TouchableOpacity onPress= {signOutUser}>
                    <Avatar rounded source = {{ uri : auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),

            headerRight : () => (
                <View  style = { {
                    flexDirection : "row" ,
                    justifyContent : "space-between",
                    width : 80,
                    marginRight : 20,
                } }>
                    <TouchableOpacity activeOpacity = {0.5}>
                        <AntDesign name = "camerao" size = {24} color = "black" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress = {() => navigation.navigate("AddChat")}
                        activeOpacity = {0.5}>
                        <SimpleLineIcons name = "pencil" size = {24} color = "black" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [])

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id,
            chatName,
        })
    }


    return (
        <SafeAreaView>
            <ScrollView>
                {
                chats.map((chat) => (
                    <CustomListItem id = {chat.id} chatName = {chat.chatName.chatName} enterChat = {enterChat} />
                ))
                } 
            <CustomListItem />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
