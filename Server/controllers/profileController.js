import userModel from "../models/userModels.js";

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
      updatedData.image = req.file.path;
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