
import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native'
import { useState, useLayoutEffect } from "react"
import { NavigationHelpersContext } from '@react-navigation/core'
import { Avatar } from "@rneui/themed"
import { TouchableOpacity } from 'react-native-gesture-handler'

import { AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView , TouchableWithoutFeedback } from 'react-native'
import { Platform } from 'react-native'
import { ScrollView } from 'react-native'
import { Keyboard } from 'react-native'

import { getFirestore } from 'firebase/firestore'
import { collection, doc, setDoc, getDocs, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { query, orderBy, limit } from "firebase/firestore";  


const ChatScreen = ( {navigation, route}) => {

    const auth = getAuth()
    const db = getFirestore()
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])
    
    const sendMessage = async() => {
        Keyboard.dismiss();
        const messagesRef = await addDoc(collection(db,"chats",route.params.id,"messages"), {
            message : input,
            displayName : auth.currentUser.displayName,
            email : auth.currentUser.email,
            photoURL : auth.currentUser.photoURL,
            timestamp : serverTimestamp(),
        })
        console.log(messagesRef)
        setInput("")
    }

    useLayoutEffect(()=>{
        const mRef = collection(db,"chats",route.params.id,"messages")
        const q = query(mRef, orderBy("timestamp", "desc"))
        const unsubscribe = onSnapshot(q, (querySnapshot) => setMessages(querySnapshot.docs.map(doc => (
            {
                id :  doc.id,
                data : doc.data()
            }
            ))))
        console.log(messages)
        return unsubscribe
    }, [route])


    useLayoutEffect(() => {
        navigation.setOptions({
            title : "Chat",
            headerTitleAlign : "Left",
            headerBackTitleVisible : false,

            headerTitle : () => (
                <View
                    style = {{
                        flexDirection : "row",
                        alignItems : "center",
                    }}>
                    <Avatar rounded source = {{ uri : "https://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.png"}}></Avatar>
                    <Text style = {{ color : "white", marginLeft : 10, fontWeight : "700"}}>{route.params.chatName}</Text>
                </View>
            ),

            headerLeft : () => (
                <TouchableOpacity style = {{marginLeft : 10}} onPress = {navigation.goBack}>
                    <AntDesign name = "arrowleft" size = {24} color = "white"/>
                </TouchableOpacity>
            ),

            headerRight : () => (
                <View
                    style = {{
                        flexDirection : "row" ,
                        justifyContent : "space-between",
                        width : 80,
                        marginRight : 20,
                    }}
                >
                    <TouchableOpacity>
                        <FontAwesome name = "video-camera" size = {24} color = "white" />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Ionicons name = "call" size = {24} color = "white" />
                    </TouchableOpacity>
                </View>
            ),


        })
    }, [navigation])
    
    
    return (
        <SafeAreaView style = {{ flex : 1, backgroundColor : "white"}}>
            <StatusBar style = "light" />

            <KeyboardAvoidingView 
                behavior = {Platform.OS === "ios" ? "padding" : "height"}
                style = {styles.container}
                keyboardVerticalOffset={90} 
            >
                
                <TouchableWithoutFeedback onPress = {Keyboard.dismiss} >
                <>
                    <ScrollView>
                        {/* Chat goes here */}
                        {messages.map(({id,data}) => (

                            data.email === auth.currentUser.email ? (
                                <View key = {id} style = {styles.reciever}>
                                    <Avatar position = "absolute" rounded bottom = {-15} right = {-5} size = {30} source = {{uri : data.photoURL}}/>
                                    <Text style = {styles.recieverText}>{data.message}</Text>
                                </View>
                            ) : 
                            (
                                <View style = {style.sender}>
                                    <Avatar />
                                    <Text style = {styles.senderText}>{data.message}</Text>
                                </View>
                            )

                        ))}
                    </ScrollView>

                    <View style = {styles.footer} >
                        <TextInput placeholder = "Signal Message"
                          style = {styles.textInput}
                          value={input}
                          onChangeText = {(text) => setInput(text)}
                          onSubmitEditing = {sendMessage}
                           />
                        <TouchableOpacity onPress = {sendMessage} activeOpacity = {0.5} >
                            <Ionicons name = "send" size = {24} color = "#2B68E6" />
                        </TouchableOpacity>
                    </View>
                    
                    </>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    footer : {
        flexDirection : "row",
        
        alignItems : "center",
        width : "100%",
        padding : 15
    },
    textInput : {
        bottom : 0,
        height : 40,
        flex : 1,
        marginRight : 15,
        borderColor : "transparent",
        backgroundColor : "#ECECEC",
        padding : 10,
        color : "grey",
        borderRadius : 30,
    },

    reciever : {
        padding : 15,
        backgroundColor : "#ECECEC" ,
        alignSelf : "flex-end",
        borderRadius : 20,
        marginRight : 15,
        marginBottom : 20,
        maxWidth : "80%",
        position : "relative",
    },

    sender : {
        padding : 15,
        backgroundColor : "#2B68E6",
        alignSelf : "flex-start",
        borderRadius : 20,
        margin : 15,
        maxWidth : "80%",
        position : "relative",
    }
})
