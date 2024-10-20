const express = require("express")
const { Herosection, GetHero, DeleteHero, gkvSpeaker, Getspeaker, DeleteSpeaker, Makeshedule, Getshedule, DeleteShedule, MakeGallery, GetGallery, Event, createForm, getForm, formById, Submitform, getQr, Createdforms, DeleteForm, Contact, Contactform, getContact, submitForm, Excelsheet, getGallery, GetbyName, IcreateForm, getIgallery, Signupform, login, verify, Getprofile, getidevent, Fgallery, DImage, googleLogin, getPopularEvent, checkAdmin, getUser } = require("../Controllers/allControllers")
const router = express.Router()


const multer = require('multer');
const path = require('path')


const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false);
    }
    cb(null, true);
};

const upload = multer({
    dest: 'uploads/',
    fileFilter
});

router.post('/heroForm', Herosection)
router.get('/getHero', GetHero)
router.delete('/deleteHero/:id', DeleteHero);
router.post('/speaker', upload.single('image'), gkvSpeaker)
router.get('/getSpeaker', Getspeaker)
router.delete('/deleteSpeaker/:id', DeleteSpeaker)
router.post('/shedule', Makeshedule)
router.get('/getShedule', Getshedule)
router.get('/getSheduleId', GetbyName)
router.delete('/deleteShedule/:id', DeleteShedule)
router.post('/gallery', upload.single('image'), MakeGallery)
router.get('/getGallery', GetGallery)
router.delete('/deleteimg/:id', DImage)
router.post('/eventForm', Event)
router.post('/forms/create', createForm)
router.post('/iforms/create', IcreateForm)
router.get('/forms/create/:name', getForm)
router.get('/getForm/:name', formById)
router.post('/fillForm/submit', Submitform)
router.get('/payment/:id', getQr)
router.get('/getCreatedForm', Createdforms)
router.delete('/deleteForm/:id', DeleteForm)
router.post('/contact', Contactform)
router.get('/getContact', getContact)
router.get('/submitedForm', submitForm)
router.get('/export-excel', Excelsheet)
router.get('/gallery', getGallery)
router.post('/Fgallery', Fgallery)
router.get('/getIgallery', getIgallery)
router.post('/signUp', upload.single('idCard'), Signupform)
router.post('/login', login)
router.post('/verify-token', verify)
router.get('/profile/:studentId', Getprofile)
router.get('/event/:studentId', getidevent)
router.post('/google-login', googleLogin); 
router.get('/popularEvent', getPopularEvent)
router.post('/admin', checkAdmin)
router.get('/users', getUser)



module.exports = router