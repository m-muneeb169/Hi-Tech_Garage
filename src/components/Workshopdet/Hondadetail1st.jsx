import React from 'react';

const Hondadetail1st = () => {
  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-coral-500 text-4xl md:text-5xl font-bold">
              Welcome To Workshop Plus
            </h1>
            
            <p className="text-gray-300 text-lg">
              With four branches in the country and over 1000 trained automobile professionals on our team,
              Workshop Plus is a pioneer in the field of automobile services and repairs. This is the place
              where professionalism, quality customer service and affordability come together to help you,
              the customer.
            </p>

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-semibold italic">
                Enjoy Exclusive Membership Benefits
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>FREE ANNUAL SAFETY ANALYSIS</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>COMPLIMENTARY UPGRADES</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>FREE CAR WASH</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>15% DISCOUNT ON ALL PAINTING</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[400px] md:h-[500px]">
            <img 
              src="./assets/images/products/pngwing.com.png"
              alt="Auto mechanic working" 
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hondadetail1st;