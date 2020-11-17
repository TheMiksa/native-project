import React from "react";
import {Text, View} from "react-native";

const Post = ({post: {id, title, body}}) => {
    return (
        <View key={id}
              style={{
                  marginBottom: 5,
                  backgroundColor: "rgb(195, 90, 255)",
                  borderRadius: 5}}>
            <Text
                style={{
                    padding: 5,
                    backgroundColor: "rgb(162, 0, 255)",
                    borderRadius: 5}}>
                Title: {title}
            </Text>
            <Text style={{
                padding: 5
            }}>
                Body: {body}
            </Text>
        </View>
    )
};
export default Post;