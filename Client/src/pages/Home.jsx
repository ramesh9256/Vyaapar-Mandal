import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { FaUsers, FaBullhorn, FaPhone } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import API from '../utils/axios'

import first from '../assets/images (1).jpeg'
import second from '../assets/images.jpeg'
import third from '../assets/main.jpg'

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => { 
      try {
        const res = await API.get('/events'); // Update if needed
        setEvents(res.data); // Show only latest 3 events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="pt-4">

      {/* Hero Slider */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-[60vh]"
      >
        <SwiperSlide>
          <img src={first} alt="Vyapaar Mandal Slide 1" className="w-full h-full object-contain" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={second} alt="Vyapaar Mandal Slide 2" className="w-full h-full object-contain" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={third} alt="Vyapaar Mandal Slide 3" className="w-full h-full object-contain" />
        </SwiperSlide>
      </Swiper>

      {/* About Section */}
      <section className="bg-white py-10 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">व्यापार मंडल में आपका स्वागत है</h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          Vyapaar Mandal ek aisa sangathan hai jo sthaniya vyapariyon ke hiton ki raksha karta hai.
          Hamare mission ka uddeshya ek viksit, sangathit aur sashakt vyapari samudaay banana hai.
        </p>
      </section>

      {/* Info Cards */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Members */}
          <Link to={'/member'} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <FaUsers className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">सदस्य</h3>
            <p className="text-gray-600">हमारे संगठन में 500+ से अधिक व्यापारी सदस्य हैं जो विभिन्न क्षेत्रों से जुड़े हुए हैं।</p>
          </Link>

          {/* Notices / Events */}
          <Link to={'/Announcement'} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <FaBullhorn className="text-4xl text-green-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">घोषणाएँ</h3>
            <p className="text-gray-600">नवीनतम मीटिंग्स, मेलों और व्यापारी घोषणाओं की जानकारी प्राप्त करें।</p>
          </Link>

          {/* Contact */}
          <Link to={'/contact'} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <FaPhone className="text-4xl text-red-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">संपर्क करें</h3>
            <p className="text-gray-600">किसी भी समस्या, सुझाव या जानकारी हेतु हमसे संपर्क करें।</p>
          </Link>

        </div>
      </section>
      <section className="bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">लेटेस्ट इवेंट्स</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.length > 0 ? events.map(event => (
              <div key={event._id} className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2 line-clamp-2">{event.description || 'कोई विवरण उपलब्ध नहीं है।'}</p>
                <p className="text-sm text-gray-500">📅 {new Date(event.date).toLocaleDateString('hi-IN')}</p>
                {event.location && <p className="text-sm text-gray-500 mt-1">📍 {event.location}</p>}
              </div>
            )) : (
              <p className="text-center col-span-3 text-gray-500">कोई इवेंट्स उपलब्ध नहीं हैं।</p>
            )}
          </div>

          
        </div>
      </section>
    </div>
  )
}

export default Home
