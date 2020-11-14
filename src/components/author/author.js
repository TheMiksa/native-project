import React, {useState} from "react";
import {Button, Text, View} from "react-native";
import SearchPanel from "../search-panel";

const Author = ({author, posts, handleAuthor, isAuthorSelected}) => {

    return (
                <View style={{paddingBottom: 15}}>
                    {isAuthorSelected && (<AuthorPosts author={author} posts={posts} handleAuthor={handleAuthor}/>)}
                    {!isAuthorSelected && (<AuthorRow author={author} posts={posts} handleAuthor={handleAuthor}/>)}
                </View>
            )

};


const AuthorPosts = ({author, posts, handleAuthor}) => {
    const [search, setSearch] = useState("");

    const onPostsSearch = (post) => {
        if (!search) return true;
        return (post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.body.toLowerCase().includes(search.toLowerCase()));
    };

    return (
        <React.Fragment>
            <Text>{`${author.name}'s`}</Text>
            <SearchPanel onSearch={setSearch}/>
            {posts.filter(onPostsSearch)
                .map(({title, body, id}) => (
                    <View key={id} style={{paddingBottom: 10}}>
                        <Text style={{paddingTop: 5, paddingBottom: 5}}>Title: {title}</Text>
                        <Text>Body: {body}</Text>
                    </View>
                ))}
            <Button onPress={() => {handleAuthor(author.id)}}
                    style={{backgroundColor: 'aqua', margin: "auto"}}
                    title="Back to Search"
            />
        </React.Fragment>
    );
};

const AuthorRow = ({author, posts, handleAuthor}) => {
    return (
        <React.Fragment>
            <View style={{

                flexDirection: "row",
                heightMin: 100,
                padding: 10
            }}>
                <View style={{flex: 0.7}}>
                    <Text>{author.name}</Text>
                    <Text style={{fontSize: 10, color: 'grey'}}>
                        {author.email}
                    </Text>
                </View>
                <View style={{flex: 0.3}}>
                    <Button onPress={() => {handleAuthor(author.id)}}
                            color="rgb(100, 86, 235)"
                            title={`${posts.length} posts`}
                    />
                </View>
            </View>

        </React.Fragment>
    );
};

export default Author;