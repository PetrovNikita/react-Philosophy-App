import React, { useState, useEffect } from "react";
import {withData} from '../hoc';

import './navigation.css';


function Navigation ({data, selectText }) {
    const [categories, setCategories]= useState(data);
    const [selectedCategory, changeSelectedCategory] = useState();
/*
    useEffect(() => {
        service.getCategories()
            .then((res) => setCategories(res))
            .catch((err) => console.log(err))
    }, []);*/

    const selectCategory = (categoryName) => {
        changeSelectedCategory(categoryName);
    }
    

    return (
        <nav className="categoriesNav">
            {categories.map
                (
                    ({categoryName, textsNames}) => 
                        <div key={categoryName} className="categoryContainer">
                            <div key={categoryName} className="categoryName" onClick={() => selectCategory(categoryName)}>
                                <span> {categoryName} </span>
                                {categoryName == selectedCategory &&
                                textsNames.map((textName) =>
                                    <div key={textName} className="textsNames" onClick={() => selectText(textName)}>
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