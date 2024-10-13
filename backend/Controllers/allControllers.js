const Contact = require("../models/contactModel");
const Eventform = require("../models/EventformModel");
const Gallery = require("../models/gellaryModel");
const Hero = require("../models/heroModel");
const Shedule = require("../models/sheduleModel");
const Speaker = require("../models/speakerModel");
const Submission = require("../models/sumbitionDataModel");
const cloudinary = require('cloudinary').v2;
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const User = require("../models/signUpModel");
const bcrypt = require("bcrypt");
const Jimp = require('jimp')
const tesseract = require("tesseract.js");
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');
const client = require("../middelware/redis");
const { sendEventNotification } = require("../middelware/mailer");
const Igallery = require("../models/igalleryModel");
const Client = require("../middelware/redis");




const preprocessImage = async (filePath) => {
    console.log(filePath)
    try {
        const image = await Jimp.read(filePath);
        console.log('Original Image Size:', image.bitmap.width, image.bitmap.height);

        image.resize(1024, Jimp.AUTO);
        console.log('Resized Image Size:', image.bitmap.width, image.bitmap.height);

        const processedPath = filePath.replace(/\.([^.]+)$/, '-processed.$1');
        await image.writeAsync(processedPath);
        console.log('Processed Image Saved:', processedPath);

        return processedPath;
    } catch (error) {
        console.error('Image preprocessing error:', error.message);
        throw error;
    }
};


cloudinary.config({
    cloud_name: 'dmqe0e8k0',
    api_key: '174149697423827',
    api_secret: '8DNk00_b9yY7W0stG4Ez0BbVOec'
});

const Herosection = async (req, res) => {
    try {
        const { name, about, date, where, link, description, image } = req.body
        if (!name || !about || !date || !where) {
            res.status(400).json({ message: "All feild are required" })
        }
        const heroCreated = await Hero.create({
            name,
            about,
            description,
            date,
            where,
            image: Array.isArray(image) ? image : [image],
            link
        })

        const cacheKey = `Hero_${heroCreated._id}`
        await Client.set(cacheKey, JSON.stringify(heroCreated))

        res.status(200).json({ message: "Hero section updated", heroCreated })
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in hero post', error });
    }
}

const GetHero = async (req, res) => {
    try {
        const heroData = await Hero.find().sort({ createdAt: -1 })

        const cacheKey = await Client.keys('Hero_*')
        if (cacheKey > 0) {
            const cachedSchedules = await Client.mGet(cacheKey);

            const Heros = cachedSchedules.map(schedule => JSON.parse(schedule));

            return res.status(200).json(Heros);
        }

        res.status(200).json(heroData)
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in getting hero functions', error });
    }
}

const DeleteHero = async (req, res) => {
    try {
        const { id } = req.params
        const hero = await Hero.findByIdAndDelete(id)
        if (!hero) {
            return res.status(404).json({ message: 'Hero not found' });
        }
        const cacheKey = `Hero_${id}`;
        await Client.del(cacheKey);
        res.status(200).json({ message: 'Hero event deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in delete hero', error });
    }
}

const gkvSpeaker = async (req, res) => {
    try {
        const { name, profession, contact } = req.body;
        const file = req.file;

        if (!name || !profession || !contact || !file) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const uploadResult = await cloudinary.uploader.upload(file.path, {
            folder: 'gkv-speakers',
            public_id: `${name}-id-card`
        });

        const speakerCreated = await Speaker.create({
            name,
            profession,
            contact: Array.isArray(contact) ? contact : [contact],
            image: uploadResult.secure_url
        });

        const cacheKey = `Speaker_${speakerCreated._id}`
        await Client.set(cacheKey, JSON.stringify(speakerCreated))

        return res.status(200).json({ message: "Speakers created successfully", speakerCreated });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const Getspeaker = async (req, res) => {
    try {
        const response = await Speaker.find().sort({ createdAt: -1 })

        const cacheKey = await Client.keys('Speaker_*')
        if (cacheKey > 0) {
            const cachedSchedules = await Client.mGet(cacheKey);

            const Speakers = cachedSchedules.map(schedule => JSON.parse(schedule));

            return res.status(200).json(Speakers);
        }

        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

const DeleteSpeaker = async (req, res) => {
    try {
        const { id } = req.params
        const speaker = await Speaker.findByIdAndDelete(id)
        if (!speaker) {
            return res.status(404).json({ message: 'Speakero not found' });
        }

        const cacheKey = `Speaker_${id}`;
        await Client.del(cacheKey);

        res.status(200).json({ message: 'Speaker deleated successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in delete Speaker', error });
    }
}

const Makeshedule = async (req, res) => {
    try {
        const { day, name, time, date, description, image } = req.body;
        if (!day || !name || !time || !description || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const makeShedule = await Shedule.create({
            day,
            name,
            time,
            date,
            description,
            image: Array.isArray(image) ? image : [image]
        });

        const cacheKey = `shedule_${makeShedule._id}`;
        await Client.set(cacheKey, JSON.stringify(makeShedule));

        await sendEventNotification(makeShedule);

        res.status(200).json({ message: "Schedule created", makeShedule });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in making Schedule', error });
    }
};

const Getshedule = async (req, res) => {
    try {
        const response = await Shedule.find()

        const scheduleKeys = await Client.keys('shedule_*');

        if (scheduleKeys.length > 0) {
            const cachedSchedules = await Client.mGet(scheduleKeys);

            const schedules = cachedSchedules.map(schedule => JSON.parse(schedule));

            return res.status(200).json(schedules);
        }

        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in getting Shedule', error });
    }
}

const GetbyName = async (req, res) => {
    try {
        const { eventName } = req.query;
        const filter = eventName ? { name: { $regex: new RegExp(eventName, 'i') } } : {};

        const response = await Shedule.find(filter);

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in getting Shedule', error });
    }
};


const DeleteShedule = async (req, res) => {
    try {
        const { id } = req.params
        const shedule = await Shedule.findByIdAndDelete(id)
        if (!shedule) {
            return res.status(404).json({ message: 'Shedule not found' });
        }

        const cacheKey = `shedule_${id}`;
        await Client.del(cacheKey);

        res.status(200).json({ message: 'Shedule deleated successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in delete Shedule', error });
    }
}

const MakeGallery = async (req, res) => {
    try {
        const file = req.file;
        console.log(req.file)
        if (!file) {
            return res.status(400).json({ message: "Image is required" })
        }
        const uploadResult = await cloudinary.uploader.upload(file.path, {
            folder: 'gkv-speakers',
        });
        const createGallery = await Gallery.create({
            image: uploadResult.secure_url
        })

        const cacheKey = `gallery_${createGallery._id}`;
        await Client.set(cacheKey, JSON.stringify(createGallery));

        res.status(200).json({ message: "Gallery created", createGallery })
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in make gallery', error });
    }
}

const GetGallery = async (req, res) => {
    try {
        const response = await Gallery.find()

        const scheduleKeys = await Client.keys('gallery_*');

        if (scheduleKeys.length > 0) {
            const cachedSchedules = await Client.mGet(scheduleKeys);

            const schedules = cachedSchedules.map(schedule => JSON.parse(schedule));

            return res.status(200).json(schedules);
        }

        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in make gallery', error });
    }
}

const DImage = async (req, res) => {
    try {
        const { id } = req.params;

        const image = await Gallery.findByIdAndDelete(id);

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        const cacheKey = `gallery_${id}`;
        await Client.del(cacheKey);

        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error in deleting image', error });
    }
};


const Event = async (req, res) => {
    const { fullName, phone, email, rollNo, semester, department, collegeName } = req.body
    try {
        if (!fullName || !phone || !email || !rollNo || !semester || !department || !collegeName) {
            res.status(400).json({ message: "All feild are required" })
        }
        const createEvent = await Eventform.create({ fullName, phone, email, rollNo, semester, department, collegeName })
        res.status(200).json({ message: "Registration succesfull", createEvent })
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in make event form', error });
    }
}

const createForm = async (req, res) => {
    const { name, fees, fields } = req.body;

    try {
        const newForm = await Eventform.create({ name, fees, fields });
        res.status(200).json({ message: "Form created", newForm });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in creating event form', error });
    }
};

const IcreateForm = async (req, res) => {
    const { Ifields } = req.body;

    try {
        const newForm = await Igallery.create({
            iFields: Ifields.map(field => ({
                images: field.images.split(',').map(img => img.trim()),
                imageType: field.imageType
            }))
        });
        res.status(200).json({ message: "Form created", newForm });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in creating event form', error });
    }
};


const getForm = async (req, res) => {
    const { name } = req.params;
    console.log(req.params);
    try {
        const heroEvent = await Eventform.find({ name: { $regex: new RegExp(name, 'i') } });
        if (!heroEvent || heroEvent.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(heroEvent);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in fetching event form', error });
    }
};

const formById = async (req, res) => {
    const { name } = req.params;
    try {
        const getEvent = await Eventform.findOne({ name: { $regex: new RegExp(name, 'i') } })
        if (!getEvent) {
            return res.status(404).json({ message: "Form not found" })
        }
        res.status(200).json(getEvent)
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in fetching form by id', error });
    }
}

const Submitform = async (req, res) => {
    const { submissionData, eventName } = req.body;
    console.log(req.body);
    try {
        if (!submissionData) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email: submissionData.email });
        if (!user) {
            return res.status(400).json({ message: "Use the same email which you used in registration." });
        }

        const existingSubmission = await Submission.findOne({
            studentId: user.studentId,
            Event: eventName
        });

        if (existingSubmission) {
            return res.status(400).json({ message: 'You have already submitted this form using this roll number.' });
        }

        const EventDate = await Shedule.findOne({ name: eventName });

        const { date = null, time = null } = EventDate || {};

        const formData = await Submission.create({
            Event: eventName,
            submissionData,
            studentId: user.studentId,
            date,
            time
        });

        res.status(200).json({ message: "Form submitted successfully", formData });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in submitting form', error });
    }
};


const getQr = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const getAmount = await Eventform.findById(id);
        if (!getAmount) {
            return res.status(404).json({ message: 'Event not found' });
        }
        const amount = getAmount.fees
        console.log(amount)
        const qrCodeUrl = await generateQrCodeForAmount(amount);
        res.json({ qrCodeUrl });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in getting QR', error });
    }
}

const generateQrCodeForAmount = async (amount) => {
    const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${amount}`);
    if (!response.ok) {
        throw new Error('Failed to generate QR code');
    }
    return response.url;
};

const Createdforms = async (req, res) => {
    try {
        const response = await Eventform.find().sort({ createdAt: -1 })
        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in getting created form', error });
    }
}

const DeleteForm = async (req, res) => {
    const { id } = req.params
    try {
        const Form = await Eventform.findByIdAndDelete(id)
        if (!Form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json({ message: 'Form deleated successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in deleting created form', error });
    }
}

const Contactform = async (req, res) => {
    const { name, email, subject, message } = req.body
    try {
        const response = await Contact.create({ name, email, subject, message })
        res.status(200).json({ message: "Contact created", response })
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in created contact', error });
    }
}

const getContact = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 })
        res.status(200).json({ message: "message get succesfully", contacts })
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in getting contact', error });
    }
}

const submitForm = async (req, res) => {
    try {
        const forms = await Submission.find().sort({ createdAt: -1 })
        res.status(200).json({ message: "Forms get successfull", forms })
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in getting submitted form', error });
    }
}

const Excelsheet = async (req, res) => {
    try {
        const submissions = await Submission.find({});

        const data = submissions.map(submission => ({
            Event: submission.Event,
            Name: submission.submissionData.Name,
            Phone: submission.submissionData.Phone,
            Email: submission.submissionData.email,
            RollNo: submission.submissionData.rollNo,
            Semester: submission.submissionData.semester,
            CreatedAt: submission.createdAt,
        }));

        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Convert data to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Append worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');

        // Write workbook to file
        const filePath = path.join(__dirname, 'submissions.xlsx');
        XLSX.writeFile(workbook, filePath);

        // Send the file to the client
        res.download(filePath, 'submissions.xlsx', (err) => {
            if (err) {
                console.log(err);
            }
            fs.unlinkSync(filePath); // Delete file after download
        });
    } catch (err) {
        res.status(500).send('Error generating Excel file');
    }
}

const getGallery = async (req, res) => {
    try {
        const galleryimage = await Gallery.find().sort({ createdAt: -1 })
        res.status(200).json({ message: "Successfully get images", galleryimage })
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in getting gallery image', error });
    }
}

const getIgallery = async (req, res) => {
    try {
        const response = await Igallery.find()
        const scheduleKeys = await Client.keys('Fgallery_*');

        if (scheduleKeys.length > 0) {
            const cachedSchedules = await Client.mGet(scheduleKeys);

            const schedules = cachedSchedules.map(schedule => JSON.parse(schedule));

            return res.status(200).json(schedules);
        }
        res.status(200).json({ message: "Successfully get images", response })
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error in getting Igallery image', error });
    }
}

const Signupform = async (req, res) => {
    try {
        const { name, email, password, rollNo, collegeName, gkv } = req.body;
        const file = req.file;

        const gkvValue = gkv === 'true' ? 'Yes' : 'No';

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        let uploadResult = null;
        if (gkvValue === 'Yes') {
            if (!file) {
                return res.status(400).json({ error: 'ID card is required for GKV students' });
            }

            const processedImagePath = await preprocessImage(file.path);
            const { data: { text } } = await tesseract.recognize(processedImagePath, 'eng');
            const extractedText = text.toUpperCase();

            if (!extractedText.includes("GURUKULA KANGRI")) {
                return res.status(400).json({ message: "The ID card does not belong to GURUKULA KANGRI" });
            }

            const rollnoMatch = extractedText.match(/REG NO\.?\s*(\d+)/);
            if (!rollnoMatch) {
                return res.status(400).json({ message: "Roll number could not be extracted from the ID card", rollnoMatch });
            }
            const extractedRollno = rollnoMatch[1];

            if (extractedRollno !== rollNo) {
                return res.status(400).json({ message: "Roll number on ID card does not match provided roll number" });
            }

            uploadResult = await cloudinary.uploader.upload(processedImagePath, {
                folder: 'gkv-id-cards',
                public_id: `${rollNo}-id-card`
            });
        }

        const generateStudentId = (name) => {
            const uuidPart = uuidv4().split('-')[0];
            const sevenDigitId = uuidPart.substring(0, 7);
            const studentId = `${name.split(' ').join('_')}_${sevenDigitId}`;
            return studentId;
        };

        const studentId = generateStudentId(name);

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            gkv: gkvValue,
            rollNo: gkvValue === 'Yes' ? rollNo : undefined,
            idCard: gkvValue === 'Yes' ? uploadResult.secure_url : undefined,
            collegeName: gkvValue === 'No' ? collegeName : undefined,
            studentId
        });

        const userToken = await newUser.generatToken()

        res.status(200).json({ message: "User saved successfully", userToken, studentId });

    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(400).json({ message: 'Error during sign up', error });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const checkemail = await User.findOne({ email });
        if (!checkemail) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const checkpass = await bcrypt.compare(password, checkemail.password);
        console.log(checkpass)
        if (checkpass) {
            const userToken = await checkemail.generatToken();
            return res.status(201).json({ message: "Login successful", userToken });
        } else {
            return res.status(400).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

const verify = async (req, res) => {
    const token = req.body.token;

    if (!token) {
        return res.status(400).json({ message: 'Token not provided' });
    }

    try {
        const decoded = jwt.verify(token, "Gurukul_Kangri");
        console.log(decoded)
        res.status(200).json({ valid: true, decoded });
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ valid: false, message: 'Invalid token' });
    }
}

const Getprofile = async (req, res) => {
    const { studentId } = req.params
    try {
        const Profile = await User.findOne({ studentId })
        res.status(200).json({ message: "profile get succesfull", Profile })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

const getidevent = async (req, res) => {
    const { studentId } = req.params
    try {
        const Events = await Submission.find({ studentId })
        res.status(200).json({ message: "Event get succesfull", Events })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

const Fgallery = async (req, res) => {
    const { GalleryType, links } = req.body;
    console.log(req.body)
    try {
        if (!GalleryType) {
            return res.status(400).json("Gallery Type is required");
        }

        if (!links || !Array.isArray(links) || links.length === 0) {
            return res.status(400).json("At least one link is required");
        }

        const gallery = await Igallery.create({
            GalleryType,
            links: Array.isArray(links) ? links : [links]
        });

        const cacheKey = `Fgallery_${gallery._id}`
        await Client.set(cacheKey, JSON.stringify(gallery))

        return res.status(200).json({ message: "Gallery created!", gallery });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}


module.exports = { Herosection, GetHero, DeleteHero, gkvSpeaker, Getspeaker, DeleteSpeaker, Makeshedule, Getshedule, DeleteShedule, MakeGallery, GetGallery, Event, createForm, getForm, formById, Submitform, getQr, Createdforms, DeleteForm, Contactform, getContact, submitForm, Excelsheet, getGallery, GetbyName, IcreateForm, getIgallery, Signupform, login, verify, Getprofile, getidevent, Fgallery, DImage }