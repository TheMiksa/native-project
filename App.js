
import React, {useState, useEffect} from 'react';
import { StatusBar, View, ScrollView } from 'react-native';

import authorsData from "./src/services/service";
import AuthorList from "./src/components/author-list";
import Author from "./src/components/author";

const toMixArray = (arr) => {
    const newArr = [];
    let i = 0;
    while ( i < arr.length) {
        let randEl = arr[Math.floor(Math.random() * arr.length)]
        if (!newArr.includes(randEl)) {
            newArr[i] = randEl;
            i++
        }
    }
    return newArr;
};
const colorsSet = [
    "rgb(118, 215, 245)", "rgb(91, 232, 88)", "rgb(242, 237, 80)",
    "rgb(242, 207, 80)", "rgb(242, 129, 80)", "rgb(80, 242, 231)",
    "rgb(80, 175, 242)", "rgb(80, 107, 242)", "rgb(123, 80, 242)",
    "rgb(199, 80, 242)", "rgb(242, 80, 196)", "rgb(242, 80, 139)",
    "rgb(242, 80, 80)", "rgb(80, 145, 242)", "rgb(80, 242, 204)",
    "rgb(100, 86, 235)"
];


export default function App() {
    const [authors, setAuthors] = useState([]);
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [currentAuthor, setCurrentAuthor] = useState(null);
    const [colors, setColors] = useState(toMixArray(colorsSet));



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
        <View  style={{
            backgroundColor: "rgb(243, 242, 255)"}}>
            <StatusBar backgroundColor="rgb(80, 175, 242)"/>
            <ScrollView style={{width: "100%"}}>
                {currentAuthor && (
                    <Author author={authors.find(({id}) => id === currentAuthor)}
                            posts={posts.filter(({userId}) => userId === currentAuthor)}
                            handleAuthor={handleAuthor}
                            isAuthorSelected={true}
                    />
                )}
                {!currentAuthor && (
                        <AuthorList
                            authors={authors}
                            onAuthorSearch={onAuthorSearch}
                            posts={posts}
                            handleAuthor={handleAuthor}
                            onSearch={setSearch}
                            colors={colors}
                        />

                )}
            </ScrollView>
        </View>
    );
};