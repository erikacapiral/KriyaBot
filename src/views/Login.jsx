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
                    navigate('/home');
                } else {
                    navigate('/');
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/', values)
            .then(res => {
                if (res.data.Login) {
                    navigate('/home');

                } else {
                    alert(res.data.Error);
                }
            })
            .catch(err => console.error(err));
    }

    return (

        <section className='bg-white min-h-screen flex items-center justify-center'>
            <div className='bg-[#EFA36D] flex rounded-2xl shadow-lg max-w-3xl p-5'>
                <div className='md:w-1/2 px-16'>
                    <h1 className='font-bold text-2xl text-[#CC4500]'>Kriya.</h1>
                    <p className='text-sm mt-4 text-[#CC4500]'>Please login your account</p>
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

        // <div class="flex justify-start items-center h-screen bg-[#CC5500]">
        //     <div class="mx-auto">
        //         <div class="flex justify-between items-center h-screen">
        //             <div class="w-1/2 h-full">
        //                 <img
        //                     src="https://img.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_185193-110089.jpg?t=st=1713149170~exp=1713152770~hmac=561c5203a154229351708c255a303deb6c42933bf2bd690d91ccddea157d747c&w=826"
        //                     alt="Your Left Image"
        //                     class="h-1/2 w-full object-cover"
        //                 />
        //             </div>
        //             <div class="w-1/2 h-1/2 bg-[#CC5500]">
        //                 <div class="mx-auto flex-grow">
        //                     <h1 class="text-5xl text-white text-center sm:text-5xl font-extrabold">Kriya.</h1>

        //                     <div class='card w-full max-w-md bg-white rounded-lg border-0 shadow-xl p-10 mt-2 relative'>
        //                         <p class="text-center font-bold pb-5 text-[#36454F]">Login</p>
        //                         <form onSubmit={handleSubmit} class="space-y-4">
        //                             <div>
        //                                 <label for="email" class="sr-only">Email address</label>

        //                                 <div class="relative">
        //                                     <input
        //                                         type="email"
        //                                         name="email"
        //                                         required
        //                                         className='w-full rounded-lg border-0 p-10 py-1.5 text-[#36454F] text-md ring-1 ring-inset ring-[#36454F]'
        //                                         placeholder="Enter email" onChange={e => setValues({ ...values, email: e.target.value })}
        //                                     />

        //                                     <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
        //                                         <svg
        //                                             xmlns="http://www.w3.org/2000/svg"
        //                                             class="size-4 text-gray-400"
        //                                             fill="none"
        //                                             viewBox="0 0 24 24"
        //                                             stroke="currentColor"
        //                                         >
        //                                             <path
        //                                                 stroke-linecap="round"
        //                                                 stroke-linejoin="round"
        //                                                 stroke-width="2"
        //                                                 d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
        //                                             />
        //                                         </svg>
        //                                     </span>
        //                                 </div>
        //                             </div>

        //                             <div>
        //                                 <label for="password" class="sr-only">Password</label>

        //                                 <div class="relative">
        //                                     <input
        //                                         type="password"
        //                                         name="password"
        //                                         required
        //                                         className='w-full rounded-lg border-0 p-10 py-1.5 text-[#36454F] text-md ring-1 ring-inset ring-[#36454F]'
        //                                         placeholder="Enter password" onChange={e => setValues({ ...values, password: e.target.value })}
        //                                     />

        //                                     <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
        //                                         <svg
        //                                             xmlns="http://www.w3.org/2000/svg"
        //                                             class="size-4 text-gray-400"
        //                                             fill="none"
        //                                             viewBox="0 0 24 24"
        //                                             stroke="currentColor"
        //                                         >
        //                                             <path
        //                                                 stroke-linecap="round"
        //                                                 stroke-linejoin="round"
        //                                                 stroke-width="2"
        //                                                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        //                                             />
        //                                             <path
        //                                                 stroke-linecap="round"
        //                                                 stroke-linejoin="round"
        //                                                 stroke-width="2"
        //                                                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        //                                             />
        //                                         </svg>
        //                                     </span>
        //                                 </div>
        //                             </div>

        //                             <div class="place-self-end">
        //                                 <button
        //                                     type="submit"
        //                                     className="inline-block rounded-lg w-full bg-[#CC5500] px-5 py-3 text-sm font-medium text-white"
        //                                 >
        //                                     Sign in
        //                                 </button>
        //                             </div>
        //                         </form>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        // <div class="mx-auto  px-4 py-16 sm:px-6 lg:px-8 h-screen w-screen bg-gradient-to-l from-cyan-500 to [#037148]">

        //     <div className=''>


        //         <div class="mx-auto max-w-2xl text-center font-bold">
        //             <h1 class="text-3xl font-extrabold sm:text-3xl">TsekSuite.</h1>
        //         </div>

        //         <div className='card w-1/3 bg-base-100 shadow-xl md:max-w-3/4 p-10 mt-10 mx-0'>
        //             <p class="text-center pb-5">Login</p>
        //             <form onSubmit={handleSubmit} class="space-y-4">
        //                 <div>
        //                     <label for="email" class="sr-only">Email address</label>

        //                     <div class="relative">
        //                         <input
        //                             type="email"
        //                             name="email"
        //                             required
        //                             class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
        //                             placeholder="Enter email" onChange={e => setValues({ ...values, email: e.target.value })}
        //                         />

        //                         <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
        //                             <svg
        //                                 xmlns="http://www.w3.org/2000/svg"
        //                                 class="size-4 text-gray-400"
        //                                 fill="none"
        //                                 viewBox="0 0 24 24"
        //                                 stroke="currentColor"
        //                             >
        //                                 <path
        //                                     stroke-linecap="round"
        //                                     stroke-linejoin="round"
        //                                     stroke-width="2"
        //                                     d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
        //                                 />
        //                             </svg>
        //                         </span>
        //                     </div>
        //                 </div>

        //                 <div>
        //                     <label for="password" class="sr-only">Password</label>

        //                     <div class="relative">
        //                         <input
        //                             type="password"
        //                             name="password"
        //                             required
        //                             class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
        //                             placeholder="Enter password" onChange={e => setValues({ ...values, password: e.target.value })}
        //                         />

        //                         <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
        //                             <svg
        //                                 xmlns="http://www.w3.org/2000/svg"
        //                                 class="size-4 text-gray-400"
        //                                 fill="none"
        //                                 viewBox="0 0 24 24"
        //                                 stroke="currentColor"
        //                             >
        //                                 <path
        //                                     stroke-linecap="round"
        //                                     stroke-linejoin="round"
        //                                     stroke-width="2"
        //                                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        //                                 />
        //                                 <path
        //                                     stroke-linecap="round"
        //                                     stroke-linejoin="round"
        //                                     stroke-width="2"
        //                                     d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        //                                 />
        //                             </svg>
        //                         </span>
        //                     </div>
        //                 </div>

        //                 <div class="place-self-end">


        //                     <button
        //                         type="submit"
        //                         class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        //                     >
        //                         Sign in
        //                     </button>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </div>
    );
}

export default Login