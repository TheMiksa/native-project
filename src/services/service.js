import {_authorsUrl, _postsUrl} from "./url";


const makeRequest = (url) => {
    return fetch(url)
        .then(res => res.json());
};



const authorsData = {
    getAuthors: () => makeRequest(_authorsUrl),
    getPosts: () => makeRequest(_postsUrl)

};

export default authorsData;
