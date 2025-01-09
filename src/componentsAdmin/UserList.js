import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

function UserList() {
  const [banners, setBanners] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingUserIndex, setEditingUserIndex] = useState(null);
  const [editingBannerIndex, setEditingBannerIndex] = useState(null);
  const [editedRole, setEditedRole] = useState("");
  const [editedBannerUrl, setEditedBannerUrl] = useState("");

  // Fetch banners
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Banner'));
        const bannerData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBanners(bannerData);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Users'));
        const userData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Banner Editing Handlers
  const handleEditBanner = (index) => {
    setEditingBannerIndex(index);
    setEditedBannerUrl(banners[index].bannerUrl);
  };

  const handleSaveBanner = async (id) => {
    try {
      const bannerRef = doc(db, 'Banner', id);
      await updateDoc(bannerRef, { bannerUrl: editedBannerUrl });
      const updatedBanners = banners.map((banner, idx) =>
        idx === editingBannerIndex ? { ...banner, bannerUrl: editedBannerUrl } : banner
      );
      setBanners(updatedBanners);
      setEditingBannerIndex(null);
    } catch (error) {
      console.error("Error updating banner URL:", error);
    }
  };

  const handleCancelBannerEdit = () => {
    setEditingBannerIndex(null);
    setEditedBannerUrl("");
  };

  // User Role Editing Handlers
  const handleEditUser = (index) => {
    setEditingUserIndex(index);
    setEditedRole(users[index].role);
  };

  const handleSaveUserRole = async (id) => {
    try {
      const userRef = doc(db, 'Users', id);
      await updateDoc(userRef, { role: editedRole });
      const updatedUsers = users.map((user, idx) =>
        idx === editingUserIndex ? { ...user, role: editedRole } : user
      );
      setUsers(updatedUsers);
      setEditingUserIndex(null);
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleCancelUserEdit = () => {
    setEditingUserIndex(null);
    setEditedRole("");
  };

  return (
    <div style={{ marginLeft: "20%", marginTop: "2%", maxWidth: "60%" }}>
      <h2 style={{ marginBottom: "1vw", color: "#1A47BC", fontFamily: 'afacad' }}>Admin Dashboard</h2>

      {/* Banner Section */}
      <div>
        <h2 className="fs-4" style={{ marginBottom: "1vw" }}>Banner</h2>
        <table className="table table-bordered  mb-5">
          <thead>
            <tr>
              <th>Slide</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner, index) => (
              <tr key={banner.id}>
                <td>Slide {index + 1}</td>
                <td>
                  {editingBannerIndex === index ? (
                    <input
                      type="text"
                      value={editedBannerUrl}
                      onChange={(e) => setEditedBannerUrl(e.target.value)}
                      className="form-control"
                    />
                  ) : (
                    <img
                      src={banner.bannerUrl}
                      alt={`Slide ${index + 1}`}
                      style={{ width: "150px", height: "auto", borderRadius: "5px" }}
                    />
                  )}
                </td>
                <td>
                  {editingBannerIndex === index ? (
                    <>
                      <button onClick={() => handleSaveBanner(banner.id)} className="btn btn-primary me-2">Save</button>
                      <button onClick={handleCancelBannerEdit} className="btn btn-secondary">Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEditBanner(index)} className="btn btn-primary">Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User List Section */}
      <div>
        <h2 className="fs-4" style={{ marginBottom: "1vw" }}>User List</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>
                  {editingUserIndex === index ? (
                    <select
                      value={editedRole}
                      onChange={(e) => setEditedRole(e.target.value)}
                      className="form-select"
                    >
                      <option value="admin">Admin</option>
                      <option value="vendor">Vendor</option>
                      <option value="user">User</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td>
                  {editingUserIndex === index ? (
                    <>
                      <button onClick={() => handleSaveUserRole(user.id)} className="btn btn-primary me-2">Save</button>
                      <button onClick={handleCancelUserEdit} className="btn btn-secondary">Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEditUser(index)} className="btn btn-primary">Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
