import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import {useState, useLayoutEffect} from 'react'
import { Button, Input } from "@rneui/base";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {Text} from "@rneui/themed";



const RegisterScreen = ({ navigation }) => {

    const auth = getAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [imageUrl, setImageUrl] = useState("")
    
     useLayoutEffect(() => {
         navigation.setOptions({
             headerBackTitle : "Back to Login"
         })
     }, [navigation])
    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
            updateProfile(authUser.user,{
                name : name,photoURL : imageUrl ? imageUrl  : "https://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.png"
            })

        })
        .catch((error) => alert(error.message))


    }

    return (
        <KeyboardAvoidingView behavior = "padding" style = {styles.container}>
            <StatusBar style = "light" />
            <Text h3 style = {{ marginTop : 10,marginBottom : 50}}>Create a Signal Account </Text>


            <View style = {styles.inputContainer}>
                <Input placeholder = "Enter your name..."  autoFocus type = "text" value = {name} onChangeText = {(text)=>setName(text)}/>
            </View>

            <View style = {styles.inputContainer}>
                <Input placeholder = "Enter Email" type = "text" value = {email} onChangeText = {(email)=>setEmail(email)}/>
            </View>

            <View style = {styles.inputContainer}>
                <Input placeholder = "Enter Password" secureTextEntry type = "text" value = {password} onChangeText = {(text)=>setPassword(text)}/>
            </View>

            <View style = {styles.inputContainer}>
                <Input 
                    placeholder = "Profile Picture URL (optional) " 
                    type = "text" 
                    value = {imageUrl} 
                    onChangeText = {(text)=>setImageUrl(text)}
                    onSubmitEditing = {register}/>
            </View>

            <Button
                raised 
                onPress = {register}
                title = "Register"
                style = {styles.button}
            /> 
            <View style = {{ height : 100}} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({

    container : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center" ,
        padding : 10,
        backgroundColor : "white",
    },
    inputContainer : {
        width : 300,

    },
    button : {
        width : 200,
        marginTop : 10,
    },
})
