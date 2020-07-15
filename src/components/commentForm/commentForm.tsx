import React, {useState, useRef} from "react";
import { withService } from "../hoc";
import { IComment } from "../../interfaces"

import './commentForm.scss';

const CommentForm:React.FC<{ textNameParam: string, postComment: (comment: IComment) => PromiseLike<string>, updateComments: ()=>Array<IComment> }> 
= ({textNameParam, postComment, updateComments}) => {
    const [commentText, changeCommentText] = useState<string>();
    const textInputRef = useRef<HTMLTextAreaElement>();
    

    function handleCommentTextChange(event) {
        changeCommentText(event.target.value);
    }

    function onFocus() {
        textInputRef.current.select();
    }

    function handleSubmit(event) {
        event.preventDefault();
        let commentObj = {
            'commentText': commentText,
            'userLogin': localStorage.getItem('userLogin'),
            'textName': textNameParam,
            'commentDate': new Date(),
        };
        postComment(commentObj)
            .then( resp => {
                console.log(resp);
                if (resp == "comment got") {
                    updateComments();
                    changeCommentText('Your comment')
                }
            });
    }

    return (
        <div className="commentFormContainer">
            <form className="commentForm" onSubmit={handleSubmit}>
                <textarea name="commentText" onFocus={onFocus} onChange={handleCommentTextChange} onSubmit={handleSubmit}
                    value = {commentText}
                    className="commentFormTextInput"
                    ref={textInputRef}
                    defaultValue="Your comment" cols={30} rows={1} />
                <input type="submit" className="commentFormSubmit" value="Send"></input>
            </form>
        </div>
    );
};

export default withService(CommentForm);