import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "@/components/context/ShopContext";
import { backendurl } from "@/App";
import { FaCamera, FaUserEdit } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Profile = () => {
  const { token } = useContext(ShopContext);

  const [editMode, setEditMode] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    image: "",
  });

  const [image, setImage] = useState(null);

  const loadProfile = async () => {
    try {
      const response = await axios.get(
        backendurl + "/api/user/profile",
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        const user = response.data.user;

        setProfileData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || "",
          city: user.city || "",
          pincode: user.pincode || "",
          image: user.image || "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    try {

      // PHONE VALIDATION
      if (
        profileData.phone &&
        profileData.phone.length !== 10
      ) {
        toast.error("Phone number must be exactly 10 digits");
        return;
      }

      // PINCODE VALIDATION
      if (
        profileData.pincode &&
        profileData.pincode.length !== 6
      ) {
        toast.error("Pincode must be exactly 6 digits");
        return;
      }

      const formData = new FormData();

      formData.append("name", profileData.name);
      formData.append("phone", profileData.phone);
      formData.append("address", profileData.address);
      formData.append("city", profileData.city);
      formData.append("pincode", profileData.pincode);

      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        backendurl + "/api/user/update-profile",
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile Updated");
        setEditMode(false);
        loadProfile();
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      loadProfile();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-[#faf7f4] px-4 py-10">

      <div className="max-w-md mx-auto">

        {/* HEADING */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="text-gray-500 text-sm mt-2">
            Manage your personal information
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-[30px] p-6 shadow-lg border border-orange-100 relative overflow-hidden">

          {/* TOP BACKGROUND */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-orange-400 to-orange-500"></div>

          {/* EDIT BUTTON */}
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white shadow-md hover:scale-105 transition flex items-center justify-center text-orange-500"
            >
              <FaUserEdit />
            </button>
          )}

          {/* PROFILE */}
          <div className="relative z-10 flex flex-col items-center">

            {/* IMAGE */}
            <label className="relative group cursor-pointer mt-10">

              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : profileData.image ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt=""
                className="w-36 h-36 rounded-full object-cover border-[6px] border-white shadow-xl"
              />

              {editMode && (
                <>
                  <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <FaCamera className="text-white text-2xl" />
                  </div>

                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </>
              )}

            </label>

            {/* NAME */}
            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              {profileData.name || "User"}
            </h2>

            {/* EMAIL */}
            <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
              <MdEmail />
              {profileData.email}
            </div>

          </div>

          {/* DETAILS */}
          <div className="mt-10 space-y-5">

            {/* FULL NAME */}
            {editMode && (
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Full Name
                </label>

                <input
                  type="text"
                  value={profileData.name || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      name: e.target.value,
                    })
                  }
                  className="w-full mt-2 bg-[#fafafa] border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-orange-400 transition"
                />
              </div>
            )}

            {/* PHONE */}
            {editMode ? (
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Phone Number
                </label>

                <input
                  type="text"
                  value={profileData.phone || ""}
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    setProfileData({
                      ...profileData,
                      phone: value,
                    });
                  }}
                  className="w-full mt-2 bg-[#fafafa] border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-orange-400 transition"
                />
              </div>
            ) : (
              <div className="flex items-center gap-4 bg-[#f5eee6] rounded-3xl p-4">
                <div className="w-14 h-14 rounded-2xl bg-white shadow flex items-center justify-center text-orange-500 text-xl">
                  ☎
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Phone
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900">
                    {profileData.phone || "Not added"}
                  </h3>
                </div>
              </div>
            )}

            {/* CITY */}
            {editMode ? (
              <div>
                <label className="text-sm font-medium text-gray-600">
                  City
                </label>

                <input
                  type="text"
                  value={profileData.city || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      city: e.target.value,
                    })
                  }
                  className="w-full mt-2 bg-[#fafafa] border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-orange-400 transition"
                />
              </div>
            ) : (
              <div className="flex items-center gap-4 bg-[#f5eee6] rounded-3xl p-4">
                <div className="w-14 h-14 rounded-2xl bg-white shadow flex items-center justify-center text-orange-500 text-xl">
                  📍
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    City
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900">
                    {profileData.city || "Not added"}
                  </h3>
                </div>
              </div>
            )}

            {/* ADDRESS */}
            {editMode ? (
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Address
                </label>

                <textarea
                  rows="3"
                  value={profileData.address || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      address: e.target.value,
                    })
                  }
                  className="w-full mt-2 bg-[#fafafa] border border-gray-200 rounded-2xl px-4 py-3 outline-none resize-none focus:border-orange-400 transition"
                />
              </div>
            ) : (
              <div className="flex items-center gap-4 bg-[#f5eee6] rounded-3xl p-4">
                <div className="w-14 h-14 rounded-2xl bg-white shadow flex items-center justify-center text-orange-500 text-xl">
                  🏠
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Address
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 break-words">
                    {profileData.address || "Not added"}
                  </h3>
                </div>
              </div>
            )}

            {/* PINCODE */}
            {editMode ? (
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Pincode
                </label>

                <input
                  type="text"
                  value={profileData.pincode || ""}
                  maxLength={6}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    setProfileData({
                      ...profileData,
                      pincode: value,
                    });
                  }}
                  className="w-full mt-2 bg-[#fafafa] border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-orange-400 transition"
                />
              </div>
            ) : (
              <div className="flex items-center gap-4 bg-[#f5eee6] rounded-3xl p-4">
                <div className="w-14 h-14 rounded-2xl bg-white shadow flex items-center justify-center text-orange-500 text-xl">
                  📮
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Pincode
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900">
                    {profileData.pincode || "Not added"}
                  </h3>
                </div>
              </div>
            )}

            {/* SAVE BUTTON */}
            {editMode && (
              <button
                onClick={updateProfile}
                className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-2xl text-sm font-semibold shadow-lg"
              >
                Save Profile
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;