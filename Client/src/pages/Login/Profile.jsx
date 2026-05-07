import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "@/components/context/ShopContext";
import { backendurl } from "@/App";
import { FaCamera, FaUserEdit } from "react-icons/fa";
import {
  MdEmail,
  MdLocationOn,
  MdPhone,
} from "react-icons/md";

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

  const hasProfileData =
    profileData.phone ||
    profileData.address ||
    profileData.city ||
    profileData.pincode;

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

        if (
          user.phone ||
          user.address ||
          user.city ||
          user.pincode
        ) {
          setEditMode(false);
        } else {
          setEditMode(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    try {
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
    <div className="min-h-screen bg-[#faf7f4] px-4 py-8">

      <div className="max-w-6xl mx-auto">

        <div className="grid lg:grid-cols-[320px_1fr] gap-6">

          {/* LEFT CARD */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-fit">

            <div className="flex flex-col items-center text-center">

              {/* IMAGE */}
              <label className="relative group cursor-pointer">

                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : profileData.image ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt=""
                  className="w-36 h-36 rounded-full object-cover border-4 border-orange-100 shadow-md"
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
                      onChange={(e) =>
                        setImage(e.target.files[0])
                      }
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

              {/* BUTTON */}
              <button
                onClick={() => {
                  if (editMode) {
                    updateProfile();
                  } else {
                    setEditMode(true);
                  }
                }}
                className="mt-6 w-full bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-2xl text-sm font-medium shadow-md flex items-center justify-center gap-2"
              >
                <FaUserEdit />
                {hasProfileData
                  ? editMode
                    ? "Save Profile"
                    : "Edit Profile"
                  : "Save Profile"}
              </button>

            </div>

            {/* QUICK INFO */}
            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3 bg-orange-50 rounded-2xl p-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-orange-500 shadow-sm">
                  <MdPhone />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Phone
                  </p>

                  <p className="text-sm font-medium text-gray-800">
                    {profileData.phone || "Not added"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-orange-50 rounded-2xl p-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-orange-500 shadow-sm">
                  <MdLocationOn />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    City
                  </p>

                  <p className="text-sm font-medium text-gray-800">
                    {profileData.city || "Not added"}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">

            <div className="mb-8">

              <h1 className="text-3xl font-bold text-gray-900">
                Personal Information
              </h1>

              <p className="text-gray-500 text-sm mt-1">
                Manage your personal details and address
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* NAME */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Full Name
                </label>

                <input
                  type="text"
                  value={profileData.name || ""}
                  readOnly={!editMode && hasProfileData}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      name: e.target.value,
                    })
                  }
                  className="w-full mt-2 bg-[#fafafa] border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-orange-400 transition"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email
                </label>

                <input
                  type="email"
                  value={profileData.email || ""}
                  readOnly
                  className="w-full mt-2 bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3 outline-none"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Phone Number
                </label>

                <input
                  type="text"
                  value={profileData.phone || ""}
                  readOnly={!editMode && hasProfileData}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      phone: e.target.value,
                    })
                  }
                  className="w-full mt-2 bg-[#fafafa] border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-orange-400 transition"
                />
              </div>

              {/* CITY */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  City
                </label>

                <input
                  type="text"
                  value={profileData.city || ""}
                  readOnly={!editMode && hasProfileData}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      city: e.target.value,
                    })
                  }
                  className="w-full mt-2 bg-[#fafafa] border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-orange-400 transition"
                />
              </div>

              {/* ADDRESS */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600">
                  Address
                </label>

                <textarea
                  rows="4"
                  value={profileData.address || ""}
                  readOnly={!editMode && hasProfileData}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      address: e.target.value,
                    })
                  }
                  className="w-full mt-2 bg-[#fafafa] border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-orange-400 resize-none transition"
                />
              </div>

              {/* PINCODE */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Pincode
                </label>

                <input
                  type="text"
                  value={profileData.pincode || ""}
                  readOnly={!editMode && hasProfileData}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      pincode: e.target.value,
                    })
                  }
                  className="w-full mt-2 bg-[#fafafa] border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-orange-400 transition"
                />
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;