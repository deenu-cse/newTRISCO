import React, { useEffect, useState } from 'react'
import '../Styles/Tabel.css'


export default function Tabel() {
    const [hero, sethero] = useState([])
    const [speaker, setspeaker] = useState([])
    const [shedule, setshedule] = useState([])
    const [createdForm, setcreatedForm] = useState([])
    const [submitedforms, setsubmitedforms] = useState([])
    const [galleryImage, setgalleryImage] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setusers] = useState([])


    useEffect(() => {
        const getHero = async () => {
            try {
                const response = await fetch('http://localhost:3000/getHero', {
                    method: "GET"
                })
                if (response.ok) {
                    const resdata = await response.json()
                    sethero(resdata)
                }
            } catch (error) {
                console.log(error)
            }
        }
        const getSpeakers = async () => {
            try {
                const response = await fetch('http://localhost:3000/getSpeaker', {
                    method: "GET"
                })
                if (response.ok) {
                    const resdata = await response.json()
                    setspeaker(resdata)
                }
            } catch (error) {
                console.log(error)
            }
        }
        const getShedule = async () => {
            try {
                const response = await fetch('http://localhost:3000/getShedule', {
                    method: "GET"
                })
                if (response.ok) {
                    const resdata = await response.json()
                    setshedule(resdata)
                }
            } catch (error) {
                console.log(error)
            }
        }
        const getCreatedForms = async () => {
            try {
                const response = await fetch('http://localhost:3000/getCreatedForm', {
                    method: "GET"
                })
                if (response.ok) {
                    const resdata = await response.json()
                    setcreatedForm(resdata)
                }
            } catch (error) {
                console.log(error)
            }
        }
        const Submitedforms = async () => {
            try {
                const response = await fetch('http://localhost:3000/submitedForm', {
                    method: "GET"
                })
                if (response.ok) {
                    const resdata = await response.json()
                    setsubmitedforms(resdata.forms)
                }
            } catch (error) {
                console.log(error)
            }
        }
        const getGalleryImage = async () => {
            try {
                const response = await fetch('http://localhost:3000/gallery', {
                    method: "GET"
                })
                if (response.ok) {
                    const resdata = await response.json()
                    setgalleryImage(resdata.galleryimage)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getHero()
        getSpeakers()
        getShedule()
        getCreatedForms()
        Submitedforms()
        getGalleryImage()
    }, [])

    console.log(galleryImage)

    const deleteHero = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/deleteHero/${id}`, {
                method: "DELETE"
            })
            console.log(response)
            if (response.ok) {
                sethero(hero.filter((item) => item._id !== id))
                alert('Hero deleted successfully');
            } else {
                console.log('Failed to delete hero:', response.statusText);
            }
        } catch (error) {
            console.log('Error while deleting hero:', error);
        }
    }

    const deleteSpeaker = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/deleteSpeaker/${id}`, {
                method: "DELETE"
            })
            console.log(response)
            if (response.ok) {
                setspeaker(speaker.filter((item) => item._id !== id))
                alert('Speaker deleted successfully');
            } else {
                console.log('Failed to delete speaker');
            }
        } catch (error) {
            console.log('Error while deleting speaker', error);
        }
    }

    const deleteShedule = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/deleteShedule/${id}`, {
                method: "DELETE"
            })
            console.log(response)
            if (response.ok) {
                setspeaker(shedule.filter((item) => item._id !== id))
                alert('Shedule deleted successfully');
            } else {
                console.log('Failed to delete shedule');
            }
        } catch (error) {
            console.log('Error while deleting shedule', error);
        }
    }

    const deleteForm = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/deleteForm/${id}`, {
                method: "DELETE"
            })
            console.log(response)
            if (response.ok) {
                setcreatedForm(shedule.filter((item) => item._id !== id))
                alert('Shedule deleted successfully');
            } else {
                console.log('Failed to delete shedule');
            }
        } catch (error) {
            console.log('Error while deleting shedule', error);
        }
    }

    const downloadExcel = async () => {
        try {
            const response = await fetch('http://localhost:3000/export-excel');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'submissions.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (err) {
            console.error('Error downloading Excel file', err);
        }
    };

    const deleteImage = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/deleteimg/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                setgalleryImage(galleryImage.filter((item) => item._id !== id));
                alert('Image deleted successfully');
            } else {
                console.log('Failed to delete image');
            }
        } catch (error) {
            console.log('Error while deleting image:', error);
        }
    };

    const searchFilter = submitedforms.filter((data) =>
        data.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    )

    useEffect(() => {
        const getAllUser = async (req, res) => {
            try {
                const response = await fetch('http://localhost:3000/users', {
                    method: 'GET'
                })

                const resdata = await response.json();
                if (response.ok) {
                    setusers(resdata);
                }
            } catch (error) {
                console.error("An error occurred while fetching the users:", error);
            }
        }
        getAllUser()
    }, [])

    return (
        <>
            <div className="flextabel">
                <div className="table-containerx">
                    <div className="table-box">
                        <h6 className="table-title">Hero function Table</h6>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hero.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data.name}</td>
                                        <td>{data.date}</td>
                                        <td><button onClick={() => deleteHero(data._id)} >x</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="table-containerx">
                    <div className="table-box">
                        <h6 className="table-title">Speakers Table</h6>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Profession</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {speaker.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data.name}</td>
                                        <td>{data.profession}</td>
                                        <td><button onClick={() => deleteSpeaker(data._id)}>x</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="flextabel">
                <div className="table-containerx">
                    <div className="table-box">
                        <h6 className="table-title">Event Shedule Table</h6>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Event Name</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shedule.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data.day}</td>
                                        <td>{data.name}</td>
                                        <td><button onClick={() => deleteShedule(data._id)}>x</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="table-containerx">
                    <div className="table-box">
                        <h6 className="table-title">Event Forms Table</h6>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Fees</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {createdForm.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data.name}</td>
                                        <td>{data.fees}</td>
                                        <td><button onClick={() => deleteForm(data._id)}>x</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="flextabel">
                <div className="table-containerx">
                    <div className="table-box">
                        <div className="d-flex curser align-items-center justify-content-between mb-2">
                            <h6 className="table-title">Registered User Table</h6>
                            <a onClick={downloadExcel}>Take Sheet</a>
                        </div>
                        <div className="nfirst">
                            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Enter studentId...' />
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Event Name</th>
                                    <th scope="col">StudentId</th>
                                    <th scope="col">rollNo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchFilter.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data.Event}</td>
                                        <td>{data.studentId.length > 20 ? data.studentId.slice(0, 10) + "..." : data.studentId}</td>
                                        <td>{data.submissionData.rollNo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="table-containerx">
                    <div className="table-box">
                        <h6 className="table-title">Event Forms Table</h6>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Images</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {galleryImage.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>image{index + 1}</td>
                                        <td><button onClick={() => deleteImage(data._id)}>x</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="table-container">
                <div className="table-box">
                    <h6 className="table-title">Users Table</h6>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((data, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data.name}</td>
                                    <td>{data.studentId}</td>
                                    <td>{data.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
