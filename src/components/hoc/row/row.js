import React from "react";
import './row.css';

export default function Row ({className="", children}) {
    return (
        <div className={"flex-row "+className} >
            {children}
        </div>
    )
}