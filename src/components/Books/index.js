import React, {useEffect, useState} from 'react';
import './style.scss'
import Slider from "react-slick"
// import sublte from '../../img/subtleBook.png'
// import rules from '../../img/rulesBook.png'
// import markey from '../../img/markeyBook.png'
// import hevver from '../../img/hovverBook.png'
// import harry from '../../img/harryBook.png'
// import glob from '../../img/globBook.png'
import {Link} from "react-router-dom";
import axios from "axios";
import {json} from "react-router";

// https://www.googleapis.com/books/v1/volumes?q=isbn:0735619670

const Books = () => {

    const [books, setBooks] = useState([])

    const getBooks = async () => {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=code+complete`)
            const {data} = await response
            setBooks(data.items)
            // console.log(data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBooks()
    }, [])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1


    };

    return (
        <div className="container">
            <div className='books'>
                <div className="books__title">
                    <h1>Books</h1>
                    <Link to="/BooksPage" className='books__view'>View all</Link>
                </div>

                <div className="books__anyBooks">
                    <Slider {...settings}>
                    {books.map((item) => (
                        <div key={item.id}>
                            <img src={item.volumeInfo.imageLinks.thumbnail} alt=""/>
                            <h2>{item.volumeInfo.title}</h2>
                            <p>{item.volumeInfo.authors}</p>
                        </div>
                    ))}


                    </Slider>
                </div>
            </div>
        </div>

    );
};

export default Books;