
import React, {useState, useEffect} from 'react';
import { StatusBar, View, ScrollView, Alert } from 'react-native';

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
    "rgb(242, 80, 80)", "rgb(242, 166, 80)", "rgb(242, 215, 80)",
    "rgb(242, 242, 80)", "rgb(223, 242, 80)", "rgb(200, 242, 80)",
    "rgb(169, 242, 80)", "rgb(98, 242, 80)", "rgb(80, 242, 107)",
    "rgb(80, 242, 161)", "rgb(80, 242, 203)", "rgb(80, 242, 242)",
    "rgb(80, 223, 242)", "rgb(80, 205, 242)", "rgb(80, 191, 242)",
    "rgb(80, 169, 242)", "rgb(80, 147, 242)", "rgb(80, 132, 242)",
    "rgb(80, 112, 242)", "rgb(80, 98, 242)", "rgb(80, 85, 242)",
    "rgb(98, 80, 242)", "rgb(122, 80, 242)", "rgb(134, 80, 242)",
    "rgb(161, 80, 242)", "rgb(178, 80, 242)", "rgb(188, 80, 242)",
    "rgb(205, 80, 242)", "rgb(225, 80, 242)", "rgb(242, 80, 242)",
    "rgb(242, 80, 218)", "rgb(242, 80, 186)", "rgb(242, 80, 156)",
    "rgb(242, 80, 129)", "rgb(242, 80, 107)", "rgb(242, 80, 93)"
];


export default function App() {
    const [authors, setAuthors] = useState([]);
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [currentAuthor, setCurrentAuthor] = useState(null);
    const [colors, setColors] = useState(toMixArray(colorsSet));

    useEffect(() => {
        authorsData.getPosts()
            .then(setPosts)
            .catch(error =>  {
                Alert.alert("Something has wrong (can't get Posts)",
                    `${error.message}`,
                    [{
                    text: "Ok",
                        onPress: () => null,
                        style: "ok"
                    }])
            throw error;});
        authorsData.getAuthors()
            .then(setAuthors)
            .catch(error =>  {
                Alert.alert("Something has wrong (can't get Authors)",
                    `${error.message}`,
                    [{
                        text: "Ok",
                        onPress: () => null,
                        style: "ok"
                    }])
                throw error;});
    }, []);


    /*if (!posts.length) {
        authorsData.getPosts().then(setPosts);
    }
    if (!authors.length) {
        authorsData.getAuthors().then(setAuthors);
    }*/

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
            marginLeft: 10,
            marginRight: 10}}>
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