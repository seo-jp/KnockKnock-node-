const multer  = require('multer')
var Jimp = require('jimp');
const fs = require('fs')

const pool = require('../data/pool')
const commonQuery = require('../data/commonQuery')


// keyword & category 검색,보기 ----------------------------------------------------------------------------------------

exports.getCategory = async (req, res, next) => {
    try {
        let data = await pool.query(commonQuery.getCategory)
        return res.json(data[0])
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getCategoryByName = async (req, res, next) => {
    let ctgCategory  = '%' + req.params.ctgCategory + '%'
    try {
        let data = await pool.query(commonQuery.getCategoryByName, [ctgCategory])
        return res.json(data[0])
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getKeyword = async (req, res, next) => {
    try {
        let data = await pool.query(commonQuery.getKeyword)
        return res.json(data[0])
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getKeywordByName = async (req, res, next) => {
    let keyword  = '%' + req.params.keyword + '%'
    try {
        let data = await pool.query(commonQuery.getKeywordByName, [keyword])
        return res.json(data[0])
    } catch (err) {
        return res.status(500).json(err)
    }
}

//validation 중복체크 ----------------------------------------------------------------------------------------

exports.dupliIdCheck = async (req, res, next) => {
    let userId  = req.params.userId
    try {
        let data = await pool.query(commonQuery.dupliIdCheck, [userId])
        return res.json(data[0])
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.dupliPhoneCheck = async (req, res, next) => {
    let phone  = req.params.phone
    try {
        let data = await pool.query(commonQuery.dupliPhoneCheck, [phone])
        return res.json(data[0])
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.dupliMailCheck = async (req, res, next) => {
    let mail  = req.params.mail
    try {
        let data = await pool.query(commonQuery.dupliMailCheck, [mail])
        return res.json(data[0])
    } catch (err) {
        return res.status(500).json(err)
    }
}


// file upload (profile & feed) ----------------------------------------------------------------------------------------

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "img/")
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
})

// 나중에 jimpImage는 하나로 합치고 width,height만 변수로 설정하기
const jimpImages = async(file,styles,newFileName) => {
    
    await Jimp.read(file.path)
        .then(image => {
            if(styles[2] == 218){
                image            
                .resize(parseFloat(styles[3]), parseFloat(styles[2]))
                .write(`img/${newFileName}`)
            }
            else if(styles[2] > 218 && styles[3] < 318){
                image            
                .resize(parseFloat(styles[3]), parseFloat(styles[2]))
                .crop(0, parseFloat(styles[0]), parseFloat(styles[3]), 218)
                .write(`img/${newFileName}`)
            }
            else {
                image            
                .resize(parseFloat(styles[3]), parseFloat(styles[2]))
                .crop(parseFloat(styles[1]), parseFloat(styles[0]) , 318, 218)
                .write(`img/${newFileName}`)
            }

            fs.unlink(file.path, (err)=>{	
                if(err) throw err				            
            })

            return newFileName
        })
}

const jimpImage = async(file,styles,newFileName) => {
    
    await Jimp.read(file.path)
        .then(image => {
            if(styles[2] == 198){
                image            
                .resize(parseFloat(styles[3]), parseFloat(styles[2]))
                .write(`img/${newFileName}`)
            }
            else if(styles[2] > 198 && styles[3] < 198){
                image            
                .resize(parseFloat(styles[3]), parseFloat(styles[2]))
                .crop(0, parseFloat(styles[0]), parseFloat(styles[3]), 198)
                .write(`img/${newFileName}`)
            }
            else {
                image            
                .resize(parseFloat(styles[3]), parseFloat(styles[2]))
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

            const fileName = `${Date.now()}_${req.file.originalname}`
            const newFileName = `profile_${fileName}`
            const styles = req.body.style.split(',')

            jimpImage(req.file,styles,newFileName)
            
            return res.json({fileName : newFileName})
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
            let fileName = []
            let fileNames = []

            for(var i in req.files){
                fileName[i] = `feed_${Date.now()}_${req.files[i].originalname}`
                styles[i] = req.body.styles[i].split(',')
                jimpImages(req.files[i],styles[i],fileName[i])

                fileNames[i] = {id : req.body.ids[i] , fileName : fileName[i]}
            }

            return res.json(fileNames)
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}
