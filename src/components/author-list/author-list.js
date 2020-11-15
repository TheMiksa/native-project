import { View, Text } from "react-native";
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
            <Text>Authors</Text>
            <SearchPanel onSearch={onSearch}/>
            {authors && authors.filter(onAuthorSearch).map((author, id) => (
                <View key={author.id} style={{

                    flexDirection: "row",
                    heightMin: 100,
                    padding: 10
                }}>
                   <View style={{ flex: 0.15}}>
                       <Text style={{
                           borderRadius: 50,
                           width: 50, height: 50,
                           paddingVertical: 15,
                           margin: "1%",
                           backgroundColor: colors[id],
                           textAlign: "center"

                       }}>
                           {getInitials(author.name)}
                       </Text>
                   </View>
                    <View style={{ flex: 0.85}}>
                        <Author
                            key={author.id}
                            author={author}
                            posts={posts.filter(({userId}) => userId === author.id)}
                            handleAuthor={(author) => handleAuthor(author)}
                            isAuthorSelected={false}
                        />
                    </View>
                </View>
            ))}
        </View>
    )
};

export default AuthorList;