import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddFindRoommate = () => {
    const [isRoomType, setRoomType] = useState(true); // true = Single, false = Shared
    const [isSmoker, setIsSmoker] = useState(true); // true = Smoker, false = Non-Smoker
    const [isPetAvailable, setPetNotAvailable] = useState(true);
    const [petType, setPetType] = useState('');

    const handleAddtoFindRoommate = e => {
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

        console.log(findRoommateData);

        fetch('https://roommate-finder-server-neon.vercel.app/addtofindroommate', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(findRoommateData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Posted Successfully",
                        icon: "success",
                        draggable: true
                    });
                }
                form.reset();

                // Reset all state
                setRoomType(true);
                setIsSmoker(true);
                setPetNotAvailable(true);
                setPetType('');
            });
    };

    return (
        <div className='px-24 py-8'>
            <h2 className='text-center text-3xl pb-8'>Add Information to Find Roommate</h2>
            <form onSubmit={handleAddtoFindRoommate}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Title</label>
                        <input type="text" name="title" className="input w-full" placeholder="Title" required />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Location</label>
                        <input type="text" name="location" className="input w-full" placeholder="Location" required />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Age</label>
                        <input type="number" name="agerange" className="input w-full" placeholder="Age" required />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Rent Amount</label>
                        <input type="number" name="rentamount" className="input w-full" placeholder="Rent Amount" required />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Description</label>
                        <input type="text" name="description" className="input w-full" placeholder="Description" required />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Contact Number</label>
                        <input type="number" name="contactnumber" className="input w-full" placeholder="Contact Info" required />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Availability Time</label>
                        <input type="text" name="availabilitytime" className="input w-full" placeholder="Availability Time" required />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                        <label className="label">Photo URL</label>
                        <input type="text" name="photo" className="input w-full" placeholder="Photo URL" required />
                    </fieldset>

                    {/* Room Type */}
                    <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full flex items-center border p-4 gap-4">
                        <div>
                            <h2 className='label'>Room Type</h2>
                        </div>
                        <label className="label cursor-pointer gap-2">
                            <input
                                type="radio"
                                name="roomTypeRadio"
                                className="radio"
                                checked={isRoomType}
                                onChange={() => setRoomType(true)}
                            />
                            Single
                        </label>
                        <label className="label cursor-pointer gap-2">
                            <input
                                type="radio"
                                name="roomTypeRadio"
                                className="radio"
                                checked={!isRoomType}
                                onChange={() => setRoomType(false)}
                            />
                            Shared
                        </label>
                    </fieldset>

                    {/* Smoker */}
                    <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full items-center flex border p-4 gap-4">
                        <div>
                            <h2 className='label'>Smoker</h2>
                        </div>
                        <label className="label cursor-pointer gap-2">
                            <input
                                type="radio"
                                name="smokerRadio"
                                className="radio"
                                checked={isSmoker}
                                onChange={() => setIsSmoker(true)}
                            />
                            Yes
                        </label>
                        <label className="label cursor-pointer gap-2">
                            <input
                                type="radio"
                                name="smokerRadio"
                                className="radio"
                                checked={!isSmoker}
                                onChange={() => setIsSmoker(false)}
                            />
                            No
                        </label>
                    </fieldset>

                    {/* Pet Availability */}
                    <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full flex items-center border p-4 gap-4">
                        <div>
                            <h2 className='label'>Pet</h2>
                        </div>
                        <label className="label cursor-pointer gap-2">
                            <input
                                type="radio"
                                name="petAvailableRadio"
                                className="radio"
                                checked={isPetAvailable}
                                onChange={() => setPetNotAvailable(true)}
                            />
                            Yes
                        </label>
                        <label className="label cursor-pointer gap-2">
                            <input
                                type="radio"
                                name="petAvailableRadio"
                                className="radio"
                                checked={!isPetAvailable}
                                onChange={() => setPetNotAvailable(false)}
                            />
                            No
                        </label>
                    </fieldset>

                    {/* Pet Type Dropdown */}
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

                <button className="btn w-full my-8">Post</button>
            </form>
        </div>
    );
};

export default AddFindRoommate;
