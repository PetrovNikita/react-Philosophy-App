import React from "react";
import { withService } from "../hoc";

import './commentForm.css';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleCommentTextChange = this.handleCommentTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.textInputRef = React.createRef();
    }

    handleCommentTextChange(event) {
        this.setState({commentText: event.target.value}, () => console.log(this.state));
    }

    onFocus() {
        this.textInputRef.current.select();
    }

    handleSubmit(event) {
        event.preventDefault();
        let commentObj = {
            'commentText': this.state.commentText,
            'userLogin': 'Nik',//localStorage.getItem('userLogin'),
            'textName': this.props.textNameParam,
            'commentDate': new Date(),
        };
        this.props.postComment(commentObj)
            .then( resp => {
                console.log(resp);
                if (resp == "comment got") {
                    this.props.updateComments();
                    this.setState({commentText: 'Your comment'})
                }
            });
    }



    render() {
        return (
        <div className="commentFormContainer">
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <textarea name="commentText" onFocus={this.onFocus} onChange={this.handleCommentTextChange} onSubmit={this.handleSubmit}
                    className="commentFormTextInput"
                    ref={this.textInputRef}
                    defaultValue="Your comment" cols="30" rows="1" />
                <input type="submit" className="commentFormSubmit" value="Send"></input>
            </form>
        </div>
        );
    }
};

export default withService(CommentForm)