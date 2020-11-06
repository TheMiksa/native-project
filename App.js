import {StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import authorsData from "./src/services/service";
import AuthorList from "./src/components/author-list";
import Author from "./src/components/author";
import SearchPanel from "./src/components/search-panel";


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
        <View >
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
};


