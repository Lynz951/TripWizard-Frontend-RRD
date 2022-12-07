
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { createTrip } from "../trips";
import { Navigate,
        useNavigate,
     } from 'react-router-dom';

export async function action (){
    // something else
}

export default function NewTripForm() {
    const navigate = useNavigate();
  const [tripInfo, setTripInfo] = useState({
    name: "",
    start_date: "",
    end_date: "",
    description: "",
  });
    const handleChange = (event) => {
        setTripInfo({...tripInfo, [event.target.name]: event.target.value });
    };
  
    const handleSubmit= (event) => {
        event.preventDefault();
        console.log(tripInfo);
        addTrip();
        setTripInfo({ name: "", start_date: "", end_date: "", description: ""});
    };
    
    const addTrip = () => {
        var data = tripInfo;
        
        axios.post('https://8000-lynz951-tripwizardbacke-gwc815o36p3.ws-us77.gitpod.io/api/trip/', 
        data, 
        {
            'content-type': 'application/json'
        }
        )
        .then(function (response) {
            createTrip(response.data); // ??
        })
        .catch(function (error) {
            console.log(error);
        });
        
    };

  return (
    <>
    <div className="">
        <div className="">
        <h2>Create Trip</h2>
        <form>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Trip Name</label>
                <div className="col-sm-10">
                    <input type="text" 
                            name="name" 
                            placeholder="tripName"
                            value={tripInfo.name} onChange={handleChange}
                            />
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Start Date</label>
                <div className="col-sm-10">
                    <input type="date" 
                            name="start_date" 
                            placeholder="Start Date"
                            value={tripInfo.start_date} onChange={handleChange}
                            />
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">End Date</label>
                <div className="col-sm-10">
                    <input type="date" 
                            name="end_date" 
                            id="End Date"
                            value={tripInfo.end_date} onChange={handleChange}
                            />
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-10">
                    <input type="text" 
                            name="description" 
                            id="Trip Description"
                            value={tripInfo.description} onChange={handleChange}/>
                            
                </div>
            </div>
            
            <button type="submit" 
                    onClick={handleSubmit}
                    >
                    Save Trip
            </button>
            <button type="button" 
                    onClick={() => { 
                    navigate(-1);
            }}
            >
                    Cancel
            </button>
        </form>
        </div>
    </div>
    </>
  );
}