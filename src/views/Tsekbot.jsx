import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Request_Agent from './components/Request_Agent';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:8000");

const Tsekbot = () => {
    // axios.defaults.withCredentials = true;
    // Authentication();


    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        socket.on("chat", (message) => {
            setChatMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            // Clean up socket subscription when component unmounts
            socket.off("chat");
        };
    }, []);

    return (
        <>

            {/* <Sidenav /> */}

            <section class="home">

                < Request_Agent />



                <div className="messages">
                    {chatMessages.map((message, index) => (
                        <div key={index}>{`${message.username}: ${message.text}`}</div>
                    ))}
                </div>


                <iframe className='h-screen w-full'
                    src="https://widget.writesonic.com/CDN/index.html?service-base-url=https://api.botsonic.ai&token=d0126cfb-15f8-48c1-bfa5-b399b4d056b9&base-origin=https://bot.writesonic.com&instance-name=Botsonic&standalone=true&page-url=https://bot.writesonic.com/95a5f0d2-b52e-4fa8-9cf5-25ccd358fc53?t=connect&workspace_id=e06f694b-848e-426d-a26a-9059ee111743" >
                </iframe>



            </section>



        </>
    )
}

export default Tsekbot