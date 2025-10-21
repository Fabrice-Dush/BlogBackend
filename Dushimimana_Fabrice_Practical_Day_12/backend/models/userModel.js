import crypto from "crypto";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email address"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: { validator: validator.isEmail, message: "Wrong email format" },
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      trim: true,
      minLength: [10, "Password must be at least 8 characters long"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      trim: true,
      validate: {
        validator: function (val) {
          return this.password === val;
        },
        message: "Password and Password confirmation must be the same",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    photo: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    role: {
      type: String,
      enum: ["admin", "user", "creator"],
      default: "user",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//? Virtual properties | Middlewares | instance methods goes here(before we create model)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  //? hash the password
  this.password = await bcrypt.hash(this.password, 10);

  //? delete passwordConfirm field
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });

  next();
});

userSchema.methods.verifyPassword = async function (
  inputPassword,
  hashedPassword
) {
  const isCorrect = await bcrypt.compare(inputPassword, hashedPassword);
  return isCorrect;
};

userSchema.methods.passwordChangedAfter = function (tokenIssuedAt) {
  if (!this.passwordChangedAt) return false;

  const passwordChangedAt = new Date(this.passwordChangedAt).getTime() / 1000;

  return passwordChangedAt > tokenIssuedAt;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
