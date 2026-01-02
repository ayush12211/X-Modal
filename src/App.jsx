import { useState, useEffect } from "react";
import "./App.css";

function XModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  // 🔑 This effect is CRITICAL for Cypress outside-click test
  useEffect(() => {
    const handleOutsideClick = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

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

    // DOB validation
    if (new Date(dob) > new Date()) {
      alert("Invalid date of birth");
      return;
    }

    // Reset to initial render
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
      {/* Heading */}
      <h1
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        User details Modal
      </h1>

      {/* Open Form Button */}
      {!isOpen && (
        <button
          style={{ marginTop: "100px" }}
          onClick={(e) => {
            e.stopPropagation(); // prevent document click
            setIsOpen(true);
          }}
        >
          Open Form
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="modal">
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // 🔥 prevents closing when clicking inside
          >
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  id="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="dob">Date of Birth:</label>
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
