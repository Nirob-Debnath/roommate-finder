import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

const Signup = () => {

    const { createUser } = use(AuthContext)

    const handleSignUp = e => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const { email, password, ...rest } = Object.fromEntries(formData.entries());

        //create user in the firebase
        createUser(email, password)
            .then(result => {
                console.log("Firebase user", result.user);

                const userProfile = {
                    email, ...rest,
                    creationTime: result.user?.metadata?.creationTime,
                    lastSignInTime: result.user?.metadata?.lastSignInTime
                }

                //save profile into the db

                fetch('https://roommate-finder-server-neon.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(userProfile)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log("Database User", data);
                        if (data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your account has created",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl my-6">
            <div className="card-body">
                <h1 className="text-5xl font-bold text-center pb-8">Sign Up</h1>
                <form onSubmit={handleSignUp} className="fieldset">

                    <label className="label">Name</label>
                    <input type="text" name="name" className="input" placeholder="Name" />

                    <label className="label">Email</label>
                    <input type="email" name="email" className="input" placeholder="Email" />

                    <label className="label">Photo URL</label>
                    <input type="text" name="photourl" className="input" placeholder="Photo URL" />

                    <label className="label">Password</label>
                    <input type="password" name="password" className="input" placeholder="Password" />

                    <button className="btn btn-neutral mt-4">Sign Up</button>
                </form>
                <h3>Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Login</Link></h3>
            </div>
            <button className="btn bg-white text-black border-[#e5e5e5] m-4">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Sign Up with Google
            </button>
        </div>
    );
};

export default Signup;