import {StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput, Button, ScrollView} from 'react-native';
import authorsData from "./src/services/service";


export default function App() {
    const [authors, setAuthors] = useState([]);
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [currentAuthor, setCurrentAuthor] = useState(null);

    if (!posts.length) {
        authorsData.getPosts().then(setPosts);
    }
    if (!authors.length) {
        authorsData.getAuthors().then(setAuthors);
    }

    const onAuthorSearch = (author) => {
        if (currentAuthor) {
            if (currentAuthor === author.id) {
                return author;
            } else {
                return false
            }

        }
        if (!search) return true;
        return (author.name.toLowerCase().includes(search.toLowerCase()) ||
            author.email.toLowerCase().includes(search.toLowerCase()));
    }

    const handleAuthor = (authorId) => {
        if (currentAuthor) {
            setSearch("");
            setCurrentAuthor(null);
        } else {
            setCurrentAuthor(authorId)
        }
    };


    return (
        <View>
            <ScrollView style={{width: "100%"}}>
                {currentAuthor && (
                    <Author author={authors.find(({id}) => id === currentAuthor)}
                            posts={posts.filter(({userId}) => userId === currentAuthor)}
                            handleAuthor={handleAuthor}
                            isAuthorSelected={true}
                    />
                )}
                {!currentAuthor && (
                    <React.Fragment>
                        <SearchPanel onSearch={setSearch}/>
                        <AuthorList
                            authors={authors}
                            onAuthorSearch={onAuthorSearch}
                            posts={posts}
                            handleAuthor={handleAuthor}
                        />

                        <StatusBar style="auto"/>
                    </React.Fragment>
                )}
            </ScrollView>
        </View>
    );
}


const SearchPanel = ({onSearch}) => {
    return (
        <TextInput
            style={{height: 20, borderColor: 'gray', borderWidth: 1, marginTop: 50}}
            onChangeText={onSearch}
        />
    )
};

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

const Author = ({author, posts, handleAuthor, isAuthorSelected}) => {
    const [search, setSearch] = useState("");

    const onPostsSearch = (post) => {
        if (!search) return true;
        return post.title.toLowerCase().includes(search.toLowerCase());
    };

    const btnTitle = isAuthorSelected ? "Back to Search" : "Show all posts";

    return (
        <View style={{paddingBottom: 15}}>
            {isAuthorSelected && <SearchPanel onSearch={setSearch}/>}
            <Text>{author.name}</Text>
            <Text>{author.email}</Text>
            {isAuthorSelected && posts.filter(onPostsSearch).map(({title, body, id}) => (
                <View key={id} style={{paddingBottom: 10}}>
                    <Text style={{paddingTop: 5, paddingBottom: 5}}>Title: {title}</Text>
                    <Text>Body: {body}</Text>
                </View>
            ))}
            <Button onPress={() => {handleAuthor(author.id)}}
                    style={{backgroundColor: 'aqua', margin: "auto"}}
                    title={btnTitle}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

