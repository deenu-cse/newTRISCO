import React, { useEffect, useState } from 'react'
import '../Styles/Widgets.css'


export default function Widgets() {
    const [getMessage, setgetMessage] = useState([])

    function timeAgo(date) {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - date.getTime();
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (seconds > 0) {
            return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        } else {
            return 'just now';
        }
    }

    useEffect(() => {
        const Getmessage = async () => {
            try {
                const response = await fetch('http://localhost:3000/getContact', {
                    method: "GET"
                });
                const resdata = await response.json();

                if (response.ok) {
                    console.log("Data fetched successfully:", resdata);
                    setgetMessage(resdata.contacts);
                } else {
                    console.error("Error in fetching messages:", resdata);
                }
            } catch (error) {
                console.error("An error occurred while fetching the messages:", error);
            }
        };

        Getmessage();
    }, [])

    return (
        <>
            <div className="col-sm-12 msg msgx col-md-6 col-xl-4">
                <div className="h-100 bg-secondary rounded p-4">
                    <div className="d-flex  align-items-center justify-content-between mb-2">
                        <h2 className="mb-0">Messages</h2>
                    </div>
                    {getMessage.map((msg, index) => {
                        return (
                            <>
                                <div className="border-bottom  align-items-center  py-3" key={index}>
                                    <div className="d-flex w-100 ms-3">
                                        <div className="d-flex name w-100 justify-content-between">
                                            <h3 className="mb-0">{msg.name}</h3>
                                            <small>{timeAgo(new Date(msg.createdAt))}</small>
                                        </div>
                                        <span> {msg.subject.split(' ').slice(0, 6).join(' ')}
                                            {msg.subject.split(' ').length > 6 ? '...' : ''}...</span>
                                    </div>
                                    <span>{msg.message}</span>
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    )
}
