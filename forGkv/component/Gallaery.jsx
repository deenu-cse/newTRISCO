import React, { useEffect, useState } from 'react';
import '../Styles/Gallery.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NavLink } from 'react-router-dom';

const Gallery = () => {
    const [gallery, setGallery] = useState(null);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await fetch('http://localhost:3000/getGallery', {
                    method: "GET"
                });
                const resdata = await response.json();
                setGallery(resdata);
            } catch (error) {
                console.log(error);
            }
        };
        fetchGallery();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    console.log(gallery)

    return (
        <section id="gallery" className="wow fadeInUp">
            <div className="container">
                <div className="section-header">
                    <h2>Gallery</h2>
                    <p>Check our gallery from the recent events</p>
                </div>
            </div>

            <div className="gallery-carousel">
                <Slider {...settings}>
                    {gallery && gallery.length > 0 ? (
                        gallery.map((item, index) => (
                            <div key={index} className="gallery-item">
                                <img src={item.image} alt={`Image ${index + 1}`} />
                            </div>
                        ))
                    ) : (
                        <p>Loading photos..</p>
                    )}
                </Slider>
                <div className="vbtn">
                    <NavLink to={'/events-gallery'}>
                        <button>View</button>
                    </NavLink>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
