import React from "react";
import Sidenavbar from "../components/sidenavbar";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
const About = () => {
  const scrollStyle = `
    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-100%);
      }
    }
    .animate-slider {
      animation: scroll 20s linear infinite;
    }
  `;

  return (
    <div>
      <style>{scrollStyle}</style>

      {/* Section 1 */}
      <div>
        <Sidenavbar />
        <Link to="/">
          <Header />
        </Link>
        <div
          className="
        page-header
        position-relative
        d-flex
        align-items-center
        justify-content-center
        overflow-hidden
      "
        >
          <img
            className="position-absolute"
            src="./assets/images/services/3.jpg"
            alt=""
          />
          <div
            className="
          position-absolute
          w-100
          h-100
          d-flex
          flex-column
          align-items-start
          justify-content-end
        "
          >
            <div className="position-relative w-100 h-100">
              <div className="content-container w-100 h-100">
                <div
                  className="
                container
                w-100
                h-100
                d-flex
                flex-column
                align-items-start
                justify-content-center
              "
                >
                  <p>
                    <span>About Us</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <section className="bg-white py-10 px-6 sm:px-10">
        <div className="bg-gray-100 py-16 px-8">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            {/* Left Column */}
            <div className="lg:col-start-1 lg:col-end-3">
              <h2 className="text-5xl font-bold mb-4 pb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Hi-Tech Garage, our mission is to transform the vehicle
                service experience by delivering exceptional service, a diverse
                selection of workshops, and a commitment to safety,
                transparency, and quality. Join us to experience a superior way
                to connect with workshops, where your satisfaction is our
                priority.
              </p>
              <ul className="space-y-4 text-lg text-gray-600">
                <li className="flex items-start">
                  <img
                    src="./assets/images/aboutus/logo.png"
                    alt="Check Icon"
                    className="w-6 h-6 mr-3"
                  />
                  <span>Provide Exceptional Customer Service</span>
                </li>
                <li className="flex items-start">
                  <img
                    src="./assets/images/aboutus/logo.png"
                    alt="Check Icon"
                    className="w-6 h-6 mr-3"
                  />
                  <span>Offer a Wide Range of Workshops</span>
                </li>
                <li className="flex items-start">
                  <img
                    src="./assets/images/aboutus/logo.png"
                    alt="Check Icon"
                    className="w-6 h-6 mr-3"
                  />
                  <span>Ensure Safety and Reliability</span>
                </li>
                <li className="flex items-start">
                  <img
                    src="./assets/images/aboutus/logo.png"
                    alt="Check Icon"
                    className="w-6 h-6 mr-3"
                  />
                  <span>Promote Sustainability</span>
                </li>
              </ul>
              <Link  to="/" className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow hover:bg-blue-600 transition duration-300">
                Explore Our Workshops
              </Link>
            </div>

            {/* Right Column */}
            <div className="lg:col-start-3 lg:col-end-4 gap-4 relative group">
              <div className="grid grid-cols-1 justify-center gap-8">
                <div>
                  <p className="font-semibold text-5xl pb-4">10,000 +</p>
                  <p className="text-md text-gray-600">
                    Help requests successfully resolved annually
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-5xl pb-4">5000</p>
                  <p className="text-md text-gray-600">
                    Workshops partnered across the region
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-5xl pb-4">15,000 +</p>
                  <p className="text-md text-gray-600">
                    Happy users benefiting from seamless vehicle services
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 md:p-12 items-center relative overflow-hidden">
  <div className="relative flex justify-center items-center">
    <div className="absolute inset-0 w-3/4 h-full bg-blue-600 -z-10 transform translate-x-4 translate-y-4"></div>
    <img
      src="./assets/images/aboutus/OurVision.webp"
      alt="Statue of Justice"
      className="relative z-10 w-3/4 max-h-[500px] rounded shadow-lg object-cover "
    />
  </div>
  <div className="text-center md:text-left">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
    <p className="text-gray-600 text-lg">
      We envision a future where accessing vehicle repair and maintenance
      services is as effortless and reliable as a few clicks, empowering users
      and workshops to thrive in a digital ecosystem.
    </p>
  </div>
</section>



      {/* Section 4 */}
      <section className="bg-gray-100 p-6 md:p-12">
        <h1 className="text-4xl text-center text-bold pb-6">
          <b>Core Values</b>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="flex items-start bg-white p-6 rounded-lg shadow-md relative">
            <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full">
              <img
                className="h-3/4 w-3/4"
                src="./assets/images/aboutus/Sec4-images/img1.png"
                alt="Innovation"
              />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Innovation
              </h3>
              <p className="text-gray-600 mt-2">
                Continuously enhancing the platform with advanced technologies
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-start bg-white p-6 rounded-lg shadow-md relative">
            <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full">
              <img
                className="h-3/4 w-3/4"
                src="./assets/images/aboutus/Sec4-images/img2.png"
                alt="Customer Focus"
              />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Customer Focus
              </h3>
              <p className="text-gray-600 mt-2">
                Prioritizing user satisfaction and workshop efficiency
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-start bg-white p-6 rounded-lg shadow-md relative">
            <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full">
              <img
                className="h-3/4 w-3/4"
                src="./assets/images/aboutus/Sec4-images/img3.png"
                alt="Transparency"
              />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Transparency
              </h3>
              <p className="text-gray-600 mt-2">
                Providing honest and clear communication between users and
                workshops
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex items-start bg-white p-6 rounded-lg shadow-md relative">
            <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full">
              <img
                className="h-3/4 w-3/4"
                src="./assets/images/aboutus/Sec4-images/img4.png"
                alt="Sustainability"
              />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Sustainability
              </h3>
              <p className="text-gray-600 mt-2">
                Encouraging eco-friendly maintenance practices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 md:p-12 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Journey: Turning Vision into Reality
          </h2>
          <p className="text-gray-600 text-lg">
            Hi-Tech was founded to bridge the gap between vehicle owners and
            reliable workshops, providing seamless roadside and at-home
            maintenance services. Recognizing the challenges vehicle owners
            face, we envisioned a platform that ensures trust, convenience, and
            efficiency.
            <br />
            <br />
            From its inception, Hi-Tech has achieved key milestones, including
            partnerships with top workshops, AI chatbot integration, and a
            growing user base. Our journey reflects our commitment to
            simplifying vehicle care and delivering exceptional service.
          </p>
        </div>
        <div className="relative flex justify-center items-center">
          <div className="absolute -z-10 w-3/4 h-full bg-blue-600 transform translate-x-4 translate-y-4"></div>
          <img
            src="./assets/images/aboutus/OurStory.jpg"
            alt="Our Story"
            className="relative z-10 w-3/4 rounded shadow-lg object-cover"
          />
        </div>
      </section>

      {/* Section 6 */}
      <section className="py-8 bg-gray-100">
        <div className="text-center pb-8">
          <h1 className="font-bold text-4xl pb-2">What We Offer</h1>
          <p className="text-xl">Innovative Solutions for Every Challenge</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-20">
          {/* Image Card 1 */}
          <div className="relative group rounded-xl overflow-hidden">
            <img
              src="./assets/images/aboutus/Sec6-images/box-1.jpg"
              alt="Service"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gray-800 bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition duration-300 rounded-lg">
              <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300">
                Book service
              </button>
            </div>
          </div>

          {/* Image Card 2 */}
          <div className="relative group rounded-xl overflow-hidden">
            <img
              src="./assets/images/aboutus/Sec6-images/box-2.webp"
              alt="Doorstep Service"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gray-800 bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition duration-300">
              <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300">
                Book at Doorstep
              </button>
            </div>
          </div>

          {/* Image Card 3 */}
          <div className="relative group rounded-xl overflow-hidden">
            <img
              src="./assets/images/aboutus/Sec6-images/box-3.jpg"
              alt="Roadside Assistance"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gray-800 bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition duration-300">
              <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300">
                Road-Side Assistance
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 */}
      <section className="py-14">
        <h1 className="text-center font-bold text-4xl">Why Choose Us?</h1>
        <div className="flex items-center justify-center pt-20">
          <div className="overflow-hidden w-full max-w-5xl">
            <div
              className="flex animate-slider"
              style={{ width: "calc(100%)" }}
            >
              {[1, 2].map((_, index) => (
                <React.Fragment key={index}>
                  <div className="w-1/4 flex-shrink-0 bg-grey-300 p-4 m-2 rounded-lg shadow-md">
                    <h1 className="font-bold text-lg pb-2">
                      Certified and Trusted Workshops
                    </h1>
                    <p>
                      Our platform connects you with certified and trusted
                      workshops to ensure top-quality service and peace of mind.
                    </p>
                  </div>
                  <div className="w-1/4 flex-shrink-0 bg-grey-300 p-4 m-2 rounded-lg shadow-md">
                    <h1 className="font-bold text-lg pb-2">
                      Instant Roadside Assistance
                    </h1>
                    <p>
                      We provide fast and reliable roadside assistance, ensuring
                      you're never stranded in times of need.
                    </p>
                  </div>
                  <div className="w-1/4 flex-shrink-0 bg-grey-300 p-4 m-2 rounded-lg shadow-md">
                    <h1 className="font-bold text-lg pb-2">
                      Effortless Booking Process
                    </h1>
                    <p>
                      Book services in just a few clicks with our user-friendly
                      and intuitive platform.
                    </p>
                  </div>
                  <div className="w-1/4 flex-shrink-0 bg-grey-300 p-4 m-2 rounded-lg shadow-md">
                    <h1 className="font-bold text-lg pb-2">
                      Transparent Pricing
                    </h1>
                    <p>
                      Enjoy competitive pricing with no hidden charges, giving
                      you complete transparency in all transactions.
                    </p>
                  </div>
                  <div className="w-1/4 flex-shrink-0 bg-grey-300 p-4 m-2 rounded-lg shadow-md">
                    <h1 className="font-bold text-lg pb-2">
                      Real-Time Status Updates
                    </h1>
                    <p>
                      Stay informed with real-time updates on your service
                      requests and bookings.
                    </p>
                  </div>
                  <div className="w-1/4 flex-shrink-0 bg-grey-300 p-4 m-2 rounded-lg shadow-md">
                    <h1 className="font-bold text-lg pb-2">
                      Comprehensive Support System
                    </h1>
                    <p>
                      Our dedicated customer support team is available to assist
                      you at every step, making your experience smooth and
                      hassle-free.
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 8 */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-800">Our Team</h2>
            <p className="text-gray-600 mt-2">
              Meet the passionate individuals driving our vision forward and
              delivering excellence every step of the way.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <img
                src="./assets/images/aboutus/Sec8-images/salihah.jpeg"
                alt="salihah sadiq"
                className="w-32 h-32 rounded-full mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                Salihah Sadiq
              </h3>
              <p className="text-gray-500">Web Developer</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <img
                src="./assets/images/aboutus/Sec8-images/muneeb-ch.jpg"
                alt="Muneeb Shahid"
                className="w-32 h-32 rounded-full mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                Muneeb Shahid
              </h3>
              <p className="text-gray-500">Software Engineer</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <img
                src="./assets/images/aboutus/Sec8-images/manal.jpeg"
                alt="Manal"
                className="w-32 h-32 rounded-full mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                Manal
              </h3>
              <p className="text-gray-500">UI/UX Designer</p>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default About;
