import React, { useState, useEffect } from "react";
import {withService} from '../hoc';


import './navigation.css';


function Navigation ({service, selectText }) {
    const [categories, setCategories]= useState([]);
    const [selectedCategory, changeSelectedCategory] = useState();

    useEffect(() => {
        service.getCategories()
            .then((res) => setCategories(res))
            .catch((err) => console.log(err))
    }, []);

    const selectCategory = (categoryName) => {
        changeSelectedCategory(categoryName);
    }
    

    return (
        <nav className="categoriesNav">
            {categories.map
                (
                    ({categoryName, textsNames}) => 
                        <div key={categoryName} className="categoryContainer">
                            <div key={categoryName} className="categoryName" onClick={() => selectCategory(categoryName)}>{categoryName}</div>
                            {categoryName == selectedCategory &&
                            textsNames.map((textName) =>
                                <div key={textName} className="textsNames" onClick={() => selectText(textName)}>
                                    {textName}
                                </div>
                            )}
                        </div>
                )
            }
        </nav>
        
    );
}

export default withService(Navigation);