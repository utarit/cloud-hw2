import React, { useState } from 'react';
import './style.css';


export default function InventionCard({ invention, user, userGallery, setUser }) {
    const [rate, setRate] = useState(0);
    const [inv, setInvention] = useState(invention)

    function onRateChange(e) {
        // console.log(e.target.value);
        setRate(parseInt(e.target.value));
    }

    async function userUpdate() {
        // console.log("User: ", rate)
        if (rate !== 0) {
            const response = await fetch('http://localhost:5000/api/user/' + user.username, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const resData = await response.json();
            setUser(resData.data);
            localStorage.setItem('userData', JSON.stringify(resData.data));
        }
    }

    async function rateUpdate() {
        if (rate !== 0) {
            const response = await fetch('http://localhost:5000/api/invention/' + inv._id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rate: rate, username: user.username })
            });
            const resData = await response.json();
            setInvention(resData.data);
        }
    }


    function onRateClick() {
        rateUpdate();
        userUpdate();
    }

    async function onDeleteClick() {
        try {
            const response = await fetch('http://localhost:5000/api/invention/' + inv._id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await response.json();
            window.location.reload();
        } catch (error) {
            // console.log(error);
        }
    }

    return (
        <div className="col-sm p-1">
            <div className="card" style={{ width: 250 }}>
                <div className="image-div" >
                    <img  style={{height: 200, objectFit: 'cover'}} src={inv.photoUrl} className="card-img-top" alt="..." />
                    {inv.featured ? <span className="badge notify-badge">Featured</span> : null}
                    {inv.quote ? <p className="quote-text"><small><i>{inv.quote}</i></small></p> : null}
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-8">
                            <h5 className="card-title">{inv.productName}</h5>
                        </div>
                        <div className="col">
                            <div className="badge badge-warning text-wrap py-2" style={{ width: "3rem" }}>
                                {inv.productRating === 0 ? "-" : `${inv.productRating}`}/5
                    </div>
                        </div>
                    </div>
                    <p className="card-text"><i>{inv.inventorName}</i> - ${inv.cost}</p>
                    <p className="card-text"><b>Materials:</b> {inv.materialsUsed}</p>
                    {userGallery ? <button onClick={onDeleteClick} className="btn btn-danger">Delete Invention</button> : <div className="d-flex flex-row justify-content-between" >
                        <div className="">
                            <select defaultValue={inv.ratedBy && user.username in inv.ratedBy ? inv.ratedBy[user.username] : 0} onChange={onRateChange} className="custom-select">
                                <option value="0">Choose...</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="">
                            <button onClick={onRateClick} type="submit" className="btn btn-primary">Rate</button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>

    );
}