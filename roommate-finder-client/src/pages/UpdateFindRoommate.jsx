import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const UpdateFindRoommate = () => {
    const { _id,
        title, location, agerange, rentamount, description,
        contactnumber, availabilitytime, photo,
        roomType, smoker, petAvailable, petType: loadedPetType
    } = useLoaderData();

    const [isRoomType, setRoomType] = useState(roomType === 'Single');
    const [isSmoker, setIsSmoker] = useState(smoker === 'Smoker');
    const [isPetAvailable, setIsPetAvailable] = useState(petAvailable === 'Available');
    const [petType, setPetType] = useState(loadedPetType || '');

    const handleUpdateAddtoFindRoommate = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const findRoommateData = {
            ...data,
            roomType: isRoomType ? 'Single' : 'Shared',
            smoker: isSmoker ? 'Smoker' : 'Non-Smoker',
            petAvailable: isPetAvailable ? 'Available' : 'Not Available',
            petType: isPetAvailable ? petType : 'N/A'
        };

        console.log('Updated Roommate Data:', findRoommateData);

        fetch(`https://roommate-finder-server-neon.vercel.app/addtofindroommate/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(findRoommateData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Post Updated Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    return (
        <div className='px-24 py-8'>
            <h2 className='text-center text-3xl pb-8'>Update Your Find Roommate Post</h2>
            <form onSubmit={handleUpdateAddtoFindRoommate}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {[
                        { label: 'Title', name: 'title', type: 'text', defaultValue: title },
                        { label: 'Location', name: 'location', type: 'text', defaultValue: location },
                        { label: 'Age Range', name: 'agerange', type: 'number', defaultValue: agerange },
                        { label: 'Rent Amount', name: 'rentamount', type: 'number', defaultValue: rentamount },
                        { label: 'Description', name: 'description', type: 'text', defaultValue: description },
                        { label: 'Contact Number', name: 'contactnumber', type: 'number', defaultValue: contactnumber },
                        { label: 'Availability Time', name: 'availabilitytime', type: 'text', defaultValue: availabilitytime },
                        { label: 'Photo URL', name: 'photo', type: 'text', defaultValue: photo }
                    ].map(({ label, name, type, defaultValue }) => (
                        <fieldset key={name} className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">{label}</label>
                            <input type={type} name={name} defaultValue={defaultValue} className="input w-full" required />
                        </fieldset>
                    ))}

                    <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full flex items-center border p-4 gap-4">
                        <h2 className='label'>Room Type</h2>
                        <label className="label cursor-pointer gap-2">
                            <input type="radio" name="roomTypeRadio" className="radio" checked={isRoomType} onChange={() => setRoomType(true)} />
                            Single
                        </label>
                        <label className="label cursor-pointer gap-2">
                            <input type="radio" name="roomTypeRadio" className="radio" checked={!isRoomType} onChange={() => setRoomType(false)} />
                            Shared
                        </label>
                    </fieldset>

                    <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full flex border p-4 gap-4">
                        <label className="label cursor-pointer gap-2">
                            <input type="radio" name="smokerRadio" className="radio" checked={isSmoker} onChange={() => setIsSmoker(true)} />
                            Smoker
                        </label>
                        <label className="label cursor-pointer gap-2">
                            <input type="radio" name="smokerRadio" className="radio" checked={!isSmoker} onChange={() => setIsSmoker(false)} />
                            Non-Smoker
                        </label>
                    </fieldset>

                    <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full flex items-center border p-4 gap-4">
                        <h2 className='label'>Pet</h2>
                        <label className="label cursor-pointer gap-2">
                            <input type="radio" name="petAvailableRadio" className="radio" checked={isPetAvailable} onChange={() => setIsPetAvailable(true)} />
                            Yes
                        </label>
                        <label className="label cursor-pointer gap-2">
                            <input type="radio" name="petAvailableRadio" className="radio" checked={!isPetAvailable} onChange={() => setIsPetAvailable(false)} />
                            No
                        </label>
                    </fieldset>

                    <select
                        name="petType"
                        className="select w-full label"
                        value={petType}
                        onChange={(e) => setPetType(e.target.value)}
                        disabled={!isPetAvailable}
                        required={isPetAvailable}
                    >
                        <option value="">Pet Type</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Bird">Bird</option>
                        <option value="Fish">Fish</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button className="btn w-full my-8">Update Post</button>
            </form>
        </div>
    );
};

export default UpdateFindRoommate;