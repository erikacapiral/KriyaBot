import React, { useState } from 'react';
import Request_Agent from './components/Request_Agent';

const FloatingButton = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const toggleIframe = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };

    const [isRequestAgentOpen, setIsRequestAgentOpen] = useState(false);

    const toggleRequestAgent = () => {
        setIsRequestAgentOpen(!isRequestAgentOpen);
    };

    return (
        <div className="fixed bottom-5 right-5">

            {/* floating action button for request agent */}
            {/* top */}
            {/* <button
                className="mb-5 w-16 h-16 rounded-full bg-[#CC5500] text-white flex items-center justify-center shadow-lg hover:bg-[#CC5500] transition duration-300 z-50 relative"
                onClick={toggleRequestAgent}
            >
                {isRequestAgentOpen ? (
                    // icon to close the request agent
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : (
                    // icon to open the request agent
                    <svg
                        className="h-10 w-10"
                        viewBox="0 0 512 512"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M448 213.4V208C448 102.1 361.9 16 256 16C150.1 16 64 102.1 64 208V213.4C36.9 217.3 16 240.7 16 268.8V316.8C16 347.7 41.1 372.8 72 372.8H76.3C85.1 382.6 97.9 388.8 112 388.8C138.5 388.8 160 367.3 160 340.8V244.8C160 224 146.8 206.3 128.3 199.6C130.3 167.8 144.1 138.1 167.2 115.8C191.1 92.7 222.7 80 256 80C289.4 80 321 92.8 345 116C368 138.3 381.6 167.8 383.7 199.6C365.2 206.3 352 224 352 244.8V340.8C352 364.5 369.3 384.3 392 388.1V403.7L375 414.9C367.1 413.4 358.6 414.9 351.3 419.7L324.7 437.4C310 447.2 306 467.1 315.8 481.8C320.5 488.9 327.8 493.8 336.1 495.4C338.2 495.8 340.3 496 342.5 496C348.7 496 354.9 494.2 360.2 490.6L386.8 472.9C394 468.1 398.6 460.9 400.3 453.1L436.2 430.8C438.5 429.3 440 426.8 440 424V372.8C470.9 372.8 496 347.7 496 316.8V268.8C496 240.6 475.1 217.3 448 213.4ZM66.6 356.4C47.1 353.8 32 337 32 316.8V268.8C32 248.6 47.1 231.8 66.6 229.2C64.9 234.1 64 239.4 64 244.8V340.8C64 346.3 64.9 351.5 66.6 356.4ZM378 459.6L351.4 477.3C347.8 479.7 343.6 480.5 339.4 479.7C335.2 478.9 331.6 476.4 329.2 472.9C324.3 465.6 326.3 455.6 333.6 450.7L360.2 433C362.9 431.2 366 430.3 369 430.3C374.2 430.3 379.3 432.8 382.3 437.4C387.3 444.7 385.3 454.7 378 459.6ZM144 244.8V340.8C144 358.4 129.6 372.8 112 372.8C94.4 372.8 80 358.4 80 340.8V244.8C80 227.2 94.4 212.8 112 212.8C129.6 212.8 144 227.2 144 244.8ZM424 419.6L399.1 435.1C398.3 432.8 397.2 430.6 395.8 428.6C394.5 426.7 393 424.9 391.4 423.3L404.5 414.7C406.8 413.2 408.1 410.7 408.1 408V388.1C413.8 387.1 419.2 385.1 424.1 382.3V419.6H424ZM432 340.8C432 358.4 417.6 372.8 400 372.8C382.4 372.8 368 358.4 368 340.8V244.8C368 227.2 382.4 212.8 400 212.8C417.6 212.8 432 227.2 432 244.8V340.8ZM432 209.1C423.5 201.5 412.3 196.8 400 196.8C399.9 196.8 399.7 196.8 399.6 196.8C396.9 161.7 381.7 129.2 356.2 104.5C329.2 78.4 293.6 64 256 64C218.5 64 183 78.3 156 104.4C130.5 129 115.1 161.7 112.4 196.8C112.3 196.8 112.1 196.8 112 196.8C99.7 196.8 88.5 201.4 80 209.1V208C80 111 159 32 256 32C353 32 432 111 432 208V209.1ZM480 316.8C480 337 464.9 353.8 445.4 356.4C447.1 351.5 448 346.2 448 340.8V244.8C448 239.3 447.1 234.1 445.4 229.2C464.9 231.8 480 248.6 480 268.8V316.8Z" fill="white"></path>
                        <path d="M293.3 336L323.2 358.4C324.6 359.5 326.3 360 328 360C329.2 360 330.4 359.7 331.6 359.2C334.3 357.8 336 355.1 336 352V251C336 236.1 323.9 224 309 224H203C188.1 224 176 236.1 176 251V309C176 323.9 188.1 336 203 336H293.3ZM192 309V251C192 244.9 196.9 240 203 240H309C315.1 240 320 244.9 320 251V336L300.8 321.6C299.4 320.6 297.7 320 296 320H203C196.9 320 192 315.1 192 309Z" fill="white"></path>
                        <path d="M224 288C228.418 288 232 284.418 232 280C232 275.582 228.418 272 224 272C219.582 272 216 275.582 216 280C216 284.418 219.582 288 224 288Z" fill="white"></path>
                        <path d="M256 288C260.418 288 264 284.418 264 280C264 275.582 260.418 272 256 272C251.582 272 248 275.582 248 280C248 284.418 251.582 288 256 288Z" fill="white"></path>
                        <path d="M288 288C292.418 288 296 284.418 296 280C296 275.582 292.418 272 288 272C283.582 272 280 275.582 280 280C280 284.418 283.582 288 288 288Z" fill="white"></path>
                        <path d="M104 240V248C104 252.4 107.6 256 112 256C116.4 256 120 252.4 120 248V240C120 235.6 116.4 232 112 232C107.6 232 104 235.6 104 240Z" fill="white"></path>
                        <path d="M112 272C107.6 272 104 275.6 104 280V328C104 332.4 107.6 336 112 336C116.4 336 120 332.4 120 328V280C120 275.6 116.4 272 112 272Z" fill="white"></path>
                    </svg>
                )}
            </button> */}

            {/* {isRequestAgentOpen && (
                <div className="fixed inset-0 z-40 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                       <Request_Agent />
                    </div>
                </div>
            )} */}

            {/* floating action button for chatbot */}
            {/* bottom */}
            <Request_Agent />
            <button
                className="w-16 h-16 rounded-full bg-[#CC5500] text-white flex items-center justify-center shadow-lg hover:bg-[#CC5500] transition duration-300 z-50 relative"
                onClick={toggleIframe}
            >
                {isChatbotOpen ? (
                    // icon to close the iframe/chatbot
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : (
                    // icon to open the iframe/chatbot
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 8h16M4 16h16"
                        />
                    </svg>
                )}
            </button>

            {isChatbotOpen && (
                <div className="fixed inset-0 z-40 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <iframe className='h-96 w-full'
                            src="https://widget.writesonic.com/CDN/index.html?service-base-url=https://api.botsonic.ai&token=d0126cfb-15f8-48c1-bfa5-b399b4d056b9&base-origin=https://bot.writesonic.com&instance-name=Botsonic&standalone=true&page-url=https://bot.writesonic.com/95a5f0d2-b52e-4fa8-9cf5-25ccd358fc53?t=connect&workspace_id=e06f694b-848e-426d-a26a-9059ee111743" >
                        </iframe>
                    </div>
                </div>
            )}

        </div>


    );
};

export default FloatingButton;