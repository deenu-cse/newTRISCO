import React, { useEffect, useState } from 'react';
import '../Styles/Fullgallery.css';

export default function Fullgallery() {
    const [galleryData, setGalleryData] = useState([]);

    useEffect(() => {
        const getGallery = async () => {
            const response = await fetch('http://localhost:3000/getIgallery', {
                method: "GET",
            });
            if (response.ok) {
                const resdata = await response.json();
                setGalleryData(resdata.response);
            }
        };
        getGallery();
    }, []);

    return (
        <>
            <h1 className="gallery-title">Event Gallery</h1>
            <div className="gallery-container">
                {galleryData.map((event, index) => (
                    <div className="event-frame" key={event._id}>
                        <h3 className="event-name">{event.GalleryType}</h3>
                        <div className="images-container">
                            {event.links.map((image, imgIndex) => (
                                <img
                                    key={imgIndex}
                                    src={image}
                                    alt={`Event Image ${imgIndex + 1}`}
                                    className="gallery-image"
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
