import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router';
import FindRoommateCard from './FindRoommateCard';
import { Typewriter } from 'react-simple-typewriter';
import { Fade } from "react-awesome-reveal";

const Home = () => {
    const data = useLoaderData();
    const [search, setSearch] = useState(data);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const lowerText = searchText.trim().toLowerCase();
        if (lowerText === '') {
            setSearch(data);
        } else {
            const searchedRoommates = data.filter(person =>
                Object.values(person)
                    .join(' ')
                    .toLowerCase()
                    .includes(lowerText)
            );
            setSearch(searchedRoommates);
        }
    }, [searchText, data]);

    return (
        <div>
            <div className='App'>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center' }}>
                    <Typewriter
                        words={['Welcome to roommate finder website']}
                        loop={1}
                        cursor
                        cursorStyle="|"
                        typeSpeed={80}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </h1>
            </div>

            <Fade>
                <p className='text-center text-xl'>You can find your roommate here</p>
            </Fade>

            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <img src="https://i.ibb.co/7d4VXZXZ/banner-01.png" className="w-full h-[400px]" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img src="https://i.ibb.co/fdQxQkdR/banner-02.jpg" className="w-full h-[400px]" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img src="https://i.ibb.co/B562Fc9M/Shadow-Welcome-March-Banner.jpg" className="w-full h-[400px]" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>

            <div className='flex justify-center items-center gap-2 m-4'>
                <input
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    type="text"
                    placeholder='Search by anything...'
                    className='w-80 h-11 px-4 rounded-full border border-gray-300 bg-white'
                />
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-20 mb-10'>
                {
                    search.length > 0 ? (
                        search.map(findRoommate => (
                            <FindRoommateCard key={findRoommate._id} findRoommate={findRoommate} />
                        ))
                    ) : (
                        <p className="text-center col-span-3 text-red-500 font-semibold">
                            No results found.
                        </p>
                    )
                }
            </div>
        </div>
    );
};

export default Home;