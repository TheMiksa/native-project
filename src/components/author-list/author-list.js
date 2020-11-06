import {View} from "react-native";
import React from "react";
import Author  from "../author";

const AuthorList = ({authors, onAuthorSearch, posts, handleAuthor}) => {
    return (
        <View>
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