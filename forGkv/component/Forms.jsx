import React, { useState } from 'react';
import '../Styles/Forms.css';


export default function Forms() {


    const [formName, setFormName] = useState('');
    const [formFees, setFormFees] = useState('')
    const [formType, setFormType] = useState('');
    const [numMembers, setNumMembers] = useState('');

    const [bigG, setbigG] = useState({
        GalleryType: "",
        links: ""
    })
    const [fields, setFields] = useState([{ label: '', type: 'string' }]);

    const handleFieldChange = (index, event) => {
        const newFields = fields.slice();
        newFields[index][event.target.name] = event.target.value;
        setFields(newFields);
    };

    const addField = () => {
        setFields([...fields, { label: '', type: 'string' }]);
    };

    const removeField = (index) => {
        const newFields = fields.slice();
        newFields.splice(index, 1);
        setFields(newFields);
    };

    const handleSubmitx = (event) => {
        event.preventDefault();

        const formattedFields = fields.map(field => ({
            label: field.label,
            type: field.type,
        }));

        fetch('http://localhost:3000/forms/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fees: formFees,
                name: formName,
                type: formType,
                numMembers: formType === 'Team' ? numMembers : null,
                fields: formattedFields
            })
        })
            .then(response => response.json())
            .then(data => {
                alert("Form created:", data);
                setFields('');
                setFormType('');
                setNumMembers('');
            })
            .catch(error => {
                console.error("Error creating form:", error);
            });
    }


    console.log({ formName, fields })

    const [hero, setHero] = useState({
        name: "",
        about: "",
        description: "",
        date: "",
        where: "",
        image: "",
        link: ""
    });

    const [speaker, setspeaker] = useState({
        image: null,
        name: "",
        profession: "",
        contact: ""
    })

    const [shedule, setshedule] = useState({
        day: "",
        name: "",
        time: "",
        date: "",
        description: "",
        image: ""
    })

    const [gallery, setgallery] = useState({
        image: ""
    })

    const handleInput = (e) => {
        const { name, value } = e.target;
        setHero({
            ...hero,
            [name]: value
        });
    };

    const handelSpeaker = (e) => {
        const { name, value } = e.target;
        setspeaker({
            ...speaker,
            [name]: value
        })
    }

    const handelfullGallery = (e) => {
        const { name, value } = e.target;
        setbigG({
            ...bigG,
            [name]: value
        })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                console.log("Please upload a valid image file (JPEG/PNG).");
                return;
            }
            setspeaker({ ...speaker, image: file });
        }
    };

    const handelShedule = (e) => {
        const { name, value } = e.target;
        setshedule({
            ...shedule,
            [name]: value
        })
    }

    const handelGallery = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                console.log("Please upload a valid image file (JPEG/PNG).");
                return;
            }
            setgallery({ ...gallery, image: file });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const imageArray = hero.image.split(',').map(img => img.trim());

        try {
            const response = await fetch('http://localhost:3000/heroForm', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...hero, image: imageArray })
            });
            const resdata = await response.json();
            if (response.ok) {
                console.log(resdata);
                setHero({
                    name: "",
                    about: "",
                    description: "",
                    image: "",
                    date: "",
                    where: ""
                });
                alert("Created hero section");
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    console.log(bigG)

    const speakerSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', speaker.name);
        formData.append('profession', speaker.profession);
        formData.append('image', speaker.image);

        const contactArray = speaker.contact.split(',').map(item => item.trim());
        contactArray.forEach(contact => formData.append('contact', contact));

        try {
            const response = await fetch('http://localhost:3000/speaker', {
                method: "POST",
                body: formData
            });

            const resdata = await response.json();
            if (response.ok) {
                console.log(resdata);
                setspeaker({
                    image: null,
                    name: "",
                    profession: "",
                    contact: ""
                });
                alert("Speaker added successfully");
            } else {
                console.log('Error:', resdata);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const fullgallerySubmit = async (e) => {
        e.preventDefault();

        const imageArray = bigG.links.split(',').map(img => img.trim()).filter(img => img);;

        try {
            const response = await fetch('http://localhost:3000/Fgallery', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...bigG,
                    links: imageArray
                })
            });

            const resdata = await response.json();
            if (response.ok) {
                console.log(resdata);
                setbigG({
                    GalleryType: "",
                    links: ""
                });
                alert("Photos added successfully");
            } else {
                console.log('Error:', resdata);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }

    const sheduleSubmit = async (e) => {
        e.preventDefault();
        const imageArray = shedule.image.split(',').map(img => img.trim());

        try {
            const response = await fetch('http://localhost:3000/shedule', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...shedule,
                    image: imageArray
                })
            });

            const resdata = await response.json();

            if (response.ok) {
                console.log(resdata);
                setshedule({
                    day: "",
                    name: "",
                    time: "",
                    date: "",
                    description: "",
                    image: ""
                });
                alert("Schedule created");
            } else {
                console.log('Error:', resdata);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };


    const gallerySubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', gallery.image);

        try {
            const response = await fetch('http://localhost:3000/gallery', {
                method: "POST",
                body: formData
            });

            const resdata = await response.json();

            if (response.ok) {
                console.log(resdata);
                setgallery({ image: "" });
                alert("Gallery created successfully");
            } else {
                console.log('Error:', resdata);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    console.log(gallery)
    console.log(shedule)

    return (
        <>
            <div className="formcontainer">
                <div className="grid">
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <h3>Hero Section</h3>
                            <div className="inputes">
                                <div className="input">
                                    <label> Event Name</label>
                                    <input
                                        name='name'
                                        placeholder='Enter event name...'
                                        value={hero.name}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="input">
                                    <label> About</label>
                                    <input
                                        name='about'
                                        placeholder='Enter about the event...'
                                        value={hero.about}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="input">
                                    <label>Description</label>
                                    <input
                                        name='description'
                                        placeholder='Enter description of event...'
                                        value={hero.description}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="input">
                                    <label>Date</label>
                                    <input
                                        name='date'
                                        placeholder='Enter event date...'
                                        value={hero.date}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="input">
                                    <label>Where</label>
                                    <input
                                        name='where'
                                        placeholder='Enter event location...'
                                        value={hero.where}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="input">
                                    <label>Image</label>
                                    <input
                                        name='image'
                                        placeholder='Enter image of the event...'
                                        value={hero.image}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="input">
                                    <label>Video Link</label>
                                    <input
                                        name='link'
                                        placeholder='Enter video link...'
                                        value={hero.link}
                                        onChange={handleInput}
                                    />
                                </div>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="form">
                        <form onSubmit={speakerSubmit}>
                            <h3>Peoples</h3>
                            <div className="inputes">
                                <div className="input">
                                    <label>Image</label>
                                    <input
                                        type='file'
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        name='image'
                                        placeholder='Upload image of guest...'
                                    />
                                </div>
                                <div className="input">
                                    <label>Name</label>
                                    <input name='name'
                                        value={speaker.name}
                                        placeholder='Enter guest name...'
                                        onChange={handelSpeaker}
                                    />
                                </div>
                                <div className="input">
                                    <label>Profession</label>
                                    <input
                                        name='profession'
                                        value={speaker.profession}
                                        placeholder='Enter guest profession...'
                                        onChange={handelSpeaker}
                                    />
                                </div>
                                <div className="input">
                                    <label>Contact</label>
                                    <input name='contact'
                                        value={speaker.contact}
                                        placeholder='Enter contact link...'
                                        onChange={handelSpeaker}
                                    />
                                </div>
                                <button>Submit</button>
                            </div>
                        </form>
                    </div>

                    <div className="form">
                        <form onSubmit={sheduleSubmit}>
                            <h3>Events Schedule</h3>
                            <div className="inputes">
                                <div className="input">
                                    <label>Day</label>
                                    <input name='day' value={shedule.day} onChange={handelShedule} placeholder='Enter day...' />
                                </div>
                                <div className="input">
                                    <label>Time</label>
                                    <input name='time' value={shedule.time} onChange={handelShedule} placeholder='Enter event time...' />
                                </div>
                                <div className="input">
                                    <label>Date</label>
                                    <input name='date' value={shedule.date} onChange={handelShedule} placeholder='Enter event date D/M/Y' />
                                </div>
                                <div className="input">
                                    <label>Name</label>
                                    <input name='name' value={shedule.name} onChange={handelShedule} placeholder='Enter event name...' />
                                </div>
                                <div className="input">
                                    <label>Description</label>
                                    <input name='description' value={shedule.description} onChange={handelShedule} placeholder='Enter event description...' />
                                </div>
                                <div className="input">
                                    <label>Images</label>
                                    <input name='image' value={shedule.image} onChange={handelShedule} placeholder='Enter imges of the event ...' />
                                </div>
                                <button type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>

                    <div className="form">
                        <form onSubmit={gallerySubmit}>
                            <h3>Gallery</h3>
                            <div className="inputes">
                                <div className="input">
                                    <label>Photos</label>
                                    <input
                                        type='file'
                                        accept="image/*"
                                        onChange={handelGallery}
                                        placeholder='Upload photos...' />
                                </div>
                                <button>Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className='form'>
                        <h1>Create a New Form</h1>
                        <form onSubmit={handleSubmitx}>
                            <div className='input'>
                                <label>Form Name</label>
                                <input
                                    type="text"
                                    value={formName}
                                    onChange={(e) => setFormName(e.target.value)}
                                    placeholder="Form Name..."
                                    required
                                />
                                <label>Form Fees</label>
                                <input
                                    type="text"
                                    value={formFees}
                                    onChange={(e) => setFormFees(e.target.value)}
                                    placeholder="Form Fees..."
                                    required
                                />
                                <label>Form Type</label>
                                <select
                                    value={formType}
                                    onChange={(e) => setFormType(e.target.value)}
                                    required
                                >
                                    <option value="">Select Form Type</option>
                                    <option value="Team">Team</option>
                                    <option value="Individual">Individual</option>
                                </select>

                                {formType === 'Team' && (
                                    <div>
                                        <label>Number of Members in Team</label>
                                        <input
                                            type="number"
                                            value={numMembers}
                                            onChange={(e) => setNumMembers(e.target.value)}
                                            placeholder="Number of Members..."
                                            required
                                        />
                                    </div>
                                )}
                            </div>

                            {fields.map((field, index) => (
                                <div key={index} className='inputx input'>
                                    <label>Feild Name</label>
                                    <input
                                        type="text"
                                        name="label"
                                        value={field.label}
                                        onChange={(e) => handleFieldChange(index, e)}
                                        placeholder="Field Label..."
                                        required
                                    />
                                    <label>Type</label>
                                    <select
                                        name="type"
                                        value={field.type}
                                        onChange={(e) => handleFieldChange(index, e)}
                                    >
                                        <option value="string">Text</option>
                                        <option value="number">Number</option>
                                        <option value="email">Email</option>
                                    </select>
                                    <button type="button" onClick={() => removeField(index)}>Remove</button>
                                </div>
                            ))}
                            <div className="flexbtn">
                                <button type="button" onClick={addField}>Add Field</button>
                                <button type="submit">Create Form</button>
                            </div>
                        </form>
                    </div>
                    <div className="form">
                        <form onSubmit={fullgallerySubmit}>
                            <h3>Gallery</h3>
                            <div className="inputes">
                                <div className="input">
                                    <label>Photos</label>
                                    <input
                                        type='text'
                                        onChange={handelfullGallery}
                                        name='links'
                                        value={bigG.links}
                                        placeholder='Upload photos...' />
                                </div>
                                <div className="input">
                                    <label>Gallery Type</label>
                                    <input
                                        type='text'
                                        onChange={handelfullGallery}
                                        name='GalleryType'
                                        value={bigG.GalleryType}
                                        placeholder='Enter gallery type...'
                                    />
                                </div>
                                <button type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    );
}
