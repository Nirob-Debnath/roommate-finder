import React from 'react';
import { Link } from 'react-router';

const FindRoommateCard = ({ findRoommate }) => {
    const { _id, title, location, agerange, rentamount, description, contactnumber,
        availabilitytime, photo, roomType, smoker, petAvailable, petType } = findRoommate;

    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={photo}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p><span className='font-semibold'>Description:</span> {description}</p>
                <p><span className='font-semibold'>Location:</span> {location}</p>
                <p><span className='font-semibold'>Age Range:</span> {agerange}</p>
                <p><span className='font-semibold'>Rent:</span> {rentamount}</p>
                <p><span className='font-semibold'>Contact Number:</span> {contactnumber}</p>
                <p><span className='font-semibold'>Availability Time:</span> {availabilitytime}</p>
                <p><span className='font-semibold'>Room Type:</span> {roomType}</p>
                <p className='font-semibold'>{smoker}</p>
                <p><span className='font-semibold'>Pet Available:</span> {petAvailable}</p>
                <p><span className='font-semibold'>Pet Type:</span> {petType}</p>
                <div className="card-actions justify-end">
                    <Link to={`/viewdetails/${_id}`} className="btn btn-primary my-4">See More</Link>
                </div>
            </div>
        </div>
    );
};

export default FindRoommateCard;