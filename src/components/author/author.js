import React, {useState, useEffect} from "react";
import {Button, Text, View, BackHandler } from "react-native";
import SearchPanel from "../search-panel";
import Post from "../post";

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

    useEffect(() => {
        const backAction = () => {
            handleAuthor(author.id);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);


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
                .map(post => (
                    <Post post={post}></Post>
                ))}
            <Button onPress={() => handleAuthor(author.id)}
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
                    <Text style={{
                        color: "rgb(100, 86, 235)",
                        textAlign: "center",
                        marginTop: 5}}>
                        {`${posts.length} posts`}
                    </Text>
                    {/*<Button onPress={() => {handleAuthor(author.id)}}
                            color="rgb(100, 86, 235)"
                            title={`${posts.length} posts`}
                    />*/}
                </View>
            </View>

        </React.Fragment>
    );
};

export default Author;