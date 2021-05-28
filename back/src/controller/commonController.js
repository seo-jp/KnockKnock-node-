const commonService = require('../service/commonService')
const multer  = require('multer')
var Jimp = require('jimp');
const fs = require('fs')

exports.getCategory = async (req, res, next) => {
    try {
        let rows = await commonService.getCategory()
        return res.json(rows)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getCategoryByName = async (req, res, next) => {
    let ctgCategory  = '%' + req.params.ctgCategory + '%'
    try {
        let rows = await commonService.getCategoryByName(ctgCategory)
        return res.json(rows)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getKeyword = async (req, res, next) => {
    try {
        let rows = await commonService.getKeyword()
        return res.json(rows)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getKeywordByName = async (req, res, next) => {
    let keyword  = '%' + req.params.keyword + '%'
    try {
        let rows = await commonService.getKeywordByName(keyword)
        return res.json(rows)
    } catch (err) {
        return res.status(500).json(err)
    }
}

//validation

exports.dupliIdCheck = async (req, res, next) => {
    let userId  = req.params.userId
    try {
        let rs = await commonService.dupliIdCheck(userId)
        return res.json(rs)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.dupliPhoneCheck = async (req, res, next) => {
    let phone  = req.params.phone
    try {
        let rs = await commonService.dupliPhoneCheck(phone)
        return res.send(rs)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.dupliMailCheck = async (req, res, next) => {
    let mail  = req.params.mail
    try {
        let rs = await commonService.dupliMailCheck(mail)
        return res.send(rs)
    } catch (err) {
        return res.status(500).json(err)
    }
}


// file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "img/")
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
})

const jimpImages = async(file,styles) => {
    const fileName = `${Date.now()}_${file.originalname}`
    const newFileName = `feed_${fileName}`
    
    await Jimp.read(file.path)
        .then(image => {
            if(styles[2] == 218){
                image            
                .resize(Jimp.AUTO, parseFloat(styles[2]))
                .write(`img/${newFileName}`)
            } else {
                image            
                .resize(Jimp.AUTO, parseFloat(styles[2]))
                .crop(parseFloat(styles[1]), parseFloat(styles[0]) , 318, 218)
                .write(`img/${newFileName}`)
            }

            fs.unlink(file.path, (err)=>{	
                if(err) throw err				            
            })
        })
}

const jimpImage = async(file,styles) => {
    const fileName = `${Date.now()}_${file.originalname}`
    const newFileName = `profile_${fileName}`
    
    await Jimp.read(file.path)
        .then(image => {
            if(styles[2] == 198){
                image            
                .resize(Jimp.AUTO, parseFloat(styles[2]))
                .write(`img/${newFileName}`)
            } else {
                image            
                .resize(Jimp.AUTO, parseFloat(styles[2]))
                .crop(parseFloat(styles[1]), parseFloat(styles[0]) , 198, 198)
                .write(`img/${newFileName}`)
            }

            fs.unlink(file.path, (err)=>{	
                if(err) throw err				            
            })
        })
}


const upload = multer({ storage: storage }).single("profile");
const uploads = multer({ storage: storage }).array("feeds");

exports.fileUpload = async (req, res, next) => {
    try {
        upload(req, res, (err) => {
            
            if (err) return res.json({ success: false, err })
            const styles = req.body.style.split(',')
            jimpImage(req.file,styles)
            
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.fileUploads = async (req, res, next) => {
    try {
        uploads(req, res, (err) => {
            if (err) return res.json({ success: false, err })
            let styles = []

            for(var i in req.files){
                styles[i] = req.body.styles[i].split(',')
                jimpImages(req.files[i],styles[i])
            }
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}
