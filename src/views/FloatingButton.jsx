import React, { useState } from 'react';

const FloatingButton = () => {
    const [isIframeVisible, setIsIframeVisible] = useState(false);

    const toggleIframe = () => {
        setIsIframeVisible(!isIframeVisible);
    };

    return (
        <div className="fixed bottom-5 right-5">
            <button
                className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition duration-300 z-50 relative"
                onClick={toggleIframe}
            >
                {isIframeVisible ? (
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

            {isIframeVisible && (
                <div className="fixed inset-0 z-40 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        {/* <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 z-50"
                            onClick={toggleIframe}
                        >
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
                        </button> */}
                        {/* <iframe
                            src="https://example.com"
                            className="w-full md:w-96 h-96" // Adjusted width of iframe here (e.g., md:w-96 for medium screens)
                            title="Embedded Content"
                            >
                        </iframe> */}
                        <iframe className='w-full md:w-96 h-96 mr-16 md:mr-0'
                            src="https://widget.writesonic.com/CDN/index.html?service-base-url=https://api.botsonic.ai&token=d0126cfb-15f8-48c1-bfa5-b399b4d056b9&base-origin=https://bot.writesonic.com&instance-name=Botsonic&standalone=true&page-url=https://bot.writesonic.com/95a5f0d2-b52e-4fa8-9cf5-25ccd358fc53?t=connect&workspace_id=e06f694b-848e-426d-a26a-9059ee111743" >
                        </iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FloatingButton;