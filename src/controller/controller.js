const Conmodel = require("../model/model");
const dbConn = require("../../config/configuration");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const secretKey = () => {
  return CryptoJS.lib.WordArray.random(32).toString();
};
const userRegistration = async (req, res) => {
  const { user_name, user_password, user_email } = req.body;


  if (!user_name || !user_password || !user_email) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {

    const hashedPassword = CryptoJS.SHA256(user_password).toString(CryptoJS.enc.Hex);
    const results = await Conmodel.registerUser(user_name, hashedPassword, user_email);

    if (results && results[0] && results[0][0] && results[0][0][0] && results[0][0][0].message === "Email already exists. Please use a different email.") {
      return res.status(409).json({
        success: false,
        error: true,
        message: results[0][0][0].message
      });
    }
    else if (results && results[0] && results[0][0] && results[0][0][0] && results[0][0][0].message === "Username already exists. Please choose a different username.") {
      return res.status(409).json({
        success: false,
        error: true,
        message: results[0][0][0].message
      });
    } else {
      res.status(200).json({
        success: true,
        error: false,
        message: "User registered successfully",
        //token: token 
      });
    }

    //const newUser = results; 
    //const secretKeys = secretKey(); 
    //const token = jwt.sign({ p_u_username: newUser.p_u_username, p_u_email: newUser.p_u_email }, secretKeys, { expiresIn: '1h' });


  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error: " + err.message
    });
  }
};


// ===============================================================================
const userLoginDetails = async (req, res) => {
  const { user_email, user_password } = req.body;

  if (!user_email || !user_password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    const hashedPassword = CryptoJS.SHA256(user_password).toString(CryptoJS.enc.Hex);
    console.log('Hashed Password:', hashedPassword, user_password);

    const results = await Conmodel.userLoginDetails(user_email, hashedPassword);
    const user = results[0][0];
    console.log(results[0][0], "result1234565");

    if (user && user.length > 0 && user[0].user_password === hashedPassword) {
      const userInfo = user[0];
      const secretKeys = secretKey();
      const token = jwt.sign({ user_email: userInfo.user_email }, secretKeys, { expiresIn: '1h' });

      res.status(200).json({
        success: true,
        error: false,
        message: "Login successful",
        user: userInfo,
        token: token
      });
    } else if (user[0].result === 'User is not active') {
      res.status(401).json({
        success: false,
        error: true,
        message: user[0].result
      });
    } else if (user[0].result === 'Invalid email or password') {
      res.status(400).json({
        success: false,
        error: true,
        message: user[0].result
      });
    }

  } catch (err) {
    console.error("Error executing login query:", err);
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error: " + err.message
    });
  }
};



// =============================================

const insertMembersDetails = async (req, res) => {
  const { user_id, post_content } = req.body;

  console.log(req.body);
  if (!user_id || !post_content) {
    return res.status(400).json({
      success: false,
      error: true,
      message: "Please provide user_id and post_content"
    });
  }

  const post_profile = req.files['post_profile'] ? req.files['post_profile'][0] : null;
  const post_bg_profile = req.files['post_bg_profile'] ? req.files['post_bg_profile'][0] : null;

  if (!post_profile || !post_bg_profile) {
    return res.status(400).json({
      success: false,
      error: true,
      message: "Please upload both images."
    });
  }

  try {
    const details = await Conmodel.insertMembersDetails(user_id, post_content, post_profile.path, post_bg_profile.path);
    console.log(details[0], "details1234");

    if (details[0]) {
      return res.status(200).json({
        success: true,
        message: "Members details inserted successfully"
      });
    } else {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Members details not inserted"
      });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error: " + error.message
    });
  }
}

// =============================================================
const insertRequestDetails = async (req, res) => {
  const { con_full_name, con_profession, mutual_connections } = req.body;
  console.log(req.boby);
  const con_profile_image_url = req.files;
  
  try {
    const details = await Conmodel.insertRequestDetails(con_profile_image_url, con_full_name, con_profession, mutual_connections);
    console.log(details, "details1234");
    if (details) {
      return res.status(200).json({
        success: true,
        message: " Details inserted successfully."
      })
    } else {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Members details not inserted"
      });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error: " + error.message
    });

  }
}


module.exports = {
  userRegistration, userLoginDetails, insertMembersDetails, insertRequestDetails
};