import React from "react";
import {withRouter} from "react-router-dom";
import Header from '../../header';
import Navigation from '../../navigation';
import Text from '../../text';
import {Row} from '../../hoc';

function HomePage ({history, match}) {
    const {textName: textNameParam} = match.params;
    const selectText = (textName) => {
        history.push('/home/' + textName);
    };

    return (
        <React.Fragment>
            <Header />
            <Row>
                <Navigation selectText={selectText}/>
                <Text textNameParam={textNameParam} />
            </Row>
        </React.Fragment>
    );
}

export default withRouter(HomePage);