import { View, TextInput, StyleSheet, Image } from "react-native";
import React from "react";

const styles = StyleSheet.create({
   imageSearch: {
       position: "absolute",
       width: 17.5,
       height: 17.5,
       left: 11,
       top: 22,
   }
});

const SearchPanel = ({onSearch}) => {
    return (
        <View>
            <Image style={styles.imageSearch}
                   source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
                    />
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10}}
                onChangeText={onSearch}
                placeholder="Search"
            />
        </View>
    )
};

export default SearchPanel;