import React from "react";
import { View, TextInput, StyleSheet, Image, Alert } from "react-native";

const styles = StyleSheet.create({
   imageSearch: {
       width: 17.5,
       height: 17.5,
       marginTop: 7,
       marginLeft: 2
   }
});

const SearchPanel = ({onSearch}) => {
    return (
        <View style={{
            flexDirection: "row",
            heightMin: 20,
            borderColor: "grey",
            borderWidth: 1,
            borderRadius: 3,
            marginBottom: 5,}}>

            <View style={{
                flex: 0.05,
                height: 30}}>
                <Image style={styles.imageSearch}
                       source={require('../../../assets/search-icon.png')}/>
            </View>

            <View style={{
                flex: 0.95,
                height: 30
            }}>
                <TextInput
                    style={{height: 20, marginTop: 3}}
                    onChangeText={onSearch}
                    placeholder="Search"
                />
            </View>
        </View>
    )
};

export default SearchPanel;