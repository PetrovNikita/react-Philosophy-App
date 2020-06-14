import React, { useEffect, useState } from "react";
import { withData } from '../hoc'; 

import './text.scss';

function Text ({textNameParam, data}) {


    return (
        <div className="textContainer"> 
            <div key="name" className="textName">{textNameParam}</div>
            <div key="body" className="textBody">{data}</div>
        </div>
    );
}


export default withData(Text);