import {TextInput} from "react-native";
import React from "react";

const SearchPanel = ({onSearch}) => {
    return (
        <TextInput
            style={{height: 20, borderColor: 'gray', borderWidth: 1, marginTop: 50}}
            onChangeText={onSearch}
        />
    )
};

export default SearchPanel;