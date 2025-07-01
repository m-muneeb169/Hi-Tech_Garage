import React, { useState } from 'react';
import { Building2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const RelatedWorkshops = () => {
  const [activeWorkshop, setActiveWorkshop] = useState(null);

  const workshops = [
    {
      id: '1',
      title: 'Honda',
      description: 'Specialized Honda vehicle service center offering comprehensive maintenance and repair solutions.',
      path: '/honda',
      icon: <Building2 className="w-12 h-12 text-blue-600" />
    },
    {
      id: '2',
      title: 'Aslam Autos',
      description: 'Premier multi-brand workshop known for quality service and experienced technicians.',
      path: '/aslamAutos',
      icon: <Building2 className="w-12 h-12 text-blue-600" />
    },
    {
      id: '3',
      title: 'Toyota',
      description: 'Authorized Toyota service center providing genuine parts and expert maintenance services.',
      path: '/toyota',
      icon: <Building2 className="w-12 h-12 text-blue-600" />
    },
    {
      id: '4',
      title: 'Ibrahim Autos & Parts',
      description: 'Complete auto care solution with genuine spare parts and professional repair services.',
      path: '/ibrahimAutos',
      icon: <Building2 className="w-12 h-12 text-blue-600" />
    },
    {
      id: '5',
      title: 'Suzuki',
      description: 'Dedicated Suzuki service center offering specialized maintenance and repair services.',
      path: '/suzuki',
      icon: <Building2 className="w-12 h-12 text-blue-600" />
    },
    {
      id: '6',
      title: 'First-Stop Garage',
      description: 'One-stop automotive service center for all your vehicle maintenance needs.',
      path: '/firstStop',
      icon: <Building2 className="w-12 h-12 text-blue-600" />
    },
    {
      id: '7',
      title: 'Kia',
      description: 'Authorized Kia workshop providing professional service and maintenance solutions.',
      path: '/kia',
      icon: <Building2 className="w-12 h-12 text-blue-600" />
    },
    {
      id: '8',
      title: 'Hyundai',
      description: 'Expert Hyundai service center with certified technicians and modern equipment.',
      path: '/hyundai',
      icon: <Building2 className="w-12 h-12 text-blue-600" />
    },
    {
      id: '9',
      title: 'Sharif Motor Workshop',
      description: 'Trusted multi-brand workshop offering comprehensive automotive solutions.',
      path: '/sharifMotors',
      icon: <Building2 className="w-12 h-12 text-blue-600" />
    }
  ];

  return (
    <div className="container mx-auto pt-16 pb-8 px-4">
      <h2 className="text-4xl font-bold font-serif text-center mb-12">Other Related Workshops</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {workshops.map((workshop) => (
          <div 
            key={workshop.id}
            onClick={() => setActiveWorkshop(workshop)}
            className={`
              border-2 rounded-lg p-6 text-center cursor-pointer transform transition-all duration-300
              ${activeWorkshop?.id === workshop.id 
                ? 'border-blue-600 bg-blue-50 scale-105 shadow-lg' 
                : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'}
            `}
          >
            <div className="flex justify-center mb-4">
              {workshop.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{workshop.title}</h3>
            <p className="text-gray-600 text-sm mb-4">
              {workshop.description}
            </p>
            <Link 
              to={workshop.path}
              className="inline-flex items-center gap-2 px-4 py-2  text-blue-700 rounded-md hover:text-blue-500 transition-colors"
            >
              See Details
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedWorkshops;