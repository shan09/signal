import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { ListItem, Avatar } from "@rneui/themed"

const CustomListItem = ({ id, chatName, enterChat }) => {
    return (
        <ListItem key = {id} bottomDivider onPress = {() => enterChat(id, chatName)}>
            <Avatar rounded source = { { uri : "https://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.png"}} />
            <ListItem.Content >
                <ListItem.Title style = {{ fontWeight : "800"}} >
                    {chatName}
                </ListItem.Title>

                <ListItem.Subtitle numberOfLines = {1} ellipsizeMode  = "tail">
                    This is a test https://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.pnghttps://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.pnghttps://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.pnghttps://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.pnghttps://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.pnghttps://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.pnghttps://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.pnghttps://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.pnghttps://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.pnghttps://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.pnghttps://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.pnghttps://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.pnghttps://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.pnghttps://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.pnghttps://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.pnghttps://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.png
                </ListItem.Subtitle>
            </ListItem.Content>

        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
