const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const catchAsync = require("../utils/catchAsync");

const hashPassword = async (pass) => {
    pass = await bcrypt.hash(pass, 10);
    return pass;
  };
  
const signToken = (id, expiryTime) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: expiryTime === undefined ? process.env.JWT_EXPIRES_IN : expiryTime,
    });
  };

  const createSendToken = (user, statusCode, res, expiryTime) => {
    const token = signToken(user._id, expiryTime);
  
const cookieOptions = {
      expires: new Date(Date.now() + 5 * 24 * 3600000),
      httpOnly: true,
    };
  
    res.cookie("jwt", token, cookieOptions);
    res.status(statusCode).json({
      token: token,
      data: user,
    });
  };

  exports.signup = catchAsync(async (req, res) => {
    const { name, email, displayName,  password } = req.body;
    try {
      let existingUser = await User.findOne({ name: displayName });
      if (existingUser) {
        return res.status(409).json("User already exists with provided displayName!!");
      }
  
      existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(409).json("User already exists with provided email!!");
      }
  
      const hashedPassword = await hashPassword(password);
  
      const newUser = await User.create({ name: name, email: email, displayName: displayName, password: hashedPassword });
      res.status(201).json({
        status: "success",
        message: "User created successfully!",
        data: newUser
      });
  
    } catch (err) {
      if (err.code == 11000) {
        res.status(409).json("User already exists!");
      } else {
        res.status(500).json("Internal server error! Please try again!!");
      }
    }
  });
  

  exports.login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    console.log("Login request for:", email);

    let user = await User.findOne({ email: email });
    if (!user) {
      console.log("User not found by email, trying by name...");
      user = await User.findOne({ name: email });
    }
    if (!user) {
      console.log("User not found!");
      res.status(404).json("User cannot be found!");
      return;
    }

    const isPasswordCorrect = await user.correctPassword(password, user.password);

    if (!isPasswordCorrect) {
      console.log("Incorrect password!");
      res.status(401).json("Incorrect password!!");
    } else {
      console.log("Login successful!");
      createSendToken(user, 200, res, '9999 years');
      return;
    }
});

exports.logout = catchAsync(async (req, res) => {
    return res.status(200).json(null);
  });

  exports.protect = catchAsync(async (req, res, next) => {
    const { authorization } = req.headers;
    let token;
    if (
        authorization &&
        authorization.startsWith("Bearer")
    ) {
        token = authorization.split(" ")[1];
    }
    if (!token || token === "undefined" || token === "null") {
        return next(
            new AppError("You are not logged in!! Please log in to get access", 401)
        );
    }

    try {
        //* 2) verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //* 3) check if user is still exist
        const freshUser = await User.findById(decoded.id);

        if (!freshUser) {
            return next(
                new AppError("The user belonging to this token is not exist", 401)
            );
        }
        req.user = freshUser;
        next();
    } catch (err) {
        if (err.message === "jwt expired") {
            return next(
                new AppError("Your session is expired!! Please log in again", 401)
            );
        }
    }
});