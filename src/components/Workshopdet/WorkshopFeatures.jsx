import React from "react";
import { Wrench, Car, LineChart, Clock } from "lucide-react";

const WorkshopFeatures = () => {
  const features = [
    {
      icon: <Wrench className="w-8 h-8 text-white" />,
      title: "VEHICLE MAINTENANCE",
      description:
        "Vehicle maintenance is crucial to your car's long-term performance and quality of operation.",
    },
    {
      icon: <Car className="w-8 h-8 text-white" />,
      title: "SERVICE WARRANTY",
      description:
        "The parts and services offered by Workshop Plus are covered under our warranty plan.",
    },
    {
      icon: <LineChart className="w-8 h-8 text-white" />,
      title: "RELIABLE DELIVERY SCHEDULE",
      description:
        "Accurate time slots and delivery times are allotted to each vehicle delivered to us.",
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: "ROUND THE CLOCK SERVICE",
      description:
        "Our team attends to emergency breakdown and repairs at any time of the day, and even on weekends and holidays.",
    },
  ];

  return (
    <div className="relative w-full min-h-[300px] py-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/images/aboutus/Sec6-images/box-1.jpg"
          alt="Workshop background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 "
            >
              {/* Icon Container */}
              <div className="w-16 h-16 mb-4 rounded-lg bg-blue-600 backdrop-blur-sm flex items-center justify-center hover:bg-blue-600/50">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-white text-lg font-bold mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkshopFeatures;
