// import React from "react";
// import { Link } from "react-router-dom";
// function Aboutus() {
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth", // Optional: Adds smooth scrolling behavior
//     });
//   };

//   return (
//     <div className="aboutus">
//       <section id="about" className="about section-bg">
//         <div className="content-container">
//           <div className="container">
//             <div className="section-title">
//               <h2>About Us</h2>
//             </div>

//             <div
//               className="
//               content
//               d-flex
//               flex-column-reverse flex-lg-row-reverse
//               align-items-center
//               justify-content-center
//               gap-lg-5 gap-4
//               p-3
//             "
//             >
//               <div className="col-lg-5">
//                 <p className="justify">
//                   At Hi-Tech Garage, we are dedicated to providing innovative
//                   and convenient automotive services that cater to your every
//                   need. Our platform connects customers with trusted workshops
//                   for on-road emergency assistance, home-based vehicle repairs,
//                   and routine maintenance. Whether you're facing a breakdown on
//                   the road or need timely repairs at home, we ensure swift and
//                   reliable solutions. With a commitment to customer
//                   satisfaction, we strive to deliver the highest quality
//                   service, making vehicle care hassle-free and efficient.
//                 </p>

//                 <Link to="/about-us" onClick={scrollToTop}>
//                   Learn more
//                 </Link>
//               </div>
//               <div className="col-lg-5">
//                 <div>
//                   <img
//                     className="img-fluid"
//                     src="./assets/images/about.jpg"
//                     alt=""
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Aboutus;


import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Aboutus() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="aboutus">
      <section id="about" className="about section-bg">
        <div className="content-container">
          <div className="container">
            <div className="section-title">
              <h2>About Us</h2>
            </div>

            <div
              className="
              content
              d-flex
              flex-column-reverse flex-lg-row-reverse
              align-items-center
              justify-content-center
              gap-lg-5 gap-4
              p-3
            "
            >
              {/* Text Section */}
              <div className="col-lg-5" data-aos="fade-up-right">
                <p className="justify">
                  At Hi-Tech Garage, we are dedicated to providing innovative
                  and convenient automotive services that cater to your every
                  need. Our platform connects customers with trusted workshops
                  for on-road emergency assistance, home-based vehicle repairs,
                  and routine maintenance. Whether you're facing a breakdown on
                  the road or need timely repairs at home, we ensure swift and
                  reliable solutions. With a commitment to customer
                  satisfaction, we strive to deliver the highest quality
                  service, making vehicle care hassle-free and efficient.
                </p>

                <Link to="/about-us" onClick={scrollToTop}>
                  Learn more
                </Link>
              </div>

              {/* Image Section */}
              <div className="col-lg-5" data-aos="zoom-in">
                <div>
                  <img
                    className="img-fluid"
                    src="./assets/images/about.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Aboutus;
