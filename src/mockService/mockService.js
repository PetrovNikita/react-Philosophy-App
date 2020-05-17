import mockServer from './mockServer.js';

const parser = new DOMParser();

class MockService {

    getCategories = async () => {
        let categories = await new Promise( (res, rej) => {setTimeout(() => res(mockServer.categories), 500)} );
        return categories;
    }
    
    getText = async (textName) => {
        let text = await new Promise( (res, rej) => {setTimeout(
            () => {
                let obj = mockServer.texts.find( (textObj) => textObj.textName==textName);
                res(obj.textBody)
            }, 500)
        } );
        return text;
    }

    getComments = async (textName) => {
        let comments = await new Promise( (res, rej) => { setTimeout(
            () => {
                let comments = mockServer.comments.filter( (comment) => comment.textName == textName);
                res(comments)
            }, 500)
        } );
        return comments;
    }

    postComment = async (commentObj) => {
        let postRes = await new Promise( (res, rej) => { setTimeout(
            () => {
                mockServer.comments.push(commentObj);
                res("comment got");
            }, 500)
        })
        return postRes;
    }
}

const mockService = new MockService();
export default mockService;