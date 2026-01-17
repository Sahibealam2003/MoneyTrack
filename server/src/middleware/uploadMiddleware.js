//Configures Multer to safely upload images with type, size limits, unique names, stored in uploads.
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
         cb(null, path.join(__dirname, "../uploads"))
    },
    filename: (req, file, cb) => {
  const safeName = file.originalname.replace(/\s+/g, "-")
  cb(null, `${Date.now()}-${safeName}`)
}

})

const fileFilter = (req,file,cb)=>{
    const allowedFiles = ['image/jpeg','image/png', 'image/jpg']
    if(allowedFiles.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error('Only .jpeg ,.jpg and .png formate support'),false)
    }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
})

module.exports = upload;