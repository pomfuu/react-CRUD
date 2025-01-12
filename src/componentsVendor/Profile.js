import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState(user);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
    console.log("Updated User Data:", formData);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-5" style={{ fontFamily: "afacad" }}>
      <div className="row">
        <div className="col-md-6">
          <h2 style={{ marginBottom: "1vw", color: "#1A47BC", fontFamily: 'afacad' }}>Vendor Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your address"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your city"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobilenumber" className="form-label">Mobile Number</label>
              <input
                type="text"
                name="mobilenumber"
                id="mobilenumber"
                value={formData.mobilenumber}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your mobile number"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postalcode" className="form-label">Postal Code</label>
              <input
                type="text"
                name="postalcode"
                id="postalcode"
                value={formData.postalcode}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your postal code"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Update Profile
            </button>
          </form>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Profile Updated</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>Your profile information has been updated successfully.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
