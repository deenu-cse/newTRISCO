import React, { useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import '../Styles/Winner.css';

export default function Winner() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [allWinner, setallWinner] = useState([]);

    const config = {
        readonly: false,
        height: 500,
        toolbarSticky: false,
    };

    const winnerSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/winner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content
                })
            });
            const resdata = await response.json(); 
            if (response.ok) {
                alert('Winner section added');
                setTitle('');
                setContent('');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch('http://localhost:3000/getAllWinner', {
                    method: 'GET',
                });
                if (response.ok) {
                    const resdata = await response.json();
                    setallWinner(resdata);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchdata();
    }, []);

    const deleteWinner = async (id) => {
        const response = await fetch(`http://localhost:3000/deleteWinner/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setallWinner(allWinner.filter((item) => item._id !== id));
            alert('Image deleted successfully');
        } else {
            console.log('Failed to delete image');
        }
    };

    return (
        <>
            <div className="formv">
                <form onSubmit={winnerSubmit}>
                    <h3>Create a New Winner Page</h3>
                    <div className="inputsb">
                        <div className="input">
                            <label>Event name:</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="inputm">
                            <h3>Write Content here</h3>
                            <JoditEditor
                                value={content}
                                config={config}
                                tabIndex={1}
                                onBlur={(newContent) => setContent(newContent)} 
                            />
                        </div>
                        <button className='btx' type='submit'>Submit</button>
                    </div>
                </form>
            </div>
            <div className="table-container">
                <div className="table-box">
                    <h6 className="table-title">Winners Blogs</h6>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Blog Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allWinner.map((blog, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{blog.title}</td>
                                    <td><button onClick={() => deleteWinner(blog._id)}>x</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
