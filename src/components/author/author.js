import React, {useState} from "react";
import {Button, Text, View} from "react-native";
import SearchPanel from "../search-panel";

const Author = ({author, posts, handleAuthor, isAuthorSelected}) => {
    const [search, setSearch] = useState("");

    const onPostsSearch = (post) => {
        if (!search) return true;
        return (post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.body.toLowerCase().includes(search.toLowerCase()));
    };


    return (
        isAuthorSelected ? (
                <View style={{paddingBottom: 15}}>
                    <Text>{`${author.name}'s Posts`}</Text>
                    <SearchPanel onSearch={setSearch}/>
                    {isAuthorSelected && posts.filter(onPostsSearch).map(({title, body, id}) => (
                        <View key={id} style={{paddingBottom: 10}}>
                            <Text style={{paddingTop: 5, paddingBottom: 5}}>Title: {title}</Text>
                            <Text>Body: {body}</Text>
                        </View>
                    ))}
                    <Button onPress={() => {handleAuthor(author.id)}}
                            style={{backgroundColor: 'aqua', margin: "auto"}}
                            title="Back to Search"
                    />
                </View>
            ): ( <View style={{paddingBottom: 15}}>
                {isAuthorSelected && <SearchPanel onSearch={setSearch}/>}
                <Text>{author.name}</Text>
                <Text style={{fontSize: 10, color: 'grey'}}>{author.email}</Text>
                {isAuthorSelected && posts.filter(onPostsSearch).map(({title, body, id}) => (
                    <View key={id} style={{paddingBottom: 10}}>
                        <Text style={{paddingTop: 5, paddingBottom: 5}}>Title: {title}</Text>
                        <Text>Body: {body}</Text>
                    </View>
                ))}
                <Button onPress={() => {handleAuthor(author.id)}}
                        style={{backgroundColor: 'aqua', margin: "auto"}}
                        title={`${posts.length} posts`}
                />
            </View>
        ));

};

const AuthorContent = ({}) => {

    return (
        null
    );
};

export default Author;