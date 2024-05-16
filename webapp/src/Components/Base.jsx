import React, { useState } from 'react';
import badalImage from "../assets/image.png"
import './base.css';

const CaloriePopup = ({ calorie, onClose }) => {
    return (
        <div className="calorie-background">

            <div className="calorie-popup">
                <div className="content">
                    <h2 style={{ "color": "Black" }}>Calories Burned:</h2>
                    <h2 style={{ "color": "Black" }}>{calorie}</h2>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};


const Base = () => {
    const [formData, setFormData] = useState({
        gender: '',
        age: '',
        height: '',
        weight: '',
        workoutDuration: '',
        heartRate: '',
        bodyTemperature: ''
    });
    const [calorie, setCalorie] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [blur, setBlur] = useState(Boolean);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            features: [
                parseFloat(formData.gender),
                parseFloat(formData.age),
                parseFloat(formData.height),
                parseFloat(formData.weight),
                parseFloat(formData.workoutDuration),
                parseFloat(formData.heartRate),
                parseFloat(formData.bodyTemperature)
            ]
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        fetch("http://127.0.0.1:5000/predict", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                setCalorie(result.prediction);
                setShowPopup(true);
                setBlur(true)
            })
            .catch((error) => console.error(error));

    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setBlur(false)
    };

    return (
        <div className={blur ? `base-blur` : `base`}>
            <div className='container'>
                <div className="text-container">
                    <h1 className='text-heading'>Worried about calculating how many calories you have burned?</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus sint autem alias ea ex? Saepe libero labore maxime sed, iure impedit excepturi amet quibusdam minima?</p>
                </div>
            </div>

            <div className="second-section">

                <div id='test'>

                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="gender">Enter your gender:</label>
                                <input type="number" id="gender" name="gender" value={formData.gender} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="age">Enter age:</label>
                                <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="height">Enter height:</label>
                                <input type="number" id="height" name="height" value={formData.height} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="weight">Enter weight:</label>
                                <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="workoutDuration">Enter workout duration:</label>
                                <input type="number" id="workoutDuration" name="workoutDuration" value={formData.workoutDuration} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="heartRate">Enter heart rate:</label>
                                <input type="number" id="heartRate" name="heartRate" value={formData.heartRate} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bodyTemperature">Enter body temperature:</label>
                                <input type="number" id="bodyTemperature" name="bodyTemperature" value={formData.bodyTemperature} onChange={handleChange} />
                            </div>
                            <button id="btn" type='submit'>Submit</button>
                        </form>
                    </div>

                    <div className="img-container">
                        <img src={badalImage} alt="image" />
                    </div>

                </div>
            </div>
            {showPopup && <CaloriePopup calorie={calorie} onClose={handleClosePopup} />}
        </div>
    );
};

export default Base;
