const express = require("express");
const router = express.Router();
const Concontroller = require("../controller/controller");

const path = require("path");
const multer = require("multer");
 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload/images');
  },
  filename: (req, file, cb) => {
   cb(null, file.originalname);
  }
});
// const upload1 = multer({
//     storage: storage,
//     limits: { fileSize: 10 * 1024 * 1024 }
//   }).array('imagePaths', 10);
   
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }
  }).fields([
    { name: 'post_profile', maxCount: 1 },
    { name: 'post_bg_profile', maxCount: 1 },
    { name: 'con_profile_image_url', maxCount: 1 },

  ]);
    const uploadStorage = upload;
  
router.post('/userRegister', Concontroller.userRegistration);
router.post('/userlogin', Concontroller.userLoginDetails);
router.post('/insertMembersDetails',uploadStorage, Concontroller.insertMembersDetails);
router.post('/requestDetails', uploadStorage, Concontroller.insertRequestDetails)





/**
* @swagger
* /api/v1/userRegister:
*   post:
*     tags:
*       - userController
*     summary: Used to insert products
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               user_name:
*                 type: string
*               user_password:
*                 type: string
*               user_email:
*                 type: string
*     responses:
*       '200':
*         description: Data Inserted Successfully.
*       '400':
*         description: Bad request - Missing or invalid parameters
*/

// --------------------------
 
/**
* @swagger
* /api/v1/userlogin:
*   post:
*     tags:
*       - userController
*     summary: User login endpoint
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               user_email:
*                 type: string
*               user_password:
*                 type: string
*     responses:
*       '200':
*         description: User logged in successfully
*       '400':
*         description: Bad request - Missing or invalid parameters
*/


/**
* @swagger
* /api/v1/insertMembersDetails:
*   post:
*     tags:
*       - userController
*     summary: Used to insert details
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               user_id:
*                 type: integer
*               post_content:
*                 type: string
*               post_profile:
*                 type: string
*                 format: binary
*               post_bg_profile:
*                 type: string
*                 format: binary
*     responses:
*       '201':
*         description: Members details inserted successfully.
*       '400':
*         description: Bad request - Missing or invalid parameters
*       '500':
*         description: Internal server error
*/
 

/**
* @swagger
* /api/v1/requestDetails:
*   post:
*     tags:
*       - userController
*     summary: Used to insert request details
*     consumes:
*       - multipart/form-data
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               conProfileImage:
*                 type: string
*                 format: binary
*               conFullName:
*                 type: string
*               conProfession:
*                 type: string
*               mutualConnections:
*                 type: integer
*     responses:
*       '201':
*         description: Data Inserted Successfully.
*       '400':
*         description: Bad request - Missing or invalid parameters
*/
module.exports = router;