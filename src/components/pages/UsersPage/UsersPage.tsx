import React from "react";
import {withService} from "../../hoc";

const UsersPage:React.FC<{service: any}> = ({service}) => {
    return <>
        Users
    </>;
}

export default withService(UsersPage);