import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '@rjsf/core';
import AjvValidator from '@rjsf/validator-ajv8';
import '../Styles/Eventform.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loading from '../../img/loading.gif';

export default function Eventform() {
    const { id } = useParams();
    const [formSchema, setFormSchema] = useState(null);
    const [eventName, seteventName] = useState('');
    const [isValidToken, setIsValidToken] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pastEvent, setpastEvent] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('userToken');
            if (token) {
                try {
                    const response = await fetch('http://localhost:3000/verify-token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token }),
                    });
                    const data = await response.json();
                    setIsValidToken(data.valid);
                } catch (error) {
                    setIsValidToken(false);
                }
            } else {
                setIsValidToken(false);
            }
        };

        verifyToken();
    }, []);

    useEffect(() => {
        const getForm = async () => {
            try {
                const response = await fetch(`http://localhost:3000/getForm/${id}`, {
                    method: "GET"
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                seteventName(data.name);
                const schema = {
                    title: data.name,
                    type: "object",
                    properties: {}
                };

                data.fields.forEach(field => {
                    schema.properties[field.label] = field.type === 'email'
                        ? { type: 'string', title: field.label, format: 'email' }
                        : { type: field.type, title: field.label };
                });

                if (data.numMembers !== null) {
                    schema.properties.numMembers = {
                        type: 'string',
                        title: 'studentId of leader and members',
                    }
                }

                setFormSchema(schema);
            } catch (error) {
                console.log(error);
            }
        };
        getForm();
    }, [id]);

    useEffect(() => {
        const getSchedule = async () => {
            try {
                const response = await fetch(`http://localhost:3000/getSheduleId?eventName=${id}`, {
                    method: 'GET',
                });
                const resdata = await response.json();
                if (response.ok) {
                    const filteredEvent = resdata.find(item => item.name.toLowerCase() === eventName.toLowerCase());
                    Setdate(filteredEvent.date);
                }
            } catch (error) {
                console.log('Error while getting schedule:', error);
            }
        };

        getSchedule();
    }, [id, eventName]);

    const Setdate = (time) => {
        const [day, month, year] = time.split('/');
        const eventDate = new Date(`${year}-${month}-${day}`);
        const currentDate = new Date();
        const timeLeft = eventDate - currentDate;

        if (timeLeft < 0) {
            setpastEvent(true);
        }
    };

    if (!isValidToken) {
        navigate('/userAuth/login');
    }

    const onSubmit = async ({ formData }) => {
        setIsLoading(true);
        try {
            const AllMembers = formData.numMembers ? formData.numMembers.split(',').map(id => id.trim()) : [];
            const response = await fetch(`http://localhost:3000/fillForm/submit`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ submissionData: formData, eventName, AllMembers })
            });
            const resdata = await response.json();

            if (response.ok) {
                toast.success(resdata.message);
                navigate(`/secure-payment/${id}`);
            } else {
                toast.error(resdata.message);
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div>
                <h1>{formSchema ? formSchema.title : "Loading..."}</h1>
                {isLoading ? (
                    <div className="loading-container">
                        <img src={loading} alt="Loading..." />
                    </div>
                ) : (
                    !pastEvent ? (
                        formSchema && <Form schema={formSchema} validator={AjvValidator} onSubmit={onSubmit} />
                    ) : (
                        <h1>Registration has ended...</h1>
                    )
                )}
            </div>
        </>
    );
}
