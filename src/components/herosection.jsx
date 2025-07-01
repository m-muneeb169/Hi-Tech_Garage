import React, { useState, useEffect } from "react";
import { headings, paragraphs, hreflinks } from "../ConstantValue";

function Herosection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const totalSlides = 3; // Total number of slides

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Increment the activeIndex and loop back to the first item if needed
            setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        }, 3000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [totalSlides]); // Ensure the effect knows the total number of slides

    const handleIndicatorClick = (index) => {
        // Set the activeIndex when an indicator is clicked
        setActiveIndex(index);
    };

    return (
        <div className="hero" id="hero">
            <section id="hero">
                <div className="content-container">
                    <div className="hero-container">
                        <div
                            id="heroCarousel"
                            className="carousel slide carousel-fade"
                            data-bs-ride="carousel"
                            data-bs-interval="8000"
                            data-bs-pause="false"
                        >
                            <ol
                                className="carousel-indicators"
                                id="hero-carousel-indicators"
                            >
                                {Array.from({ length: totalSlides }).map((_, index) => (
                                    <li
                                        key={index}
                                        data-bs-target="#heroCarousel"
                                        data-bs-slide-to={index}
                                        className={index === activeIndex ? "active" : ""}
                                        onClick={() => handleIndicatorClick(index)}
                                    ></li>
                                ))}
                            </ol>
                            <div className="carousel-inner" role="listbox">
                                {Array.from({ length: totalSlides }).map((_, index) => (
                                    <div
                                        key={index}
                                        className={`carousel-item ${
                                            index === activeIndex ? "active" : ""
                                        }`}
                                    >
                                        {generateCarouselContent(index)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

const generateCarouselContent = (index) => {
    return (
        <div className="carousel-container">
            <div className="carousel-left">
                <div className="carousel-content">
                    <h2 className="animate__animated animate__fadeInDown">
                        {headings[index]}
                    </h2>
                    <p className="animate__animated animate__fadeInUp">
                        {paragraphs[index]}
                    </p>
                    <a
                        href={hreflinks[index]}
                        className="btn-read-more animate__animated animate__fadeInUp scrollto"
                    >
                        Read More
                    </a>
                </div>
            </div>
            <div className="carousel-right">
                <img
                    src={`./assets/images/services/${index}.jpg`}
                    alt=""/* 
                    className="animate__animated animate__fadeInRight" */
                />
            </div>
        </div>
    );
};

export default Herosection;
