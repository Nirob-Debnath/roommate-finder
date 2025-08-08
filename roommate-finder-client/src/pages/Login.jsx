import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router';

const LogIn = () => {

    const { signInUser } = use(AuthContext);

    const handleSignIn = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        //send to firebase
        signInUser(email, password)
            .then(result => {
                console.log(result.user);
                const signInInfo = {
                    email,
                    lastSignInTime: result.user?.metadata?.lastSignInTime
                }
                fetch('https://roommate-finder-server-neon.vercel.app/users', {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(signInInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl my-6">
            <div className="card-body">
                <h1 className="text-5xl font-bold text-center pb-8">Login</h1>
                <form onSubmit={handleSignIn} className="fieldset">

                    <label className="label">Email</label>
                    <input type="email" name="email" className="input" placeholder="Email" />

                    <label className="label">Password</label>
                    <input type="password" name="password" className="input" placeholder="Password" />

                    <div><a className="link link-hover">Forgot password?</a></div>

                    <button className="btn btn-neutral mt-4">Login</button>

                    <div><h3 className='font-semibold'>Don't have an account? Please <Link to="/signup" className='text-blue-600'>Sign Up</Link></h3></div>
                </form>
            </div>
        </div>
    );
};

export default LogIn;