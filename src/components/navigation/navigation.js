import React, { useState, useEffect } from "react";
import {withData} from '../hoc';

import './navigation.css';


function Navigation ({data, selectText }) {
    const [selectedCategory, changeSelectedCategory] = useState();
    const [showHideNav, toggleShowHideNav] = useState(true);


    const selectCategory = (categoryName) => {
        changeSelectedCategory(categoryName);
    };

    const toggleNav = () => toggleShowHideNav((showHideNav) => !showHideNav);
    
    //if (document.documentElement.clientWidth < 400 && showHideNav) return <button onClick={toggleNav}>+</button>;

    return (
        <nav className="categoriesNav">
            {data.map
                (
                    ({categoryName, textsNames}) => 
                        <div key={categoryName} className="categoryContainer">
                            <div key={categoryName} className="categoryName" onClick={() => selectCategory(categoryName)}>
                                <span> {categoryName} </span>
                                {categoryName == selectedCategory &&
                                textsNames.map((textName) =>
                                    <div key={textName} className="textsNames" onClick={() => {toggleNav(); selectText(textName);}}>
                                        {textName}
                                    </div>
                                )}
                            </div>
                        </div>
                )
            }
        </nav>
        
    );
}

export default withData(Navigation);