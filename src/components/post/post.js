import React from "react";
import {Text, View} from "react-native";

const Post = ({post: {id, title, body}}) => {
    return (
        <View key={id}
              style={{
                  paddingBottom: 10,
                  backgroundColor: "rgb(195, 90, 255)",
                  borderRadius: 5}}>
            <Text
                style={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    backgroundColor: "rgb(162, 0, 255)",
                    borderRadius: 5}}>
                Title: {title}
            </Text>
            <Text>
                Body: {body}
            </Text>
        </View>
    )
};
export default Post;