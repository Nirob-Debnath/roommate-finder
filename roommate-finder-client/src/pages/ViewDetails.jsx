import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import { FaHeart } from 'react-icons/fa';

const ViewDetails = ({ currentUserId, postOwnerId }) => {
    const {
        title, location, agerange, rentamount, description,
        contactnumber, availabilitytime, photo,
        roomType, smoker, petAvailable, petType
    } = useLoaderData();

    const [liked, setLiked] = useState(false);
    const [showChatBox, setShowChatBox] = useState(false);

    const handleLike = () => {
        if (currentUserId === postOwnerId) {
            alert("You can't like your own post.");
            return;
        }
        setLiked(true);
    };

    const toggleChatBox = () => {
        setShowChatBox(prev => !prev);
    };

    return (
        <div className="card bg-base-100 shadow-2xl mx-28 my-8">
            <figure>
                <img className='w-[400px]' src={photo} alt="Room" />
            </figure>
            <div className="card-body flex flex-col justify-center items-center gap-y-8 text-center">
                <h2 className="card-title">{title}</h2>
                <p><span className='font-semibold textarea-lg'>Description <br /></span> {description}</p>
                <p><span className='font-semibold textarea-lg'>Location</span> <br /> {location}</p>

                <div className='grid grid-cols-3 gap-12'>
                    <p><span className='font-semibold'>Age<br /> </span> {agerange}</p>
                    <p><span className='font-semibold'>Rent<br /></span> {rentamount}</p>
                    <p><span className='font-semibold'>Availability Time<br /></span> {availabilitytime}</p>
                </div>

                <div className='grid grid-cols-4 gap-x-16'>
                    <p><span className='font-semibold'>Room Type</span><br />{roomType}</p>
                    <p><span className='font-semibold'>Smoker</span><br />{smoker}</p>
                    <p><span className='font-semibold'>Pet Available</span><br />{petAvailable}</p>
                    <p><span className='font-semibold'>Pet Type</span><br />{petType}</p>
                </div>

                <div>
                    <p><span className='font-semibold'>Contact Number<br /></span>
                        {liked ? contactnumber : '********'}
                    </p>
                </div>

                <div className="flex gap-4">
                    <button
                        className={`flex items-center gap-2 text-xl ${liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                        onClick={handleLike}
                    >
                        <FaHeart />
                        {liked ? 'Liked' : 'Like'}
                    </button>

                    <button
                        onClick={toggleChatBox}
                        className='btn bg-blue-500 text-white hover:bg-blue-600'
                    >
                        {showChatBox ? 'Close Chat' : 'Chat Now'}
                    </button>
                </div>

                {showChatBox && (
                    <div className="w-full mt-6 p-4 border border-base-300 rounded bg-base-100 shadow-md">
                        <h3 className="text-lg font-semibold mb-2 text-base-content">Chat Box</h3>
                        <div className="h-40 overflow-y-auto p-2 border border-base-300 rounded mb-2 bg-base-200">
                            <p className='text-base-content italic opacity-60'>No messages yet...</p>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                className="flex-grow border border-base-300 rounded px-3 py-2 bg-base-100 text-base-content"
                                placeholder="Type a message..."
                            />
                            <button className="btn btn-success text-white">Send</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewDetails;