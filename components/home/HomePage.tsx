// File: pages/index.js
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaBell,
  FaChevronLeft,
  FaChevronRight,
  FaPuzzlePiece,
  FaMountain,
  FaTrophy,
} from "react-icons/fa";
import "./home.css";
import Link from "next/link";

const featuredDestinations = [
  {
    name: "Hue Imperial City",
    location: "Central Vietnam",
    challenges: 5,
    rating: 4.9,
    isNew: true,
    image: "/assets/Side_Image/hue.jpg",
  },
  {
    name: "Hanoi Old Quarter",
    location: "Northern Vietnam",
    challenges: 8,
    rating: 4.7,
    isNew: false,
    image: "/assets/Side_Image/hanoi.jpg",
  },
  {
    name: "Da Nang Beach",
    location: "Central Vietnam",
    challenges: 3,
    rating: 4.6,
    isNew: true,
    image: "/assets/Side_Image/danang.jpg",
  },
  {
    name: "Mekong Delta",
    location: "Southern Vietnam",
    challenges: 6,
    rating: 4.8,
    isNew: false,
    image: "/assets/Side_Image/mekong.jpg",
  },
];

const testimonials = [
  {
    name: "Shawn Mendes",
    avatar: "/assets/Side_Image/shawn.jpg",
    comment:
      "The puzzle hunt in Hoi An was incredible! My kids loved solving the lantern riddles and learning about local culture.",
    location: "Hoi An Ancient Town",
    date: "March 2, 2025",
  },
  {
    name: "Rosie",
    avatar: "/assets/Side_Image/rosie.jpg",
    comment:
      "This app transformed our trip to Ha Long Bay. The cave exploration challenge had us discovering places we would never have found on our own!",
    location: "Ha Long Bay",
    date: "February 15, 2025",
  },
];

const nearbyEvents = [
  {
    title: "Traditional Water Puppet Show",
    description: "Experience Vietnam's unique cultural performance",
    location: "Thang Long Theater",
    distance: "1.5 km away",
    status: "Now",
    image: "/assets/Side_Image/puppet.jpg",
  },
  {
    title: "Vietnamese Cooking Class",
    description: "Learn to make authentic phở and spring rolls",
    location: "Hanoi Cooking Centre",
    distance: "2.3 km away",
    status: "Today",
    image: "/assets/Side_Image/cooking.jpg",
  },
  {
    title: "Night Market Tour",
    description: "Explore local street food and souvenirs",
    location: "Old Quarter",
    distance: "0.8 km away",
    status: "Tomorrow",
    image: "/assets/Side_Image/nightmarket.jpg",
  },
];

export default function Home() {
  const [currentDot, setCurrentDot] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);

  useEffect(() => {
    // Show achievement popup after 5 seconds
    const achievementTimer = setTimeout(() => {
      setShowAchievement(true);
    }, 5000);

    // Rotate event carousel dots
    const dotInterval = setInterval(() => {
      setCurrentDot((prevDot) => (prevDot + 1) % 5);
    }, 3000);

    // Cleanup on unmount
    return () => {
      clearTimeout(achievementTimer);
      clearInterval(dotInterval);
    };
  }, []);

  return (
    <div>
      {/* Header */}
      {/* <header className="header-bg text-white p-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <h1 className="text-xl font-bold italic">Aloha<br/>Vietnam</h1>
        </div>
        <div className="flex items-center bg-white rounded-full px-4 py-1 w-2/3">
          <span className="text-gray-500">search</span>
          <div className="flex-grow"></div>
          <FaMapMarkerAlt className="text-gray-500" />
        </div>
        <div className="flex items-center">
          <FaWhatsapp className="text-xl mx-1" />
          <FaQuestionCircle className="text-xl mx-1" />
        </div>
      </header> */}

      {/* Main Content */}
      <main className="flex-grow main-content grid-pattern">
        {/* Hero Section */}
        <section className="p-4 mt-20 flex flex-col">
          <div className="flex flex-row items-stretch bg-white rounded-lg overflow-hidden shadow">
            <div className="w-1/2 relative">
              <Image
                src="/assets/Side_Image/traveler.jpg"
                alt="Traveler with map in Vietnam"
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            <div className="w-1/2 p-4 flex flex-col justify-center bg-yellow-50">
              <h2 className="text-2xl font-bold text-red-900">Are You Ready</h2>
              <p className="my-2 text-red-800">
                Complete the mission to unlock the next location.
              </p>
              <Link href={"/clues"}>
                <button className="mt-2 bg-red-600 text-white py-2 px-4 rounded-lg font-bold animated-btn">
                  Start playing
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="px-4 py-6">
          <h2 className="text-2xl font-bold text-red-900 text-center mb-4">
            Choose your Plan
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="plan-card p-4 rounded-lg shadow text-center">
              <p className="font-bold text-red-800 text-sm">
                3-day free trial,
                <br />
                Then 7$ forever
                <br />
              </p>
              <Link href={"/annualPayment"}>
                <button className="mt-4 bg-red-600 text-white py-2 px-6 rounded-lg w-full">
                  Buy now
                </button>
              </Link>
            </div>
            <div className="plan-card p-4 rounded-lg shadow text-center">
              <p className="font-bold text-red-800 text-sm">
                3-day free trial,
                <br />
                Then $3/15 days
              </p>
              <Link href={"/daysPayment"}>
                <button className="mt-4 bg-red-600 text-white py-2 px-6 rounded-lg w-full">
                  Buy now
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="events-section mx-4 my-6 p-4 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-red-900 text-center mb-6">
            Local Cultural Events
          </h2>
          <div className="relative">
            <div className="py-8">
              {/* Event content would go here */}
              <div className="flex justify-center items-center h-32">
                <p className="text-lg font-bold text-red-900">
                  Upcoming Festival: Tết Holiday
                </p>
              </div>
            </div>
            <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2">
              <FaChevronLeft className="text-xl text-red-900" />
            </button>
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2">
              <FaChevronRight className="text-xl text-red-900" />
            </button>
          </div>
          <div className="flex justify-center mt-4 space-x-1">
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className={`dot ${index === currentDot ? "active" : ""}`}
              />
            ))}
          </div>
        </section>

        {/* New Features Section */}
        <section className="px-4 py-2 mb-12">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold text-red-900 mb-3">
              Popular Challenges
            </h2>
            <div className="space-y-3">
              <div className="flex items-center p-2 bg-yellow-50 rounded">
                <FaPuzzlePiece className="text-red-600 text-xl mr-3" />
                <div>
                  <h3 className="font-bold">Hoi An Ancient Town</h3>
                  <p className="text-sm text-gray-600">
                    Solve the lantern riddle
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    4.8 ★
                  </span>
                </div>
              </div>
              <div className="flex items-center p-2 bg-yellow-50 rounded">
                <FaMountain className="text-red-600 text-xl mr-3" />
                <div>
                  <h3 className="font-bold">Ha Long Bay</h3>
                  <p className="text-sm text-gray-600">Find the hidden cave</p>
                </div>
                <div className="ml-auto">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    4.7 ★
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Destinations Section */}
        <section className="px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-red-900">
              Featured Destinations
            </h2>
            <span className="text-red-600 text-sm">View all</span>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-4" style={{ minWidth: "min-content" }}>
              {featuredDestinations.map((destination, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-40 rounded-lg overflow-hidden shadow-md bg-white"
                >
                  <div className="relative h-32 w-full">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      layout="fill"
                      objectFit="cover"
                    />
                    {destination.isNew && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                        New
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <h3 className="font-bold text-red-900">
                      {destination.name}
                    </h3>
                    <div className="flex items-center text-xs mt-1">
                      <FaMapMarkerAlt className="text-red-600 mr-1" />
                      <span className="text-gray-600">
                        {destination.location}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-600">
                        {destination.challenges} puzzles
                      </span>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-1 rounded">
                        {destination.rating} ★
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-6 mb-16">
          <h2 className="text-xl font-bold text-red-900 text-center mb-4">
            What Travelers Say
          </h2>

          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md border-l-4"
                style={{
                  borderLeftColor: index % 2 === 0 ? "#e63946" : "#fca5a5",
                }}
              >
                <div className="flex items-center mb-2">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">{testimonial.comment}</p>
                <div className="mt-2 text-sm text-gray-500">
                  {testimonial.location} • {testimonial.date}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button className="bg-white text-red-900 py-2 px-4 rounded-lg shadow border border-red-200 font-medium">
              Read More Reviews
            </button>
          </div>
        </section>

        <section className="px-4 py-6 mb-16">
          <h2 className="text-xl font-bold text-red-900 mb-4">
            Nearby Events & Activities
          </h2>

          <div className="space-y-3">
            {nearbyEvents.map((event, index) => (
              <div
                key={index}
                className="flex items-center bg-white p-3 rounded-lg shadow-md"
              >
                <div className="relative min-w-16 h-16 rounded-md overflow-hidden mr-3">
                  <Image
                    src={event.image}
                    alt={event.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-red-900">{event.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        event.status === "Now"
                          ? "bg-green-100 text-green-800"
                          : event.status === "Today"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {event.description}
                  </p>
                  <div className="flex items-center text-xs mt-1 text-gray-500">
                    <FaMapMarkerAlt className="mr-1" />
                    <span>{event.location}</span>
                    <span className="mx-2">•</span>
                    <span>{event.distance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full py-2 border border-red-300 text-red-600 rounded-lg font-medium">
            View All Activities
          </button>
        </section>

        <section className="px-4 py-6 mb-16 bg-gradient-to-r from-red-500 to-red-600 rounded-lg mx-4 text-white">
          <div className="flex items-center justify-center mb-2">
            <FaTrophy className="text-yellow-300 text-2xl mr-2" />
            <h2 className="text-xl font-bold">Aloha Rewards</h2>
          </div>

          <p className="text-center mb-4">
            Complete challenges and earn points to unlock exclusive rewards!
          </p>

          <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Your Progress</span>
              <span className="text-sm">120 / 200 points</span>
            </div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-2.5">
              <div
                className="bg-yellow-300 h-2.5 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
            <p className="text-xs mt-2 text-center">
              Next reward: Free City Tour (80 points to go)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white bg-opacity-10 p-3 rounded-lg text-center">
              <div className="bg-yellow-400 text-red-800 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="font-bold">1</span>
              </div>
              <p className="text-sm">Complete Daily Challenges</p>
            </div>
            <div className="bg-white bg-opacity-10 p-3 rounded-lg text-center">
              <div className="bg-yellow-400 text-red-800 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="font-bold">2</span>
              </div>
              <p className="text-sm">Share Photos</p>
            </div>
            <div className="bg-white bg-opacity-10 p-3 rounded-lg text-center">
              <div className="bg-yellow-400 text-red-800 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="font-bold">3</span>
              </div>
              <p className="text-sm">Invite Friends</p>
            </div>
            <div className="bg-white bg-opacity-10 p-3 rounded-lg text-center">
              <div className="bg-yellow-400 text-red-800 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="font-bold">4</span>
              </div>
              <p className="text-sm">Redeem Rewards</p>
            </div>
          </div>
        </section>
      </main>

      <section className="px-4 py-6 mb-20">
        <div className="bg-yellow-100 rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-center mb-3">
            <FaBell className="text-red-600 text-xl mr-2" />
            <h2 className="font-bold text-red-900">Stay Updated</h2>
          </div>

          <p className="text-sm text-center text-red-800 mb-4">
            Subscribe to our newsletter for new locations, special offers, and
            travel tips!
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow py-2 px-3 rounded-l-lg border-t border-b border-l border-gray-300 focus:outline-none"
            />
            <button className="bg-red-600 text-white py-2 px-4 rounded-r-lg">
              Subscribe
            </button>
          </div>

          <div className="mt-3 text-xs text-center text-gray-500">
            We respect your privacy. Unsubscribe at any time.
          </div>
        </div>
      </section>

      {/* Achievement Pop-up */}
      {showAchievement && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 text-center">
            <FaTrophy className="text-yellow-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Welcome to Aloha!</h3>
            <p>Complete tasks to receive many attractive vouchers!</p>
            <button
              onClick={() => setShowAchievement(false)}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg"
            >
              Playing now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
