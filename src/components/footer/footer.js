import React, { useRef, useState, useEffect} from "react";

import './footer.css';

export default function Footer() {

    const footerElem = useRef();
    const [style, setStyle] = useState();

    useEffect(() => {
        const prevBottom = footerElem.current.previousElementSibling.getBoundingClientRect().bottom;
        const footerHeight = parseInt(getComputedStyle(footerElem.current).height);
        console.log(prevBottom, footerHeight);
        setStyle({
            top: (document.documentElement.clientHeight - prevBottom - footerHeight) + 'px'
        });
    }, []);

    return <div className="footer" style={style} ref={footerElem}>All right reserved.</div>;
}