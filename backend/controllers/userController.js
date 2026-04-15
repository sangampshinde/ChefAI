import User from "../model/User.js";
import UserPreferences from "../model/UserPreferences.js";

/**
 * Get user profile
 */
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const preferences = await UserPreferences.findByUserId(req.user.id);

    return res.json({
      success: true,
      data: {
        user,
        preferences,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    next(error);
  }
};

/**
 * Update user profile
 */

export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const user = await User.update(req.user.id, { name, email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      message: "Profile updated successfully",
      data: { user },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    next(error);
  }
};

/**
 * Update user preferences
 */
export const updatePreferences = async (req, res, next) => {
  try {
    const preferences = await UserPreferences.upsert(req.user.id, req.body);

    return res.json({
      success: true,
      message: "Preferences updated successfully",
      data: { preferences },
    });
  } catch (error) {
    console.error("Update preferences error:", error);
    next(error);
  }
};

/**
 * Change password
 */

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current and new password",
      });
    }

    // Get user
    const user = await User.findById(req.user.id);

    // Verify current password
    const isValid = await User.verifyPassword(
      currentPassword,
      user.password_hash
    );

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    await User.updatePassword(req.user.id, newPassword);

    return res.json({
      success: true,
      message: 'Password updated successfully'
    });

  } catch (error) {

    console.error('Change password error:', error);
    next(error);

  }
};

/**
 * Delete account
 */

export const deleteAccount = async (req, res, next) => {
    
  try {
    const deleted = await User.delete(req.user.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.json({
      success: true,
      message: 'Account deleted successfully'
    });

  } catch (error) {
    console.error('Delete account error:', error);
    next(error);
  }
};