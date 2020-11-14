import { View, TextInput} from "react-native";
import React from "react";


const SearchPanel = ({onSearch}) => {
    return (
        <View>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10}}
                onChangeText={onSearch}
                placeholder="Search"
            />
        </View>
    )
};

export default SearchPanel;