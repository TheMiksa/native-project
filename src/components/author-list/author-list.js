import {View, Text} from "react-native";
import React from "react";
import Author  from "../author";
import SearchPanel from "../search-panel";

const AuthorList = ({authors, onAuthorSearch, posts, handleAuthor, onSearch}) => {
    return (
        <View>
            <Text>Authors</Text>
            <SearchPanel onSearch={onSearch}/>
            {authors && authors.filter(onAuthorSearch).map((author) => (
                <Author
                    key={author.id}
                    author={author}
                    posts={posts.filter(({userId}) => userId === author.id)}
                    handleAuthor={(author) => handleAuthor(author)}
                    isAuthorSelected={false}
                />
            ))}
        </View>
    )
};

export default AuthorList;