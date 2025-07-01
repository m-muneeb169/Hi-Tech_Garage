import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function Workshop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const productData = [
    {
      title: "Honda",
      image: "./assets/images/products/honda.png",
      description:
        "Honda is a renowned automobile company offering professional maintenance, repair, and service solutions for vehicles. Their workshops are equipped with advanced tools, certified technicians, and genuine parts to ensure quality care. Honda's commitment to excellence guarantees a reliable and efficient service experience.",
      link: "/honda",
    },
    {
      title: "Aslam Autos",
      image: "./assets/images/products/aslam.png",
      description:
        "Aslam Auto Engineer specializes in professional vehicle repair, maintenance, and engineering solutions. With experienced technicians and modern equipment, they deliver precise and reliable services. Their commitment to quality ensures a seamless and efficient service experience. Their dedication to excellence guarantees a reliable service experience.",
      link: "/aslamAutos",
    },
    {
      title: "Toyota",
      image: "./assets/images/products/toyota.jpg",
      description:
        "Toyota provides expert vehicle maintenance, repair, and servicing through its state-of-the-art workshops. With certified professionals, advanced equipment, and genuine Toyota parts, they ensure top-notch care for every vehicle. Toyota's dedication to quality delivers a seamless and reliable service experience.",
      link: "/toyota",
    },
    {
      icon: "fal fa-chart-network",
      title: "Ibrahim Autos & Parts",
      image: "./assets/images/products/ibrahim.jpeg",
      description:
        "Ibrahim Autos and Decoration Parts offers expert vehicle maintenance, repair, and customization services. Specializing in high-quality decoration parts, they ensure style and functionality for your automobile. Their dedication to excellence guarantees a reliable and satisfying service experience. Their dedication to excellence guarantees a reliable service experience.",
        link: "/ibrahimAutos",
    },
    {
      icon: "fal fa-laptop-code",
      title: "Suzuki",
      image: "./assets/images/products/suzuki.png",
      description:
        "Suzuki offers professional vehicle maintenance, repair, and servicing through its specialized workshops. Equipped with skilled technicians, modern tools, and authentic Suzuki parts, they ensure quality and reliability. Suzuki's focus on customer satisfaction guarantees a smooth and efficient service experience. Their dedication guarantees a reliable service experience.",
        link: "/suzuki",
    },
    {
      icon: "fal fa-chart-network",
      title: "First-Stop Garrage",
      image: "./assets/images/products/firststop.jpg",
      description:
        "First-Stop Garrage is a trusted workshop specializing in comprehensive vehicle repair and maintenance services. With skilled technicians, modern tools, and a customer-focused approach, they ensure top-quality care. Their commitment to excellence provides a reliable and satisfying service experience. Their dedication to excellence guarantees a reliable service experience.",
        link: "/firstStop",
    },
    {
      icon: "fal fa-chart-network",
      title: "Kia",
      image: "./assets/images/products/kia.jpg",
      description:
        "Kia provides expert vehicle maintenance, repair, and servicing through its advanced workshops. With highly trained technicians, cutting-edge equipment, and genuine Kia parts, they ensure premium care for your vehicle. Kia's dedication to quality offers a dependable and efficient service experience. Their dedication to excellence guarantees a reliable service experience.",
        link: "/kia",
    },
    {
      icon: "fal fa-laptop-code",
      title: "Hyundai",
      image: "./assets/images/products/hyundai.jpg",
      description:
        "With a dedicated focus on innovation, we bring together cutting-edge technologies and industry expertise to deliver high-quality software products and services. From concept to deployment, we are committed to transforming ideas into impactful digital solutions that drive business growth and success. Their dedication guarantees a reliable service experience.",
      link: "/hyundai",
    },
    {
      icon: "fal fa-chart-network",
      title: "Sharif Motor Workshop",
      image: "./assets/images/products/sharif.jpeg",
      description:
        "Sharif Motor Workshops provides expert vehicle repair, maintenance, and servicing solutions. Equipped with skilled professionals and advanced tools, they ensure reliable and efficient care for all automobiles. Their focus on quality and customer satisfaction guarantees a top-notch service experience. Their dedication to excellence guarantees a reliable service experience.",
      link: "/sharifMotors",
    },
  ];
  const swiperStyles = {
    "--swiper-pagination-color": "#333",
    position: "relative",
    paddingBottom: "50px",
  };

  const paginationStyle = {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  };

  return (
    <div className="product">
      <section id="products" className="products">
        <div className="content-container">
          <div className="container">
            <div className="section-title">
              <h2>Our WorkShops</h2>
            </div>

            <Swiper
              style={swiperStyles}
              modules={[Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
                type: "bullets",
              }}
              breakpoints={{
                992: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
              }}
              className="product-slider"
            >
              {productData.map((product, index) => (
                <SwiperSlide key={index}>
                  <div className="col-xl-12 d-flex flex-column flex-sm-row align-items-stretch row">
                    <div className="img-container col-sm-5 position-relative d-flex align-items-center justify-content-center overflow-hidden">
                      <img
                        className="position-absolute"
                        src={product.image}
                        alt={product.title}
                      />
                    </div>
                    <div className="col-sm-7 box-card position-relative">
                      <div className="section-header d-flex align-items-center gap-3">
                        <h4>{product.title}</h4>
                      </div>

                      <p>{product.description}</p>
                      <div className="link-wrapper">
                        <Link 
                          to={product.link}
                          onClick={scrollToTop}
                          className="details-link"
                        >
                          See Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              <div className="swiper-pagination" style={paginationStyle}></div>
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Workshop;