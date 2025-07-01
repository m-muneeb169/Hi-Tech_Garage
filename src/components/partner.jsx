import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function Partner() {
  return (
    <>
      <div className="partners">
        <section id="partners" className="partners">
          <div className="content-container">
            <div className="container">
              <div className="section-title">
                <h2>partners</h2>
              </div>

              <div className="partners-slider swiper-container">
                <div className="swiper-wrapper">
                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                      el: '.swiper-pagination',
                      renderBullet: function (index, className) {
                        return `<span className="${className}"></span>`;
                      },
                    }}
                    navigation={false}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      <div className="partner-item">
                        <img
                          src="./assets/images/partners/craftsols-logo-cbs.png"
                          className="partner-img"
                          alt=""
                        />
                        <h3>Heading Value</h3>
                        <p>
                          Creative Business Solutions Inc. (CBS) is an “award-winning”
                          Certified Participant in the U.S. Small Business
                          Administration's (SBA) 8(a) Business Development Program and
                          a U.S. Department of Veterans Affairs (VA), Center for
                          Veterans Enterprise (CVE), verified/certified Service
                          Disabled Veteran Owned Small Business (SDVOSB) financial
                          management consulting firm that provides Financial, Program,
                          Acquisition, and Logistics Management (modeling and
                          simulation) and Information Technology solutions (including
                          Cyber Security) to (DoD) and other Federal Agencies.
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="partner-item">
                        <img
                          src="./assets/images/partners/craftsols-logo-insource.png"
                          className="partner-img"
                          alt=""
                        />
                        <h3>Insource Pakistan</h3>
                        <p>
                          Insource Pakistan: Is a system integrator, providing
                          complete, Power, Solar and IT Solutions. We are resellers,
                          partners and distributors of NCR, CBS, APC, Schneider,
                          INETCO & ARTronics, BITS & Protect.
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="partner-item">
                        <img
                          src="./assets/images/partners/craftsols-logo-ivl.png"
                          className="partner-img"
                          alt=""
                        />
                        <h3>Indus Valley Labs</h3>
                        <p>
                          Indus Valley Labs (Pvt) Limited is a full-service Software
                          Development & IT Consulting Company that provides End-to-End
                          service for Web, Mobile and Software Application
                          Development. IVL is a worldwide provider of global IT and
                          Enterprise application solutions which include Custom
                          Development, ERP and systems integration and technical
                          services with registered offices in United Kingdom and
                          Pakistan as a Private Limited Company.
                        </p>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Partner;
