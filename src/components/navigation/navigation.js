import React, { useState, useEffect } from "react";
import './navigation_style.css';
import mockService from '../../mockService';

export default function Navigation () {
    const [categories, setCategories]= useState([]);
    const [selectedCategory, changeSelectedCategory] = useState();

    useEffect(() => {
        console.log('eff');
        mockService.getCategories()
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
                                <div key={textName} className="textsNames">{textName}</div>
                            )}
                        </div>
                )
            }
        </nav>
    );
}
