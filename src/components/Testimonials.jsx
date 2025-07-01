import React from 'react';
import { QuoteIcon } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      content: "I had a pre-purchase inspection on a Mazda. I was looking to buy it and they let me bring it in on a Saturday with no appoint. Great guys! I recommend this service to everyone who looks for quality!",
      author: "William Hill",
      date: "26 September, 2018"
    },
    {
      id: 2,
      content: "I do oil changes regularly here, as the car needs the oil changed in order to work properly. The workers are polite and they really know what they do. I'm also satisfied with the prices here!",
      author: "Brian Murdoch",
      date: "09 October, 2018"
    },
    {
      id: 3,
      content: "I had a fuel injection issue, and that's why I turned to this service! They fixed everything and even washed my car for free! I'm glad that I went there, the people working there also gave me warranty.",
      author: "Richard Smith",
      date: "01 October, 2018"
    },
    {
      id: 4,
      content: "Excellent service! They diagnosed and fixed my brake issue quickly. Very professional team and reasonable prices.",
      author: "Emma Johnson",
      date: "15 October, 2018"
    },
    {
      id: 5,
      content: "Best auto repair shop in town. They're honest, reliable and their work is top-notch. Highly recommended!",
      author: "Michael Brown",
      date: "20 October, 2018"
    },
    {
      id: 6,
      content: "Very impressed with their diagnostic capabilities. They found and fixed an issue that two other shops missed.",
      author: "Sarah Davis",
      date: "25 October, 2018"
    },
    {
        "id": 7,
        "content": "I had my transmission repaired here, and the service was outstanding. They explained everything in detail and completed the job on time!",
        "author": "Daniel Carter",
        "date": "02 November, 2018"
      },
      {
        "id": 8,
        "content": "Fantastic experience! They replaced my battery and checked my electrical system at no extra charge. Friendly and efficient staff.",
        "author": "Olivia Martin",
        "date": "10 November, 2018"
      },
      {
        "id": 9,
        "content": "Brought my car in for an engine tune-up, and I couldn't be happier. The team is knowledgeable, and the pricing is fair. Will definitely return!",
        "author": "James Wilson",
        "date": "18 November, 2018"
      }
      
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);

  // Calculate slides
  const slides = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    slides.push(testimonials.slice(i, Math.min(i + 3, testimonials.length)));
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Increased to 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">
          WHAT OUR <span className="text-gray-900">CLIENTS SAY</span>
        </h2>
        <p className="text-gray-500 uppercase">TESTIMONIALS</p>
      </div>

      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ 
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slideGroup, index) => (
            <div key={index} className="min-w-full flex gap-6 px-4">
              {slideGroup.map((testimonial) => (
                <div key={testimonial.id} className="flex-1">
                  <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
                    <QuoteIcon className="w-8 h-8 text-orange-400 mb-4 flex-shrink-0" />
                    <p className="text-gray-600 mb-6 text-sm flex-grow">{testimonial.content}</p>
                    <div className="mt-auto">
                      <p className="font-bold text-gray-900">{testimonial.author}</p>
                      <p className="text-gray-500 text-xs">{testimonial.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-orange-400' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;