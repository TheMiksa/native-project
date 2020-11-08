import {TextInput} from "react-native";
import React from "react";

const SearchPanel = ({onSearch}) => {
    return (
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10}}
            onChangeText={onSearch}
            placeholder="Search"
        />
    )
};

export default SearchPanel;