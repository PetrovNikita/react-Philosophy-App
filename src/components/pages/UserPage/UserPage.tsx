import React from "react";
import {withRouter, match} from "react-router-dom";
import {Row, withService} from '../../hoc';
import {Comments} from '../../comments';

import './userPage.scss';

const UserPage: React.FunctionComponent<any> = ({match, service}) => {
    const userLogin: string = match.params.userLogin;
    let classNm;
    if (document.documentElement.clientWidth < 400 ) classNm="col";
    return (
        <>
            <h2>About {userLogin}</h2>
            <Row className={classNm}>
                <div className="persData">
                    <table>
                        <thead><tr><td>Personal Data:</td></tr></thead>
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>Nik</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="comments"> Comments:
                    <Comments getData = {() => service.getComments( "userLogin", userLogin)} />
                </div>
            </Row>
        </>
    );
}

export default withService( withRouter(UserPage));