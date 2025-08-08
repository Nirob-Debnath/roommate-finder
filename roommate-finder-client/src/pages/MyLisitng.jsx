import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import MyLisitingCard from './MyLisitingCard';

const MyLisitng = () => {
    const initialfindRoommates = useLoaderData();
    const [findRoommates, setFindRoommates] = useState(initialfindRoommates);
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    findRoommates.map(findRoommate => <MyLisitingCard key={findRoommate._id}
                        findRoommates={findRoommates}
                        setFindRoommates={setFindRoommates}
                        findRoommate={findRoommate}></MyLisitingCard>)
                }
            </div>
        </div>
    );
};

export default MyLisitng;