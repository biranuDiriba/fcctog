import mongoose, { Schema, model } from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { z } from "zod";
import {
  AvailableSocialLogins,
  AvailableUserRoles,
  UserLoginType,
  UserRolesEnum,
} from "../constants";
import { encrypt } from "../utils/session";
const userSchema = new Schema(
  {
    mustResetPassword: { type: Boolean, default: false },
    firstName: {
      type: String,
      required: [true, "Display name is required"],
      minlength: [2, "Display name must be at least 2 characters"],
      maxlength: [50, "Display name must be less than 50 characters"],
      lowercase: true,
      trim: true,
      index: true,
    },
    lastName: {
      type: String,
      required: [true, "Display name is required"],
      minlength: [2, "Display name must be at least 2 characters"],
      maxlength: [50, "Display name must be less than 50 characters"],
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters"],
      validate: {
        validator: function (v: any) {
          return /[a-z]/.test(v) && /[A-Z]/.test(v) && /[@$!%*?&]/.test(v);
        },
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, and one special character",
      },
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRolesEnum.USER,
      required: true,
    },

    loginType: {
      type: String,
      enum: AvailableSocialLogins,
      default: UserLoginType.EMAIL_PASSWORD,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },

    webPushToken: {
      type: String,
      default: "",
    },
    expoPushToken: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return encrypt(
    {
      _id: this._id,
      firstName: this.firstName,
      email: this.email,
      lastName: this.lastName,
      displayName: this.displayName,
      profilePicture: this.profilePicture,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_EXPIRY
  );
};
userSchema.methods.generateRefreshToken = function () {
  return encrypt(
    {
      _id: this._id,
      firstName: this.firstName,
      email: this.email,
      lastName: this.lastName,
      displayName: this.displayName,
      profilePicture: this.profilePicture,
      role: this.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    process.env.REFRESH_TOKEN_EXPIRY
  );
};

userSchema.methods.generateTemporaryToken = function () {
  const unHashedToken = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");
  const tokenExpiry = process.env.ACCESS_TOKEN_SECRET
    ? Date.now() + process.env.ACCESS_TOKEN_SECRET
    : Date.now() + 20 * 60 * 1000;

  return { unHashedToken, hashedToken, tokenExpiry };
};

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must include a lowercase letter",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must include an uppercase letter",
  })
  .refine((val) => /[#-@$!%*?&,.]/.test(val), {
    message: "Password must include a special character",
  });

const emailSchema = z.string().email("Invalid email format");

const validate = (schema: z.ZodSchema, data: any) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }
  return {
    success: true,
    data: result.data,
  };
};

export const validateEmail = (data: any) => {
  validate(
    z.object({
      email: emailSchema,
    }),
    data
  );
};
export const validateUserReg = (data: any) => {
  validate(
    z.object({
      firstName: z.string().min(2).max(50),
      lastName: z.string().min(2).max(50),
      email: emailSchema,
      password: passwordSchema,
    }),
    data
  );
};
export const validateUserLogIn = (data: any) => {
  validate(
    z.object({
      email: emailSchema,
      password: passwordSchema,
      webPushToken: z.string(),
      expoPushToken: z.string(),
    }),
    data
  );
};
export const validateChangePas = (data: any) => {
  validate(
    z.object({
      oldPassword: passwordSchema,
      newPassword: passwordSchema,
    }),
    data
  );
};
export const validateForgotPas = (data: any) => {
  validate(
    z.object({
      email: emailSchema,
    }),
    data
  );
};
export const validateResetPas = (data: any) => {
  validate(
    z.object({
      newPassword: passwordSchema,
    }),
    data
  );
};

export const validateAssignRole = (data: any) => {
  validate(
    z.object({
      role: z.string().min(8),
    }),
    data
  );
};
export default mongoose.models.User || mongoose.model("User", userSchema);
