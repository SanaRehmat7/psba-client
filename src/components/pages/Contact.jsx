import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get("name");
    alert(`Thanks for contacting us, ${name}`);
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 sm:p-12">
      <div className="w-full max-w-3xl mx-auto mb-10">
        <div className="bg-green-700 rounded-2xl px-8 py-6 shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-2">
            Get in Touch
          </h2>
        </div>
      </div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{
            boxShadow: "0 8px 32px 0 rgba(128,128,128,0.25)",
            borderColor: "#facc15",
          }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 border-2 border-transparent relative"
        >
          <h2 className="text-2xl text-center font-bold mb-6 text-[#0f6419]">
            Contact Information
          </h2>
          <div className="space-y-4 text-gray-800">
            <p className="flex items-center gap-2">
              <span className="bg-[#12861f] text-white rounded-full p-2">
                <MapPin className="text-white" />
              </span>
              Plot 41-B, Civic Center, M.A. Johar Town, Lahore
            </p>
            <p className="flex items-center gap-2">
              <span className="bg-[#12861f] text-white rounded-full p-2">
                <Mail className="text-white" />
              </span>
              info@psba.gop.pk
            </p>
            <p className="flex items-center gap-2">
              <span className="bg-[#12861f] text-white rounded-full p-2">
                <Phone className="text-white" />
              </span>
              +92-(42)-99001000
            </p>
            <p className="flex items-center gap-2">
              <span className="bg-[#12861f] text-white rounded-full p-2">
                <Phone className="text-white" />
              </span>
              Inquiry: +92 (308) 0800222
            </p>
            <p className="flex items-center gap-2">
              <span className="bg-[#12861f] text-white rounded-full p-2">
                <Phone className="text-white" />
              </span>{" "}
              UAN: 042-111-176-262
            </p>
            <motion.a
              href="https://maps.app.goo.gl/JwJLJz8CdPpUvAYN9"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95, rotate: -1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="block w-full text-center bg-[#12861f] text-white mt-14 py-3 rounded-lg text-lg font-semibold relative overflow-hidden shadow-md hover:shadow-xl"
            >
              View on Google Maps
            </motion.a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileHover={{
            boxShadow: "0 8px 32px 0 rgba(128,128,128,0.25)",
            borderColor: "#facc15",
          }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border-2 border-transparent relative"
        >
          <h2 className="text-2xl text-center font-bold text-[#0f6419]">
            Send Us a Message
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full border border-gray-300 p-3 rounded focus:outline-[#12861f]"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full border border-gray-300 p-3 rounded focus:outline-[#12861f]"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows="5"
            className="w-full border border-gray-300 p-3 rounded focus:outline-[#12861f]"
          ></textarea>

          <motion.button
            whileTap={{ scale: 0.95, rotate: -1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            type="submit"
            className="w-full bg-[#12861f] text-white py-3 rounded-lg text-lg font-semibold relative overflow-hidden shadow-md hover:shadow-xl"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
