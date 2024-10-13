import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '@rjsf/core';
import AjvValidator from '@rjsf/validator-ajv8';
import '../Styles/Eventform.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Eventform() {
    const { id } = useParams();
    const [formSchema, setFormSchema] = useState(null);
    const [eventName, seteventName] = useState('')
    const [isValidToken, setIsValidToken] = useState(false);

    const navigate = useNavigate()

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
                seteventName(data.name)
                const fields = data.fields;
                const schema = {
                    title: data.name,
                    type: "object",
                    properties: {}
                };

                console.log(schema);

                fields.forEach(field => {
                    if (field.type === 'email') {
                        schema.properties[field.label] = {
                            type: 'string',
                            title: field.label,
                            format: 'email'
                        };
                    } else {
                        schema.properties[field.label] = {
                            type: field.type,
                            title: field.label,
                        };
                    }
                });

                setFormSchema(schema);
            } catch (error) {
                console.log(error);
            }
        };
        getForm();
    }, [id]);

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
                    console.log(data);
                    if (data.valid) {
                        setIsValidToken(true);
                    } else {
                        setIsValidToken(false);
                    }
                } catch (error) {
                    console.error('Token verification failed:', error);
                    setIsValidToken(false);
                }
            } else {
                setIsValidToken(false);
            }
        };

        verifyToken();
    }, []);

    if (!isValidToken) {
        navigate('/userAuth/login')
    }


    const onSubmit = async ({ formData }) => {
        try {
            const response = await fetch(`http://localhost:3000/fillForm/submit`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ submissionData: formData, eventName })
            });
            const resdata = await response.json();

            if (response.ok) {
                console.log(resdata);
                toast.success(resdata.message);
                navigate(`/secure-payment/${id}`);
            } else {
                toast.error(resdata.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("An unexpected error occurred");
        }
    };


    if (!formSchema) {
        return <div>Loading form...</div>;
    }

    console.log(eventName)

    return (
        <>
            <ToastContainer />
            <div>
                <h1>{formSchema.title}</h1>
                <Form schema={formSchema} validator={AjvValidator} onSubmit={onSubmit} />
            </div>
        </>
    );
}
