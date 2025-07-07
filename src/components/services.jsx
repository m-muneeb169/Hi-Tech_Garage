import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./services.css";

function Services() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const servicesData = [
    {
      icon: "fas fa-car-side fa-3x",
      title: "Roadside Assistance",
      description:
        "Provides quick repairs for vehicles in distress, ensuring prompt solutions and safe transport to a nearby workshop.",
      link: "/RoadsideAssistance",
    },
    {
      icon: "fal fa-home fa-3x",
      title: "At-Home Repair",
      description:
        "Skilled technicians provide on-site vehicle repairs at your home, saving you the hassle of visiting a workshop.",
      link: "/AtHomeRepair",
    },
    {
      icon: "fal fa-cogs fa-3x",
      title: "Periodic Servicing",
      description:
        "Routine vehicle servicing, including maintenance and repairs, either at your location or the workshop.",
      link: "/PeriodicServicing",
    },
    {
      icon: "fal fa-oil-can fa-3x",
      title: "Oil Change",
      description:
        "We offer oil change services to maintain engine health, performed either at your home or at a workshop of your choice.",
      link: "/oilChange",
    },
    {
      icon: "fal fa-tools fa-3x",
      title: "Tire Services",
      description:
        "Complete tire maintenance including rotation, balancing, and replacement services to ensure vehicle safety.",
      link: "/tire-services",
    },
    {
      icon: "fal fa-car-battery fa-3x",
      title: "Battery Service",
      description:
        "Professional battery testing, maintenance, and replacement to keep your vehicle starting reliably.",
      link: "/battery-service",
    },
    {
      icon: "fal fa-cogs fa-3x",
      title: "Coolant Change",
      description:
        "Ensure your engine runs at the optimal temperature with our expert coolant replacement services.",
      link: "/coolant-change",
    },
    {
      icon: "fal fa-car-crash fa-3x",
      title: "Brake Service",
      description:
        "Keep your vehicle's braking system in top condition with comprehensive brake inspections, repairs, and replacements.",
      link: "/brake-service",
    },
    {
      icon: "fal fa-steering-wheel fa-3x",
      title: "Tuning",
      description:
        "Optimize your vehicle's performance with our professional engine tuning services and improving efficiency.",
      link: "/tuning",
    },
    {
      icon: "fal fa-wrench fa-3x",
      title: "Suspension Replacement",
      description:
        "Replace worn-out suspension components to ensure smooth handling and improved ride comfort.",
      link: "/suspension-replacement",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };



  return (
    <section id="services" className="services section-bg">
      <div className="content-container">
        <div className="container">
          <div className="section-title">
            <h2>Services</h2>
          </div>

          <Slider {...settings} className="services-slider">
            {servicesData.map((service, index) => (
              <div key={index} className="slider-item">
                <div className="box-card">
                  <div className="section-header">
                    <div className="icon">
                      <i className={service.icon}></i>
                    </div>
                    <h4>{service.title}</h4>
                  </div>
                  <p>{service.description}</p>
                  <Link 
                    to={service.link} 
                    onClick={scrollToTop}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Services;