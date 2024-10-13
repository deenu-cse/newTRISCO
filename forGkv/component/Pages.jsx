import React from 'react'
import '../Styles/Pages.css'

export default function Pages() {
    return (
        <>
            <div className="form formx">
                <h3>Sign Up</h3>
                <div className="inputes">
                    <div className="input">
                        <label>Name</label>
                        <input placeholder='Enter name...' />
                    </div>
                    <div className="input">
                        <label>phone</label>
                        <input placeholder='Enter phone no....' />
                    </div>
                    <div className="input">
                        <label>Email</label>
                        <input placeholder='Enter your email...' />
                    </div>
                    <div className="input">
                        <label>Password </label>
                        <input placeholder='Enter password...' />
                    </div>
                </div>
                <button>Sumbit</button>
            </div>
            <div className="form formx">
                <h3>Sign In</h3>
                <div className="inputes">
                    <div className="input">
                        <label> Email</label>
                        <input placeholder='Enter your email...' />
                    </div>
                    <div className="input">
                        <label> Password</label>
                        <input placeholder='Enter password...' />
                    </div>
                </div>
                <button>Sumbit</button>
            </div>
        </>
    )
}
