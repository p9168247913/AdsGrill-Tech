const express = require('express');
const multer = require('multer');
const { validateRegister } = require('../middlewares/validationMiddleware');
const { register, login } = require('../controllers/authController');
const path = require("path")

const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
    // if (file.fieldname === "profilePic" || file.fieldname === "cv") {
    //   cb(null, true);
    // } else {
    //   cb(new Error(`"${file.fieldname}" is not allowed`));
    // }
  },
});

router.post('/register', upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'cv', maxCount: 1 }]), validateRegister, register);

router.post('/login', login);

module.exports = router;
