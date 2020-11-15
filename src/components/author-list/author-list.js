import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import Author  from "../author";
import SearchPanel from "../search-panel";

const AuthorList = ({authors, onAuthorSearch, posts, handleAuthor, onSearch, colors}) => {

    const getInitials = (name) => {
        const initials = name.match(/(\w)\w*\s(\w)\w*/);
        return initials[1] + initials[2];
    };

    return (
        <View>
            <Text style={{fontWeight: "700", }}>Authors</Text>
            <SearchPanel onSearch={onSearch}/>
            {authors && authors.filter(onAuthorSearch).map((author, id) => (
                <TouchableWithoutFeedback
                    key={author.id}
                    onPress={() => {handleAuthor(author.id)}}>
                    <View
                          style={{
                              borderBottomColor: "#D0D0D0",
                              borderBottomWidth: 1,
                              flexDirection: "row",
                              heightMin: 50,
                              marginBottom: 20
                          }}>
                        <View style={{ flex: 0.15,
                            height: 60}}>
                            <Text style={{
                                borderRadius: 50,
                                width: 50, height: 50,
                                paddingVertical: 15,
                                backgroundColor: colors[id],
                                textAlign: "center"

                            }}>
                                {getInitials(author.name)}
                            </Text>
                        </View>
                        <View style={{ flex: 0.85,
                            height: 60}}>
                            <Author
                                key={author.id}
                                author={author}
                                posts={posts.filter(({userId}) => userId === author.id)}
                                handleAuthor={(author) => handleAuthor(author)}
                                isAuthorSelected={false}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            ))}
        </View>
    )
};

export default AuthorList;