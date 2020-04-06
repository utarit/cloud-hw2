import React, { useState } from 'react';
import InventionCard from './InventionCard';



export default function UserGallery({ user, inventions, setInventions, setError }) {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({});

    function onFormChange(e) {
        // // console.log(e.target.name, e.target.checked)
        if (e.target.name === 'featured') {
            setFormData({ ...formData, [e.target.name]: e.target.checked });
        } else if (e.target.name === 'cost') {
            setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });

        }
    }

    async function onSubmitClick() {
        if (formData && formData.productName && formData.cost && formData.photoUrl && formData.materialsUsed) {
            setError("");
            try {
                const response = await fetch('/api/inventions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...formData, inventorName: user.username })
                });
                const resData = await response.json();
                setShowForm(false);
                // console.log([...inventions, resData.data]);
                setInventions([...inventions, resData.data]);
                setFormData({});
            } catch (error) {
                // console.log(error)
            }
        } else {
            setError("Fill all the required fields.");
        }

    }

    function renderAddForm() {
        if (showForm) {
            return (
                <div className="px-2">
                    <div className="row py-3">
                        <div className="col-8">
                            <input required onChange={onFormChange} name="productName" type="text" className="form-control" placeholder="Product Name*" />
                        </div>
                        <div className="col">
                            <input required onChange={onFormChange} name="cost" type="number" className="form-control" placeholder="Cost*" />
                        </div>
                    </div>
                    <div className="form-group">
                        <input required onChange={onFormChange} name="photoUrl" type="text" className="form-control" placeholder="Photo Url*" />
                    </div>
                    <div className="form-group">
                        <textarea required onChange={onFormChange} name="materialsUsed" className="form-control" placeholder="Materials Used*"></textarea>
                    </div>
                    <div className="form-group">
                        <input required onChange={onFormChange} name="quote" type="text" className="form-control" placeholder="Advertisement Quote" />
                    </div>
                    <div className="form-check pl-4">
                        <input onChange={onFormChange} className="form-check-input" type="checkbox" value="featured" name="featured" />
                        <label className="form-check-label">
                            Featured
                        </label>
                    </div>
                    <div className="py-2">
                        <button onClick={onSubmitClick} type="submit" className="btn btn-primary">Submit</button>
                    </div>

                </div>
            );
        }
    }

    return (
        <div>
            <div className="row d-flex justify-content-between">
                <div className="col flex-grow-1 d-flex align-items-start">
                    <h3>{user.username}'s Gallery</h3><p style={{ color: 'white' }}>_</p> <p><span className="badge badge-info">{user.rating}</span></p>
                </div>

                <div className="col d-flex justify-content-end align-items-center">
                    <button onClick={() => { setShowForm(!showForm); setError(""); }} type="button" className="btn btn-outline-success">{showForm ? "Show Gallery" : "Add Invention"}</button>
                </div>
            </div>

            {showForm ? renderAddForm() : <div className="row d-flex justify-content-center">
                {inventions.filter(entry => entry.inventorName === user.username).map(inv => (<InventionCard userGallery={true} key={inv._id} invention={inv} />))}
            </div>}

        </div>
    )
}