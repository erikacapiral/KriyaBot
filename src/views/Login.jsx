import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;


    useEffect(() => {
        axios.get('http://localhost:8000/authentication')
            .then(res => {
                if (res.data.valid) {
                    navigate('/');
                } else {
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/', values)
            .then(res => {
                if (res.data.Login) {
                    navigate('/');
                } else {
                    alert(res.data.Error);
                }
            })
            .catch(err => console.error(err));
    }

    return (

        <section className='bg-[#FFFFF] min-h-screen flex items-center justify-center'>
            <div className='bg-gradient-to-r from-orange-500 to-orange-400 flex rounded-2xl shadow-lg max-w-3xl p-5'>
                <div className='md:w-1/2 px-16'>
                    <h2 className='text-center font-bold text-2xl text-[#F5F5F5]'>Kriya.</h2>
                    <p className='text-sm text-center mt-3 text-[#F5F5F5]'>Please login your account</p>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <div>
                            {/* <label for="email" class="sr-only">Email address</label> */}
                            <div class="relative">
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    // className='w-full rounded-lg border-0 p-10 py-1.5 text-[#36454F] text-md ring-1 ring-inset ring-[#36454F]'
                                    className='w-full p-2 mt-8 rounded-xl border placeholder:text-sm'
                                    placeholder="Enter email" onChange={e => setValues({ ...values, email: e.target.value })}
                                />
                                <span className="mt-8 absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="size-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div>
                            <label for="password" class="sr-only">Password</label>
                            <div class="relative">
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    // className='w-full rounded-lg border-0 p-10 py-1.5 text-[#36454F] text-md ring-1 ring-inset ring-[#36454F]'
                                    className='w-full p-2 rounded-xl border placeholder:text-sm '
                                    placeholder="Enter password" onChange={e => setValues({ ...values, password: e.target.value })}
                                />
                                <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="size-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div class="place-self-end w-full">
                            <button
                                type="submit"
                                // className="inline-block rounded-lg w-full bg-[#CC5500] px-5 py-3 text-sm font-medium text-white"
                                className='bg-[#CC5500] w-full rounded-xl text-white py-2'
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
                <div className='md:block hidden w-1/2'>
                    <img src="https://img.freepik.com/free-photo/3d-rendering-isometric-house_23-2150728036.jpg" alt="Office" className='rounded-2xl' />
                </div>
            </div>
        </section>


    );
}

export default Login