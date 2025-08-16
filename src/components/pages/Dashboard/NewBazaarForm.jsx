import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Add this import
import { toast } from "react-toastify"; // Add this import

const NewBazaarForm = () => {
  const { user, loading } = useAuth(); // Use useAuth
  const navigate = useNavigate();

  // Initial form state
  const getInitialFormState = () => ({
    id: uuidv4(),
    name: "",
    district: user?.district || "",
    location: "",
    google_maps: "",
    area: "",
    stalls: "",
    established: "",
    operational_days: [],
    timings: "",
    facilities: [],
    special_days: [],
    focal_person: "",
    contact: { phone: "", email: "", helpline: "" },
    Joyland_timings: "",
    description: "",
    prices: [{ item: "", price: "", unit: "" }],
  });

  const [formData, setFormData] = useState(getInitialFormState());
  const [newFacility, setNewFacility] = useState("");
  const [newSpecialDay, setNewSpecialDay] = useState("");
  const [status, setStatus] = useState({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle loading and auth
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle contact fields
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [name]: value },
    }));
  };

  // Handle price changes
  const handlePriceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPrices = [...formData.prices];
    updatedPrices[index] = {
      ...updatedPrices[index],
      [name]: name === "price" ? parseFloat(value) || "" : value,
    };
    setFormData((prev) => ({ ...prev, prices: updatedPrices }));
  };

  // Add/remove price fields
  const addPriceField = () => {
    setFormData((prev) => ({
      ...prev,
      prices: [...prev.prices, { item: "", price: "", unit: "" }],
    }));
  };

  const removePriceField = (index) => {
    if (formData.prices.length <= 1) return;
    const updatedPrices = formData.prices.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, prices: updatedPrices }));
  };

  // Handle operational days
  const handleDayToggle = (day) => {
    setFormData((prev) => {
      const updatedDays = prev.operational_days.includes(day)
        ? prev.operational_days.filter((d) => d !== day)
        : [...prev.operational_days, day];
      return { ...prev, operational_days: updatedDays };
    });
  };

  // Add facilities
  const addFacility = () => {
    if (newFacility.trim()) {
      setFormData((prev) => ({
        ...prev,
        facilities: [...prev.facilities, newFacility.trim()],
      }));
      setNewFacility("");
    }
  };

  // Add special days
  const addSpecialDay = () => {
    if (newSpecialDay.trim()) {
      setFormData((prev) => ({
        ...prev,
        special_days: [...prev.special_days, newSpecialDay.trim()],
      }));
      setNewSpecialDay("");
    }
  };

  // Remove facilities/special days
  const removeFacility = (index) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.filter((_, i) => i !== index),
    }));
  };

  const removeSpecialDay = (index) => {
    setFormData((prev) => ({
      ...prev,
      special_days: prev.special_days.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: "", type: "" });

    try {
      // Basic validation
      if (!formData.name.trim()) throw new Error("Bazaar name is required");
      if (!formData.district.trim()) throw new Error("District is required");
      if (!formData.location.trim()) throw new Error("Location is required");
      if (!formData.google_maps.trim())
        throw new Error("Google Maps URL is required");
      if (!formData.description.trim())
        throw new Error("Description is required");
      if (!formData.contact.phone.trim())
        throw new Error("Contact phone is required");
      if (!formData.timings.trim()) throw new Error("Timings are required");
      if (
        formData.prices.some(
          (p) => !p.item.trim() || !p.unit.trim() || p.price === ""
        )
      ) {
        throw new Error("All price fields (item, price, unit) are required");
      }

      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      // Convert numeric fields
      const payload = {
        ...formData,
        stalls: formData.stalls ? parseInt(formData.stalls) : null,
        established: formData.established
          ? parseInt(formData.established)
          : null,
        prices: formData.prices.map((price) => ({
          ...price,
          price: parseFloat(price.price) || 0,
        })),
      };

      console.log("Form Data:", payload);
      const response = await axios.post(
        "http://localhost:5000/api/bazaars/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStatus({
        message: `Bazaar "${
          response.data.name || formData.name
        }" created successfully!`,
        type: "success",
      });
      toast.success("Bazaar submitted for approval!");
      setFormData(getInitialFormState());
      navigate("/dashboard");
    } catch (error) {
      console.error("Submission error:", error);
      console.error("Response data:", error.response?.data);
      let errorMsg = "Failed to submit bazaar";
      if (error.response) {
        errorMsg =
          error.response.data?.msg ||
          error.response.data?.error ||
          error.message;
        if (error.response.status === 401) {
          errorMsg = "Unauthorized. Please log in again.";
          navigate("/login");
        } else if (error.response.status === 403) {
          errorMsg = "You do not have permission to perform this action.";
        }
      } else if (error.request) {
        errorMsg =
          "Cannot connect to the server. Please check if the backend is running.";
      }
      setStatus({ message: `Error: ${errorMsg}`, type: "error" });
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Days of the week
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-4 max-w-3xl mx-auto bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create New Bazaar
      </h2>

      {/* Status Message */}
      {status.message && (
        <div
          className={`p-4 rounded ${
            status.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status.message}
        </div>
      )}

      {/* Hidden ID field */}
      <input type="hidden" name="id" value={formData.id} />

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium">Bazaar Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">District*</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              user?.district ? "bg-gray-100" : ""
            }`}
            readOnly={!!user?.district}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Location*</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Google Maps URL</label>
          <input
            type="url"
            name="google_maps"
            value={formData.google_maps}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="https://maps.google.com/..."
          />
        </div>
      </div>

      {/* Operational Details */}
      <div className="border-t pt-4 mt-6">
        <h3 className="text-xl font-semibold mb-4">Operational Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Area (sq ft)</label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Number of Stalls</label>
            <input
              type="number"
              name="stalls"
              value={formData.stalls}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Established Year</label>
            <input
              type="number"
              name="established"
              value={formData.established}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Timings*</label>
            <input
              type="text"
              name="timings"
              value={formData.timings}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="9:00 AM - 8:00 PM"
              required
            />
          </div>
        </div>

        {/* Operational Days */}
        <div className="mt-4">
          <label className="block mb-2 font-medium">Operational Days*</label>
          <div className="flex flex-wrap gap-3">
            {daysOfWeek.map((day) => (
              <label key={day} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.operational_days.includes(day)}
                  onChange={() => handleDayToggle(day)}
                  className="rounded"
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Facilities & Special Days */}
      <div className="border-t pt-4 mt-6">
        <h3 className="text-xl font-semibold mb-4">Features</h3>

        {/* Facilities */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Facilities</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newFacility}
              onChange={(e) => setNewFacility(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Add facility"
            />
            <button
              type="button"
              onClick={addFacility}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.facilities.map((facility, index) => (
              <div
                key={index}
                className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
              >
                <span>{facility}</span>
                <button
                  type="button"
                  onClick={() => removeFacility(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Special Days */}
        <div>
          <label className="block mb-2 font-medium">Special Market Days</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newSpecialDay}
              onChange={(e) => setNewSpecialDay(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Add special day"
            />
            <button
              type="button"
              onClick={addSpecialDay}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.special_days.map((day, index) => (
              <div
                key={index}
                className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
              >
                <span>{day}</span>
                <button
                  type="button"
                  onClick={() => removeSpecialDay(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="border-t pt-4 mt-6">
        <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Focal Person</label>
            <input
              type="text"
              name="focal_person"
              value={formData.focal_person}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Contact Phone*</label>
            <input
              type="tel"
              name="phone"
              value={formData.contact.phone}
              onChange={handleContactChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.contact.email}
              onChange={handleContactChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Helpline</label>
            <input
              type="tel"
              name="helpline"
              value={formData.contact.helpline}
              onChange={handleContactChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="border-t pt-4 mt-6">
        <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Joyland Timings</label>
            <input
              type="text"
              name="Joyland_timings"
              value={formData.Joyland_timings}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Special timings for holidays"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Price Information */}
      <div className="border-t pt-4 mt-6">
        <h3 className="text-xl font-semibold mb-4">Price Information</h3>
        {formData.prices.map((price, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 items-end"
          >
            <div className="md:col-span-5">
              <label className="block mb-2 font-medium">Item Name</label>
              <input
                type="text"
                name="item"
                value={price.item}
                onChange={(e) => handlePriceChange(index, e)}
                className="w-full p-2 border rounded"
                placeholder="e.g., Apples"
                required
              />
            </div>
            <div className="md:col-span-3">
              <label className="block mb-2 font-medium">Price (PKR)</label>
              <input
                type="number"
                name="price"
                value={price.price}
                onChange={(e) => handlePriceChange(index, e)}
                className="w-full p-2 border rounded"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="md:col-span-3">
              <label className="block mb-2 font-medium">Unit</label>
              <input
                type="text"
                name="unit"
                value={price.unit}
                onChange={(e) => handlePriceChange(index, e)}
                className="w-full p-2 border rounded"
                placeholder="e.g., kg, dozen"
                required
              />
            </div>
            <div className="md:col-span-1">
              <button
                type="button"
                onClick={() => removePriceField(index)}
                className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
                disabled={formData.prices.length <= 1}
              >
                ×
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addPriceField}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add Price Item
        </button>
      </div>

      {/* Form Submission */}
      <div className="border-t pt-6 mt-8 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-600 text-white px-6 py-2 rounded font-medium ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Creating..." : "Create Bazaar"}
        </button>
      </div>
    </form>
  );
};

export default NewBazaarForm;
