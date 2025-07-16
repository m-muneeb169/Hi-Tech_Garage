"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Sidenavbar from "../components/sidenavbar"
import Header from "../components/header"
import Footer from "../components/footer"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../firebase" // Make sure this path matches your setup

const Contact = () => {
  const [isOpen, setIsOpen] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)

    try {
      const adminDocRef = doc(db, "admins", "messages")
      const docSnap = await getDoc(adminDocRef)

      let nextUserKey = "user1"
      let updatedData = {}

      if (docSnap.exists()) {
        const existingData = docSnap.data()
        const userKeys = Object.keys(existingData).filter((key) => key.startsWith("user"))
        const userNumbers = userKeys.map((key) => parseInt(key.replace("user", "")))
        const nextNumber = userNumbers.length ? Math.max(...userNumbers) + 1 : 1
        nextUserKey = `user${nextNumber}`

        updatedData = {
          ...existingData,
          [nextUserKey]: [
            {
              fullName: formData.name,
              phone: formData.phone,
              email: formData.email,
              serviceType: formData.service,
              message: formData.message,
              timestamp: new Date().toISOString(),
            },
          ],
        }

        await setDoc(adminDocRef, updatedData)
      } else {
        updatedData = {
          user1: [
            {
              fullName: formData.name,
              phone: formData.phone,
              email: formData.email,
              serviceType: formData.service,
              message: formData.message,
              timestamp: new Date().toISOString(),
            },
          ],
        }

        await setDoc(adminDocRef, updatedData)
      }

      alert("Message sent successfully!")
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      })
    } catch (error) {
      console.error("Error saving message:", error)
      alert("Something went wrong. Please try again.")
    }
  }

  const faqs = [
    {
      question: "How quickly can a mechanic reach my location?",
      answer:
        "Our partner workshops typically respond within 15-30 minutes and reach your location within 45-60 minutes, depending on traffic and distance.",
    },
    {
      question: "What happens if my car needs to be taken to the workshop?",
      answer:
        "If your car requires extensive repairs, our workshop will provide you with a temporary replacement vehicle and safely transport your car to the workshop using our specialized towing equipment.",
    },
    {
      question: "Do you provide home service for regular maintenance?",
      answer:
        "Yes, we provide comprehensive home service for regular maintenance including oil changes, tune-ups, and basic repairs. Our certified mechanics will come to your location with all necessary equipment.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major payment methods including credit/debit cards, online bank transfers, and digital wallets. Cash payments can be made directly to the workshop staff.",
    },
    {
      question: "How do I know if a workshop is available?",
      answer:
        "Each workshop's current availability is displayed in real-time on our platform. You can also see their average response time and customer ratings.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Sidenavbar />
      <Link to="/"><Header /></Link>

      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">Get in Touch</h1>
            <p className="text-lg md:text-xl mb-8">
              24/7 Emergency Roadside Assistance & Professional Auto Care Services
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
                Emergency Assistance
              </button>
              <button className="px-8 py-3 border-2 border-white hover:bg-white hover:text-blue-900 rounded-lg font-semibold transition-colors">
                Schedule Service
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  📞
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
                  <p className="text-gray-600 mb-2">24/7 Emergency Hotline</p>
                  <a href="tel:+1234567890" className="text-blue-600 hover:text-blue-700 font-medium">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>
            {/* Email */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">✉️</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                  <p className="text-gray-600 mb-2">Quick Response Time</p>
                  <Link to="mailto:support@hitechgarage.com" className="text-blue-600 hover:text-blue-700 font-medium">
                    support@hitechgarage.com
                  </Link>
                </div>
              </div>
            </div>
            {/* Hours */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">⏰</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Working Hours</h3>
                  <p className="text-gray-600 mb-2">24/7 Emergency Services</p>
                  <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">Timing: 24/7 </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-serif mb-4">Send Message</h2>
              <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="+1 (234) 567-890"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select a service</option>
                  <option value="emergency">Emergency Roadside Assistance</option>
                  <option value="maintenance">Regular Maintenance</option>
                  <option value="repair">Repair Service</option>
                  <option value="inspection">Vehicle Inspection</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Please describe your issue or request..."
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Find quick answers to common questions about our services</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg bg-white">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                  onClick={() => setIsOpen(isOpen === index ? null : index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${isOpen === index ? "transform rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Location</h2>
            <p className="text-gray-600">Find our partner workshops near you</p>
          </div>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18..."
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Faisalabad Map"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Emergency Assistance?</h2>
          <p className="text-xl mb-8">Our team is available 24/7 to help you with any vehicle-related issues</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-white text-blue-900 hover:bg-gray-100 rounded-lg font-semibold transition-colors">
              Call Now
            </button>
            <button className="px-8 py-3 border-2 border-white hover:bg-white hover:text-blue-900 rounded-lg font-semibold transition-colors">
              Live Chat
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Contact
