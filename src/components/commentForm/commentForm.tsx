import React, {useState, useRef} from "react";
import { withService } from "../hoc";
import { IComment } from "../../interfaces"

import './commentForm.css';

const CommentForm:React.FC<{ textNameParam: string, postComment: (comment: IComment) => PromiseLike<string>, updateComments: ()=>Array<IComment> }> 
= ({textNameParam, postComment, updateComments}) => {
    const [state, changeState] = useState<{commentText?: string}>({});
    const textInputRef = useRef<HTMLTextAreaElement>();
    

    function handleCommentTextChange(event) {
        changeState({commentText: event.target.value});
    }

    function onFocus() {
        textInputRef.current.select();
    }

    function handleSubmit(event) {
        event.preventDefault();
        let commentObj = {
            'commentText': state.commentText,
            'userLogin': 'Nik',//localStorage.getItem('userLogin'),
            'textName': textNameParam,
            'commentDate': new Date(),
        };
        postComment(commentObj)
            .then( resp => {
                console.log(resp);
                if (resp == "comment got") {
                    updateComments();
                    changeState({commentText: 'Your comment'})
                }
            });
    }

    return (
        <div className="commentFormContainer">
            <form className="commentForm" onSubmit={handleSubmit}>
                <textarea name="commentText" onFocus={onFocus} onChange={handleCommentTextChange} onSubmit={handleSubmit}
                    value = {state.commentText}
                    className="commentFormTextInput"
                    ref={textInputRef}
                    defaultValue="Your comment" cols={30} rows={1} />
                <input type="submit" className="commentFormSubmit" value="Send"></input>
            </form>
        </div>
    );
};

export default withService(CommentForm);