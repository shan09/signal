import React from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native'

import {Input, Image, Button} from "@rneui/themed";

import { StatusBar } from "expo-status-bar"
import { useState, useEffect } from "react"
import { getAuth, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import app from "../firebase"

const LoginScreen = ({navigation}) => {

    const auth = getAuth()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              navigation.replace("Home")
            } 
        })
    }, [])

    const [email, setEmail ] = useState('')
    const [password, setPassword] = useState('')

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .catch((error) => alert(error))
    }
    
    return (
        <KeyboardAvoidingView behavior='padding' enabled style = {styles.container}>
            <StatusBar style = "light" />

            <Image
                source = {
                    {
                        uri : "https://assets.mofoprod.net/network/images/signal_logo.width-250.jpg",
                    }
                }
                style = {{ width : 200, height : 200}}
            />

            <View style = {styles.inputContainer} >
                <Input placeholder = "Email" autoFocus type="email" value = {email} onChangeText = {(text) => setEmail(text)} />
                <Input placeholder = "Password" secureTextEntry type = "password" value = {password} onChangeText = { (text) => setPassword(text)} onSubmitEditing = {signIn} />
            </View>

            <Button title = "Login"  containerStyle = {styles.button} onPress = {signIn} />
            <Button onPress = {() => navigation.navigate("Register")}title = "Register" type = "outline"  containerStyle = {styles.button} />
            {/* Below view is so that keyboard does not touch the register button */}

            <View style = {{height : 100}}  />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create(

    {

    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        padding : 10,
        backgroundColor : 'white',
    },

    inputContainer : {
        width : 300,
    },

    button : {
        width : 200,
        marginTop : 10,
    },
}
)
