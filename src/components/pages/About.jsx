import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReadMoreText from "./ReadMore";

const fadeUp = (delay = 0.2) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay },
  },
});

const leadership = [
  {
    name: "Afzal Khokhar, MNA",
    title: "Chairperson",
    description:
      "Under the leadership of the Government of Punjab, the PSBA is transforming the way people access daily essentials. By launching and expanding Sahulat Bazaars, we are directly impacting the lives of citizens by offering them relief from inflation and improving their purchasing power. We are dedicated to maintaining a duo of notified prices and quality goods, eliminating undue middlemen, and leveraging technology for smarter governance.",
    role: "Member of the National Assembly of Pakistan",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6VL9rG5XSrocO2pKqvdg472FdrZhI-bQCCQ&s",
    delay: 0.1,
  },
  {
    name: "Dr. Ehsan Bhutta",
    title: "Secretary",
    description:
      "Under the visionary guidance of the Government of Punjab, the Punjab Sahulat Bazaars Authority remains steadfast in its mission to serve the people with integrity and innovation. Our focus is on ensuring accessible, affordable, and quality essential commodities for every citizen. By strengthening the operational framework of Sahulat Bazaars, we aim to uplift communities, control inflationary pressures, and foster economic stability. Together, through transparency, efficiency, and technological advancement, we are building a more resilient and citizen-centric system. Punjab Sahulat Bazaars also act as intermediaries between the government and the public, providing platforms for mutual interactions and distribution of essentials during abnormal or special situations and occasions.",
    role: "Secretary",
    image:
      "https://pbs.twimg.com/profile_images/1579843584802660353/ecXCahKX_400x400.jpg",
    delay: 0.3,
  },
  {
    name: "Naveed Rafaqat Ahmad, ACA",
    title: "DG",
    description:
      "It is with great pride and a deep sense of public service that I welcome you to the Punjab Sahulat Bazaars Authority (PSBA) a bold institutional response to one of our province’s most pressing challenges: equitable access to affordable essentials for every citizen At PSBA, we are not just managing retail spaces we are redefining the public supply chain. Through an expanding network of Sahulat Bazaars across Punjab, we aim to restore fairness in pricing, uplift underserved communities, and ensure that no household is left vulnerable to profiteering or supply shocks.Our mission is rooted in compassion, efficiency, and innovation. With the visionary leadership of Chief Minister Maryam Nawaz Sharif, we are proud to execute a wide-ranging agenda that includes:Construction of 100 new Sahulat Bazaars across tehsils.Launch of ‘Sahulat on the Go’ mobile retail units.Solarization of bazaars for sustainable operations.Digital monitoring systems to ensure price and quality compliance.And entrepreneurial inclusion for small vendors and women-led businesses.This is not merely a government intervention it is a people-first transformation. Every subsidy delivered, every price stabilized, every small vendor empowered reflects our collective commitment to inclusive growth and dignity for all.I invite citizens, local governments, civil society, and the private sector to join hands with us as we reimagine public markets not as transactional spaces, but as centers of fairness, opportunity, and resilience.Let us make PSBA a model for the rest of Pakistan.",
    role: "Director General",
    image: "https://psba.gop.pk/wp-content/uploads/2025/06/Naveed.jpg",
    delay: 0.4,
  },
];

const team = [
  {
    name: "Mr. Farhan Dilawar Sheikh",
    role: "Director",
    dept: "Audit, Monitoring & Evaluation",
    img: "https://psba.gop.pk/wp-content/uploads/2025/07/fdsheikh-300x300.jpg",
  },
  {
    name: "Mr. Roshan Zameer",
    role: "Additional Director",
    dept: "Projects, Planning & Special Initiatives",
    img: "https://psba.gop.pk/wp-content/uploads/2025/07/Roshan-Zameer-290x300.jpg",
  },
  {
    name: "Mr. Sadam Hussain",
    role: "Additional Director",
    dept: "Operations & Revenue",
    img: "https://psba.gop.pk/wp-content/uploads/2025/07/Sadam-300x295.jpg",
  },
  {
    name: "Ms. Maria Iqbal",
    role: "Assistant Director",
    dept: "Establishment",
    img: "https://www.freeiconspng.com/thumbs/female-icon/female-icon-27.png",
  },
  {
    name: "Mr. Asad Abbas",
    role: "Sr. Engineer",
    dept: "Civil",
    img: "https://cdn.vectorstock.com/i/1000v/42/61/man-icon-design-template-isolated-vector-34494261.jpg",
  },
  {
    name: "Mr. Barkat Ali Laghari",
    role: "Structural Design Engineer",
    dept: "",
    img: "https://cdn.vectorstock.com/i/1000v/42/61/man-icon-design-template-isolated-vector-34494261.jpg",
  },
  {
    name: "Mr. Muhammad Amir",
    role: "Architect",
    dept: "",
    img: "https://cdn.vectorstock.com/i/1000v/42/61/man-icon-design-template-isolated-vector-34494261.jpg",
  },
  {
    name: "Mr. Muhammad Ahmad",
    role: "Assistant Director",
    dept: "IT",
    img: "https://cdn.vectorstock.com/i/1000v/42/61/man-icon-design-template-isolated-vector-34494261.jpg",
  },
  {
    name: "Mr. Muhammad Ali Hassan",
    role: "Assistant Director",
    dept: "Software Development & Operations",
    img: "https://psba.gop.pk/wp-content/uploads/2025/07/AliH-300x293.jpg",
  },
  {
    name: "Mr. Rab Nawaz Baloch",
    role: "Assistant Director",
    dept: "Legal",
    img: "https://cdn.vectorstock.com/i/1000v/42/61/man-icon-design-template-isolated-vector-34494261.jpg",
  },
  {
    name: "Mr. Rizwan Haider Shah",
    role: "Assistant Director",
    dept: "Projects, Planning & Initiatives",
    img: "https://cdn.vectorstock.com/i/1000v/42/61/man-icon-design-template-isolated-vector-34494261.jpg",
  },
  {
    name: "Mr. Usman Badar",
    role: "Assistant Director",
    dept: "Ops & Revenue – Central/North",
    img: "https://cdn.vectorstock.com/i/1000v/42/61/man-icon-design-template-isolated-vector-34494261.jpg",
  },
  {
    name: "Mr. Moeen Chishti",
    role: "Assistant Director",
    dept: "Audit, Compliance & Control",
    img: "https://cdn.vectorstock.com/i/1000v/42/61/man-icon-design-template-isolated-vector-34494261.jpg",
  },
  {
    name: "Mr. Asim Shahbaz",
    role: "Assistant Director",
    dept: "Security & Surveillance",
    img: "https://cdn.vectorstock.com/i/1000v/42/61/man-icon-design-template-isolated-vector-34494261.jpg",
  },
  {
    name: "Mr. Muhammad Iqbal",
    role: "Assistant Director",
    dept: "Budget, Finance & Taxation",
    img: "https://cdn.vectorstock.com/i/1000v/42/61/man-icon-design-template-isolated-vector-34494261.jpg",
  },
  {
    name: "Mr. Kashif Rasheed",
    role: "Assistant Director",
    dept: "Accounts, Payroll & Reconciliation",
    img: "https://cdn.vectorstock.com/i/1000v/42/61/man-icon-design-template-isolated-vector-34494261.jpg",
  },
  {
    name: "Mr. Muhammad Ali",
    role: "Assistant Director",
    dept: "HQ Admin/Operations",
    img: "https://cdn.vectorstock.com/i/1000v/42/61/man-icon-design-template-isolated-vector-34494261.jpg",
  },
];

const mission = [
  {
    title: "Accessible Markets",
    desc: "Sahulat Bazaars in every district for all citizens.",
    icon: "🏬",
  },
  {
    title: "Fair Pricing",
    desc: "Transparent, regulated prices for daily essentials.",
    icon: "💰",
  },
  {
    title: "Digital Governance",
    desc: "Modern tech for efficient, transparent operations.",
    icon: "🖥️",
  },
  {
    title: "Empowering Vendors",
    desc: "Opportunities for small businesses and startups.",
    icon: "🤝",
  },
  {
    title: "Smart Monitoring",
    desc: "Real-time analytics and citizen feedback.",
    icon: "📈",
  },
];

const stats = [
  { label: "Bazaars", value: "36" },
  { label: "Annual visitors ", value: "40 million" },
  { label: "Stakeholders", value: "20,000" },
];




export default function WhatWeDo() {
  return (
    <main className="bg-gradient-to-br from-white-900 via-white to-yellow-50 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center text-center py-15 bg-gradient-to-br from-green-900 via-green-700 to-yellow-400 overflow-hidden">
        {/* Geometric shapes and yellow sparkles */}
        <div className="absolute top-6 left-10 w-10 h-10 bg-yellow-400 rotate-12 rounded-lg opacity-70 z-0" />
        <div className="absolute top-20 right-24 w-8 h-8 bg-yellow-300 rotate-45 rounded-lg opacity-60 z-0" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full opacity-80 animate-pulse z-0" />
        <div className="absolute top-32 right-1/3 w-3 h-3 bg-yellow-300 rounded-full opacity-80 animate-pulse z-0" />
        {/* Layered gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-yellow-100/20 to-green-900/10 pointer-events-none z-0" />
        {/* Wavy SVG divider at bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full h-8"
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#facc15"
            fillOpacity="0.25"
            d="M0,32 C360,80 1080,0 1440,48 L1440,80 L0,80 Z"
          />
        </svg>
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl mb-4 tracking-tight font-[Inter,sans-serif] relative z-10"
        >
          About Punjab Sahulat Bazaars Authority
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.3)}
          className="text-1xl md:text-3xl text-yellow-100 font-medium max-w-3xl mx-auto mb-10 relative z-10"
        >
          Empowering Punjab through fair, transparent, and innovative markets.
        </motion.p>
        <motion.a
          href="#about"
          whileHover={{ scale: 1.08 }}
          className="inline-block bg-yellow-100 text-green-900 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition text-lg mt-2 relative z-10"
        >
          Learn More
        </motion.a>
        {/* Decorative SVG background shapes */}
        <svg
          className="absolute top-0 left-0 w-80 h-80 opacity-20 z-0"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="100" fill="#14532d" />
        </svg>
        <svg
          className="absolute bottom-0 right-0 w-96 h-96 opacity-10 z-0"
          viewBox="0 0 200 200"
        >
          <rect width="200" height="200" rx="100" fill="#fde68a" />
        </svg>
      </section>

      {/* About & Stats Section with design accents */}
      <section
        id="about"
        className="max-w-5xl mx-auto py-16 px-4 flex flex-col md:flex-row gap-10 items-center"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp(0.1)}
          className="flex-1 bg-gradient-to-br from-yellow-200 via-white to-green-100 border-l-8 border-yellow-400 p-10 rounded-3xl shadow-xl relative overflow-hidden"
        >
          {/* Decorative accent */}
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-yellow-200 rounded-full opacity-30 z-0 animate-pulse" />
          <div className="absolute top-10 right-0 w-16 h-16 bg-green-200 rounded-full opacity-20 z-0 animate-pulse" />
          <h2 className="text-3xl font-bold text-green-900 mb-4 relative z-10 text-center ">
            Who We Are
          </h2>
          <p className="text-lg text-green-900 mb-2 relative z-10 align-middle text-justify">
            The Punjab Sahulat Bazaars Authority (PSBA) is a government-led
            initiative dedicated to safeguarding consumer welfare by ensuring
            the uninterrupted availability of quality essential commodities at
            officially notified rates across Punjab. Through an expanding
            network of Sahulat Bazaars, we deliver direct economic relief to
            citizens, countering inflationary pressures and promoting equitable
            access in a transparent, regulated environment. Beyond
            affordability, PSBA is also a catalyst for inclusive
            entrepreneurship providing accessible business platforms to low
            capital vendors and uplifting grassroots enterprise.
          </p>
          <p className="text-green-800 relative z-10 text-justify">
            At PSBA, we don’t just run markets we empower communities, protect
            purchasing power, and lay the foundation for a more resilient and
            inclusive provincial economy.
          </p>
        </motion.div>
        <div className="flex-1 flex flex-col gap-4 items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-small w-full">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp(0.2 + i * 0.1)}
                className="bg-gradient-to-br from-yellow-100 via-white to-green-100 border-2 border-green-200 rounded-2xl shadow flex flex-col items-center justify-center relative overflow-hidden"
                style={{
                  aspectRatio: "1 / 1",
                  minWidth: "120px",
                  minHeight: "120px",
                  maxWidth: "180px",
                  maxHeight: "180px",
                }}
              >
                {/* Decorative accent */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-200 rounded-full opacity-20 z-0" />
                <span className=" font-semibold text-2xl text-green-900 relative z-10 flex items-center justify-center" > {stat.value}</span>
                   
                <span className="text-med font-semibold text-green-800 relative z-10">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section - Features */}
      <section id="mission" className="max-w-6xl mx-auto py-16 px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp(0)}
          className="text-4xl font-extrabold text-green-900 text-center mb-12 tracking-tight"
        >
          Our Mission
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {mission.map((m, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-green-50 via-white to-yellow-100 border-2 border-green-200 rounded-3xl shadow-xl p-8 flex flex-col items-center transition hover:shadow-2xl hover:border-yellow-400"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp(i * 0.08)}
            >
              <div className="mb-3 text-4xl bg-gradient-to-br from-green-200 to-yellow-100 rounded-full w-16 h-16 flex items-center justify-center border-2 border-green-200 shadow-md">
                {m.icon}
              </div>
              <h3 className="text-lg font-bold text-green-900 mb-2 text-center">
                {m.title}
              </h3>
              <p className="text-green-800 text-center font-medium text-base">
                {m.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leadership/Chairperson Section */}
      <section className="max-w-4xl mx-auto py-16 px-4 flex flex-col gap-10">
        {leadership.map((person, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp(person.delay)}
            className="relative backdrop-blur-md bg-white/90 border-2 border-yellow-300 rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row items-center gap-8"
          >
            <motion.div
              className="w-50 h-50  overflow-hidden border-2 border-green-600 shadow-lg mb-4 md:mb-0 flex-shrink-0"
              variants={fadeUp(person.delay + 0.1)}
            >
              <img
                src={person.image}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div>
              <h2 className="text-2xl font-bold text-green-900 mb-2">
                {person.title}'s Message
              </h2>
              <ReadMoreText text={person.description} />

              <div className="mt-6 flex items-center gap-2">
                <span className="font-bold text-green-900 text-lg">
                  {person.name}
                </span>
                <span className="italic text-yellow-600 text-sm">
                  {person.title}
                </span>
              </div>
              <span className="block text-sm text-green-600 mt-1">
                {person.role}
              </span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Meet the Team Section - green/yellow/white, modern accents */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp(0)}
          className="text-4xl font-extrabold text-green-900 text-center mb-10"
        >
          Meet the Team
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-white via-yellow-50 to-green-100 shadow rounded-2xl p-8 border border-green-200 flex flex-col items-center group transition hover:shadow-xl hover:border-yellow-400"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp(i * 0.08)}
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 object-cover mx-auto rounded-xl border-4 border-green-700 shadow mb-4"
              />
              <h3 className="mt-2 font-bold text-green-900 text-lg text-center">
                {member.name}
              </h3>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 mb-1 bg-yellow-100 text-green-900">
                {member.role}
              </span>
              {member.dept && (
                <p className="text-green-700 text-xs font-medium mb-1">
                  {member.dept}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action / Contact */}
      <section className="max-w-3xl mx-auto py-16 px-4 text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp(0)}
          className="text-3xl font-bold text-green-800 mb-4"
        >
          Want to Connect or Learn More?
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp(0.1)}
          className="text-lg text-green-700 mb-8"
        >
          Reach out to us for more information, partnership opportunities, or to
          join our mission for a better Punjab.
        </motion.p>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.08 }}
          className="inline-block bg-green-700 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:bg-green-600 transition text-lg"
        >
          Contact Us
        </motion.a>
      </section>
    </main>
  );
}
