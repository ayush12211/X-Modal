import { useState, useRef } from "react";
import "./App.css"

function XModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const modalRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, phone, dob } = formData;

    // Email validation
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // Phone validation
    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // DOB validation (future date)
    if (new Date(dob) > new Date()) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // Reset on success
    setFormData({
      username: "",
      email: "",
      phone: "",
      dob: "",
    });
    setIsOpen(false);
  };

  return (
    <>
  <h1
    style={{
      position: "absolute",
      top: "20px",
      left: "500px",
    }}
  >
    User details Modal
  </h1>

  {!isOpen && (
    <button style={{
      position: "absolute",
      top: "400px",
      left: "640px",
    }} onClick={() => setIsOpen(true)}>Open Form</button>
  )}

  {isOpen && (
    <div
      className="modal"
      onClick={() => setIsOpen(false)}   // 👈 outside click closes modal
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // 👈 prevent inside click
      >
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              id="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Phone Number:</label>
            <input
              id="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Date of Birth:</label>
            <input
              id="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  )}
</>

  );
}

export default XModal;
