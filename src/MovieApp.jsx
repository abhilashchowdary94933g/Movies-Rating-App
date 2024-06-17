import React, { useState, useEffect } from "react";
import moviesObj from "./MoviesObj";


const MovieApp = () => {
    const [searchName, setSearchName] = useState("");
    const [filteredMovieList, setFilteredMovieList] = useState([]);
    const [rating, setRating] = useState("");
    const [category, setCategory] = useState("");
    const [inputFocused,setInputFocused]= useState(false)

    const changeFilteredMoviesList = (searchName, rating, category) => {
        const searchName1 = searchName.toLowerCase();
        const rating1 = rating;
        const category1 = category;
      if (searchName1 === "" && (rating1 === "" || rating1 === "any") && (category1 === "" || category1 === "any")) {
            setFilteredMovieList(moviesObj);
        }


       else if ((rating1 === "" || rating1 === "any") && (category1 === "" || category1 === "any")) {
            setFilteredMovieList(
                moviesObj.filter((eachMovie) => {
                    return eachMovie.title.toLowerCase().includes(searchName1);
                })
            );
        } else if ((rating1 !== "" && rating1 !== "any") && (category1 !== "" && category1 !== "any")) {
            setFilteredMovieList(
                moviesObj.filter((eachMovie) => {
                    return eachMovie.title.toLowerCase().includes(searchName1) && eachMovie.rating === rating1 
                    && eachMovie.category === category1;
                })
            );
        } else if ((rating1 !== "" && rating1 !== "any") && (category1 === "" || category1 === "any")) {
            setFilteredMovieList(
                moviesObj.filter((eachMovie) => {
                    return eachMovie.title.toLowerCase().includes(searchName1) && eachMovie.rating === rating1;
                })
            );
        } else if ((rating1 === "" || rating1 === "any") && category1 !== "" && category1 !== "any") {
            setFilteredMovieList(
                moviesObj.filter((eachMovie) => {
                    return eachMovie.title.toLowerCase().includes(searchName1) && eachMovie.category === category1;
                })
            );
        }
    };


    const handleCategory = (e) => {
        setCategory(e.target.value);
    };


    const changeSearchName = (e) => {
        setSearchName(e.target.value);
    };


    const handleRating = (e) => {
        setRating(e.target.value);
    };


    const renderStars = (rating) => {
        return "★".repeat(Math.floor(rating));
    };


    useEffect(() => {
        changeFilteredMoviesList(searchName, rating, category);
    }, [searchName, rating, category]);


    return (
        <div className="movie-app">
            <div className="input-container">
                <input placeholder="Enter movie name" type="text" onFocus={()=>setInputFocused(true)} onBlur={()=>setInputFocused(false)} onChange={changeSearchName} />
                <div className="dropdown-container">
                <select id="rating" name="rating" onFocus={()=>setInputFocused(true)} onBlur={()=>setInputFocused(false)} onChange={handleRating}>
                        <option value="" disabled selected>Rating</option>
                        <option value="any">Any Rating</option>
                        {[...Array(10)].map((_, i) => (
                           <option key={i + 1} value={(i + 1).toFixed(1)}>
                           {"★".repeat(i + 1)} {(i + 1)}
                          </option>
                        ))}
                    </select>
                    <select id="category" name="category" onFocus={()=>setInputFocused(true)} onBlur={()=>setInputFocused(false)} onChange={handleCategory}>
                        <option value="">Genre</option>
                        <option value="any">Any genre</option>
                        <option value="Action">Action</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Drama">Drama</option>
                    </select>
                </div>
            </div>
            {
                inputFocused &&
            <div className="movie-list">
                <ul>
                    {filteredMovieList.length > 0 && ( filteredMovieList.map((eachFilteredMovie, index) => (
                        <li key={index}>
                            <span className="movie-title">{eachFilteredMovie.title}</span>
                            <span className="movie-category">{eachFilteredMovie.category}</span>
                            <br />
                            {renderStars(eachFilteredMovie.rating)}
                        </li>
                    )))}
                </ul>
            </div>
            }
        </div>
    );
};


export default MovieApp;