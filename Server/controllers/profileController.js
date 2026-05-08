import userModel from "../models/userModels.js";
import cloudinary from "../config/cloudinary.js";

export const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    res.json({
      success: true,
      user,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      city,
      address,
      pincode,
    } = req.body;

    const updatedData = {
      name,
      phone,
      city,
      address,
      pincode,
    };

    
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profiles",
      });

      updatedData.image = result.secure_url;
    }

    await userModel.findByIdAndUpdate(
      req.user.id,
      updatedData,
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile Updated",
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};