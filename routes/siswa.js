const router = require("express").Router();
const controllers = require("../controllers/siswa");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

const upload = multer({
    storage, 
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if(ext !== ".csv" && ext !== ".xlxs"){
            return cb(new Error("Hanya bisa file csv atau XLXS"));
        }
        cb(null, true);
    }
})


router.get("/", controllers.all); 
router.get("/:nis", controllers.index);
router.put("/:old_nis", controllers.update);
router.delete("/:nis", controllers.delete);
router.post("/", controllers.create);
router.post("/upload", upload.single("csvFile"), controllers.upload);

module.exports = router;
