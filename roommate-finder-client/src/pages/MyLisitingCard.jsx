import React from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyLisitingCard = ({ findRoommate, findRoommates, setFindRoommates }) => {
    const { _id, title, location, agerange, rentamount, description, contactnumber,
        availabilitytime, photo, roomType, smoker, petAvailable, petType } = findRoommate;

    const handleDelete = (_id) => {
        console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://roommate-finder-server-neon.vercel.app/addtofindroommate/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your post has been deleted.",
                                icon: "success"
                            });
                            //remove the post
                            const remainingPost = findRoommates.filter(fr => fr._id !== _id);
                            setFindRoommates(remainingPost);
                        }
                    })
            }
        });
    }

    return (
        <div className="card bg-base-100 w-[400px] shadow-2xl mx-12 my-8">
            <figure>
                <img
                    src={photo}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p><span className='font-semibold'>Description:</span> {description}</p>
                <p><span className='font-semibold'>Location:</span> {location}</p>
                <p><span className='font-semibold'>Age:</span> {agerange}</p>
                <p><span className='font-semibold'>Rent:</span> {rentamount}</p>
                <p><span className='font-semibold'>Contact Number:</span> {contactnumber}</p>
                <p><span className='font-semibold'>Availability Time:</span> {availabilitytime}</p>
                <p><span className='font-semibold'>Room Type:</span> {roomType}</p>
                <p className='font-semibold'>{smoker}</p>
                <p><span className='font-semibold'>Pet Available:</span> {petAvailable}</p>
                <p><span className='font-semibold'>Pet Type:</span> {petType}</p>
                <div className="join join-vertical lg:join-horizontal gap-x-4 justify-end mt-2">
                    {/* <Link to={`/viewdetails/${_id}`} className="btn join-item">View Details</Link> */}
                    <Link to={`/update/${_id}`} className="btn btn-primary rounded-sm">Update</Link>
                    <button onClick={() => handleDelete(_id)} className="btn btn-primary rounded-sm">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default MyLisitingCard;