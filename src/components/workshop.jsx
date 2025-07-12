// import React from "react";
// import { Link } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";

// function Workshop() {
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   const productData = [
//     {
//       title: "Honda",
//       image: "./assets/images/products/honda.png",
//       description:
//         "Honda is a renowned automobile company offering professional maintenance, repair, and service solutions for vehicles. Their workshops are equipped with advanced tools, certified technicians, and genuine parts to ensure quality care. Honda's commitment to excellence guarantees a reliable and efficient service experience.",
//       link: "/honda",
//     },
//     {
//       title: "Aslam Autos",
//       image: "./assets/images/products/aslam.png",
//       description:
//         "Aslam Auto Engineer specializes in professional vehicle repair, maintenance, and engineering solutions. With experienced technicians and modern equipment, they deliver precise and reliable services. Their commitment to quality ensures a seamless and efficient service experience. Their dedication to excellence guarantees a reliable service experience.",
//       link: "/aslamAutos",
//     },
//     {
//       title: "Toyota",
//       image: "./assets/images/products/toyota.jpg",
//       description:
//         "Toyota provides expert vehicle maintenance, repair, and servicing through its state-of-the-art workshops. With certified professionals, advanced equipment, and genuine Toyota parts, they ensure top-notch care for every vehicle. Toyota's dedication to quality delivers a seamless and reliable service experience.",
//       link: "/toyota",
//     },
//     {
//       icon: "fal fa-chart-network",
//       title: "Ibrahim Autos & Parts",
//       image: "./assets/images/products/ibrahim.jpeg",
//       description:
//         "Ibrahim Autos and Decoration Parts offers expert vehicle maintenance, repair, and customization services. Specializing in high-quality decoration parts, they ensure style and functionality for your automobile. Their dedication to excellence guarantees a reliable and satisfying service experience. Their dedication to excellence guarantees a reliable service experience.",
//         link: "/ibrahimAutos",
//     },
//     {
//       icon: "fal fa-laptop-code",
//       title: "Suzuki",
//       image: "./assets/images/products/suzuki.png",
//       description:
//         "Suzuki offers professional vehicle maintenance, repair, and servicing through its specialized workshops. Equipped with skilled technicians, modern tools, and authentic Suzuki parts, they ensure quality and reliability. Suzuki's focus on customer satisfaction guarantees a smooth and efficient service experience. Their dedication guarantees a reliable service experience.",
//         link: "/suzuki",
//     },
//     {
//       icon: "fal fa-chart-network",
//       title: "First-Stop Garrage",
//       image: "./assets/images/products/firststop.jpg",
//       description:
//         "First-Stop Garrage is a trusted workshop specializing in comprehensive vehicle repair and maintenance services. With skilled technicians, modern tools, and a customer-focused approach, they ensure top-quality care. Their commitment to excellence provides a reliable and satisfying service experience. Their dedication to excellence guarantees a reliable service experience.",
//         link: "/firstStop",
//     },
//     {
//       icon: "fal fa-chart-network",
//       title: "Kia",
//       image: "./assets/images/products/kia.jpg",
//       description:
//         "Kia provides expert vehicle maintenance, repair, and servicing through its advanced workshops. With highly trained technicians, cutting-edge equipment, and genuine Kia parts, they ensure premium care for your vehicle. Kia's dedication to quality offers a dependable and efficient service experience. Their dedication to excellence guarantees a reliable service experience.",
//         link: "/kia",
//     },
//     {
//       icon: "fal fa-laptop-code",
//       title: "Hyundai",
//       image: "./assets/images/products/hyundai.jpg",
//       description:
//         "With a dedicated focus on innovation, we bring together cutting-edge technologies and industry expertise to deliver high-quality software products and services. From concept to deployment, we are committed to transforming ideas into impactful digital solutions that drive business growth and success. Their dedication guarantees a reliable service experience.",
//       link: "/hyundai",
//     },
//     {
//       icon: "fal fa-chart-network",
//       title: "Sharif Motor Workshop",
//       image: "./assets/images/products/sharif.jpeg",
//       description:
//         "Sharif Motor Workshops provides expert vehicle repair, maintenance, and servicing solutions. Equipped with skilled professionals and advanced tools, they ensure reliable and efficient care for all automobiles. Their focus on quality and customer satisfaction guarantees a top-notch service experience. Their dedication to excellence guarantees a reliable service experience.",
//       link: "/sharifMotors",
//     },
//   ];
//   const swiperStyles = {
//     "--swiper-pagination-color": "#333",
//     position: "relative",
//     paddingBottom: "50px",
//   };

//   const paginationStyle = {
//     position: "absolute",
//     bottom: 0,
//     left: "50%",
//     transform: "translateX(-50%)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: "10px",
//   };

//   return (
//     <div className="product">
//       <section id="products" className="products">
//         <div className="content-container">
//           <div className="container">
//             <div className="section-title">
//               <h2>Our WorkShops</h2>
//             </div>

//             <Swiper
//               style={swiperStyles}
//               modules={[Pagination]}
//               spaceBetween={30}
//               slidesPerView={1}
//               pagination={{
//                 el: ".swiper-pagination",
//                 clickable: true,
//                 type: "bullets",
//               }}
//               breakpoints={{
//                 992: {
//                   slidesPerView: 2,
//                   spaceBetween: 30,
//                 },
//               }}
//               className="product-slider"
//             >
//               {productData.map((product, index) => (
//                 <SwiperSlide key={index}>
//                   <div className="col-xl-12 d-flex flex-column flex-sm-row align-items-stretch row">
//                     <div className="img-container col-sm-5 position-relative d-flex align-items-center justify-content-center overflow-hidden">
//                       <img
//                         className="position-absolute"
//                         src={product.image}
//                         alt={product.title}
//                       />
//                     </div>
//                     <div className="col-sm-7 box-card position-relative">
//                       <div className="section-header d-flex align-items-center gap-3">
//                         <h4>{product.title}</h4>
//                       </div>

//                       <p>{product.description}</p>
//                       <div className="link-wrapper">
//                         <Link 
//                           to={product.link}
//                           onClick={scrollToTop}
//                           className="details-link"
//                         >
//                           See Details
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}

//               <div className="swiper-pagination" style={paginationStyle}></div>
//             </Swiper>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Workshop;



import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

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
    "--swiper-pagination-color": "#007bff",
    "--swiper-pagination-bullet-inactive-color": "#ddd",
    "--swiper-pagination-bullet-size": "12px",
    "--swiper-pagination-bullet-horizontal-gap": "8px",
    position: "relative",
    paddingBottom: "60px",
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
            <div className="section-title" style={{ marginBottom: "40px", textAlign: "center" }}>
              <h2 style={{
                color: "#2c3e50",
                fontSize: "2.5rem",
                fontWeight: "700",
                marginBottom: "10px",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
              }}>Our WorkShops</h2>
              <div style={{
                width: "80px",
                height: "4px",
                backgroundColor: "#007bff",
                margin: "0 auto",
                borderRadius: "2px"
              }}></div>
            </div>

            <Swiper
              style={swiperStyles}
              modules={[Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
                type: "bullets",
              }}
              breakpoints={{
                992: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
              }}
              className="product-slider"
            >
              {productData.map((product, index) => (
                <SwiperSlide key={index}>
                  <div className="col-xl-12 d-flex flex-column flex-sm-row align-items-stretch row" style={{ 
                    minHeight: "380px", 
                    backgroundColor: "#fff",
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    border: "1px solid #f0f0f0"
                  }}>
                    <div className="img-container col-sm-5 position-relative d-flex align-items-center justify-content-center overflow-hidden" style={{ 
                      minHeight: "380px",
                      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
                    }}>
                      <img
                        className="position-absolute"
                        src={product.image}
                        alt={product.title}
                        style={{ 
                          width: "100%", 
                          height: "100%", 
                          objectFit: "cover",
                          filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))"
                        }}
                      />
                    </div>
                    <div className="col-sm-7 box-card position-relative d-flex flex-column justify-content-between" style={{ 
                      minHeight: "380px", 
                      padding: "25px",
                      background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)"
                    }}>
                      <div>
                        <div className="section-header d-flex align-items-center gap-3 mb-3">
                          <h4 style={{
                            color: "#2c3e50",
                            fontWeight: "600",
                            fontSize: "1.4rem",
                            marginBottom: "0",
                            textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)"
                          }}>{product.title}</h4>
                        </div>
                        <p style={{ 
                          flex: 1, 
                          overflow: "hidden", 
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 6,
                          WebkitBoxOrient: "vertical",
                          color: "#555",
                          lineHeight: "1.6",
                          fontSize: "0.95rem"
                        }}>
                          {product.description}
                        </p>
                      </div>
                      <div className="link-wrapper mt-auto">
                        <Link 
                          to={product.link}
                          onClick={scrollToTop}
                          className="details-link"
                          style={{
                            display: "inline-block",
                            padding: "12px 24px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            textDecoration: "none",
                            borderRadius: "25px",
                            fontWeight: "500",
                            fontSize: "0.9rem",
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#0056b3";
                            e.target.style.transform = "translateY(-2px)";
                            e.target.style.boxShadow = "0 6px 18px rgba(0, 123, 255, 0.4)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#007bff";
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow = "0 4px 12px rgba(0, 123, 255, 0.3)";
                          }}
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

// import React from "react";
// import { Link } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";

// function Workshop() {
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   const productData = [
//     {
//       title: "Honda",
//       image: "./assets/images/products/honda.png",
//       description:
//         "Honda is a renowned automobile company offering professional maintenance, repair, and service solutions for vehicles. Their workshops are equipped with advanced tools, certified technicians, and genuine parts to ensure quality care. Honda's commitment to excellence guarantees a reliable and efficient service experience.",
//       link: "/honda",
//     },
//     {
//       title: "Aslam Autos",
//       image: "./assets/images/products/aslam.png",
//       description:
//         "Aslam Auto Engineer specializes in professional vehicle repair, maintenance, and engineering solutions. With experienced technicians and modern equipment, they deliver precise and reliable services. Their commitment to quality ensures a seamless and efficient service experience. Their dedication to excellence guarantees a reliable service experience.",
//       link: "/aslamAutos",
//     },
//     {
//       title: "Toyota",
//       image: "./assets/images/products/toyota.jpg",
//       description:
//         "Toyota provides expert vehicle maintenance, repair, and servicing through its state-of-the-art workshops. With certified professionals, advanced equipment, and genuine Toyota parts, they ensure top-notch care for every vehicle. Toyota's dedication to quality delivers a seamless and reliable service experience.",
//       link: "/toyota",
//     },
//     {
//       icon: "fal fa-chart-network",
//       title: "Ibrahim Autos & Parts",
//       image: "./assets/images/products/ibrahim.jpeg",
//       description:
//         "Ibrahim Autos and Decoration Parts offers expert vehicle maintenance, repair, and customization services. Specializing in high-quality decoration parts, they ensure style and functionality for your automobile. Their dedication to excellence guarantees a reliable and satisfying service experience. Their dedication to excellence guarantees a reliable service experience.",
//         link: "/ibrahimAutos",
//     },
//     {
//       icon: "fal fa-laptop-code",
//       title: "Suzuki",
//       image: "./assets/images/products/suzuki.png",
//       description:
//         "Suzuki offers professional vehicle maintenance, repair, and servicing through its specialized workshops. Equipped with skilled technicians, modern tools, and authentic Suzuki parts, they ensure quality and reliability. Suzuki's focus on customer satisfaction guarantees a smooth and efficient service experience. Their dedication guarantees a reliable service experience.",
//         link: "/suzuki",
//     },
//     {
//       icon: "fal fa-chart-network",
//       title: "First-Stop Garrage",
//       image: "./assets/images/products/firststop.jpg",
//       description:
//         "First-Stop Garrage is a trusted workshop specializing in comprehensive vehicle repair and maintenance services. With skilled technicians, modern tools, and a customer-focused approach, they ensure top-quality care. Their commitment to excellence provides a reliable and satisfying service experience. Their dedication to excellence guarantees a reliable service experience.",
//         link: "/firstStop",
//     },
//     {
//       icon: "fal fa-chart-network",
//       title: "Kia",
//       image: "./assets/images/products/kia.jpg",
//       description:
//         "Kia provides expert vehicle maintenance, repair, and servicing through its advanced workshops. With highly trained technicians, cutting-edge equipment, and genuine Kia parts, they ensure premium care for your vehicle. Kia's dedication to quality offers a dependable and efficient service experience. Their dedication to excellence guarantees a reliable service experience.",
//         link: "/kia",
//     },
//     {
//       icon: "fal fa-laptop-code",
//       title: "Hyundai",
//       image: "./assets/images/products/hyundai.jpg",
//       description:
//         "With a dedicated focus on innovation, we bring together cutting-edge technologies and industry expertise to deliver high-quality software products and services. From concept to deployment, we are committed to transforming ideas into impactful digital solutions that drive business growth and success. Their dedication guarantees a reliable service experience.",
//       link: "/hyundai",
//     },
//     {
//       icon: "fal fa-chart-network",
//       title: "Sharif Motor Workshop",
//       image: "./assets/images/products/sharif.jpeg",
//       description:
//         "Sharif Motor Workshops provides expert vehicle repair, maintenance, and servicing solutions. Equipped with skilled professionals and advanced tools, they ensure reliable and efficient care for all automobiles. Their focus on quality and customer satisfaction guarantees a top-notch service experience. Their dedication to excellence guarantees a reliable service experience.",
//       link: "/sharifMotors",
//     },
//   ];
  
//   const swiperStyles = {
//     "--swiper-pagination-color": "#333",
//     position: "relative",
//     paddingBottom: "50px",
//   };

//   const paginationStyle = {
//     position: "absolute",
//     bottom: 0,
//     left: "50%",
//     transform: "translateX(-50%)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: "10px",
//   };

//   return (
//     <div className="product">
//       <section id="products" className="products">
//         <div className="content-container">
//           <div className="container">
//             <div className="section-title">
//               <h2>Our WorkShops</h2>
//             </div>

//             <Swiper
//               style={swiperStyles}
//               modules={[Pagination, Autoplay]}
//               spaceBetween={50}
//               slidesPerView={1}
//               autoplay={{
//                 delay: 3000,
//                 disableOnInteraction: false,
//                 pauseOnMouseEnter: true,
//               }}
//               pagination={{
//                 el: ".swiper-pagination",
//                 clickable: true,
//                 type: "bullets",
//               }}
//               breakpoints={{
//                 992: {
//                   slidesPerView: 2,
//                   spaceBetween: 50,
//                 },
//               }}
//               className="product-slider"
//             >
//               {productData.map((product, index) => (
//                 <SwiperSlide key={index}>
//                   <div className="col-xl-12 d-flex flex-column flex-sm-row align-items-stretch row" style={{ minHeight: "350px" }}>
//                     <div className="img-container col-sm-5 position-relative d-flex align-items-center justify-content-center overflow-hidden" style={{ minHeight: "350px" }}>
//                       <img
//                         className="position-absolute"
//                         src={product.image}
//                         alt={product.title}
//                         style={{ 
//                           width: "100%", 
//                           height: "100%", 
//                           objectFit: "cover" 
//                         }}
//                       />
//                     </div>
//                     <div className="col-sm-7 box-card position-relative d-flex flex-column justify-content-between" style={{ minHeight: "350px", padding: "20px" }}>
//                       <div>
//                         <div className="section-header d-flex align-items-center gap-3">
//                           <h4>{product.title}</h4>
//                         </div>
//                         <p style={{ 
//                           flex: 1, 
//                           overflow: "hidden", 
//                           textOverflow: "ellipsis",
//                           display: "-webkit-box",
//                           WebkitLineClamp: 6,
//                           WebkitBoxOrient: "vertical"
//                         }}>
//                           {product.description}
//                         </p>
//                       </div>
//                       <div className="link-wrapper mt-auto">
//                         <Link 
//                           to={product.link}
//                           onClick={scrollToTop}
//                           className="details-link"
//                         >
//                           See Details
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}

//               <div className="swiper-pagination" style={paginationStyle}></div>
//             </Swiper>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Workshop;