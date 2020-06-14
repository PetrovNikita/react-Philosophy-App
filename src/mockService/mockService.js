import mockServer from './mockServer.js';

const parser = new DOMParser();

class MockService {

    getCategories = async () => {
        let categories = await new Promise( (res, rej) => {setTimeout(() => res(mockServer.categories), 500)} );
        return categories;
    };
    
    getText = async (textName) => {
        let text = await new Promise( (res, rej) => {setTimeout(
            () => {
                let obj = mockServer.texts.find( (textObj) => textObj.textName==textName);
                res(obj.textBody)
            }, 500)
        } );
        return text;
    };

    getComments = async (paramName, paramValue) => {
        let comments = await new Promise( (res, rej) => { setTimeout(
            () => {
                let comments = mockServer.comments
                    .filter( (comment) => comment[paramName] == paramValue)
                    .map( (comment) => {
                        let newComment = {};
                        for (let [field, value] of Object.entries(comment)) if (field != paramName) newComment[field]=value;
                        return newComment;
                    }
                    );
                res(comments)
            }, 500)
        } );
        return comments;
    };

    postComment = async (commentObj) => {
        let postRes = await new Promise( (res, rej) => { setTimeout(
            () => {
                mockServer.comments.push(commentObj);
                res("comment got");
            }, 500)
        })
        return postRes;
    };

    postRegForm = async (FormData) => {
        console.log(FormData);
        return "form data posted";
    };

    postLoginForm = async (FormData) => {
        return "LOGIN_SUCCESS";
    }
}

const mockService = new MockService();
export default mockService;