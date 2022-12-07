
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { createPlan } from "../trips";
import { Navigate,
        useNavigate,
     } from 'react-router-dom';

export async function action (){
    // something else
}

export default function NewPlanForm() {
    const navigate = useNavigate();
    const [planInfo, setPlanInfo] = useState({
        trip_id: "",
        plantype_id: "",
        name: "",
        departure_date: "",
        arrival_date: "",
        dep_location: "",
        arr_location: "",
        ticket_info: "",
        vehicle_info: "",
        room_info: "",
        link: "",
        notes: "",
  });

    const handleChange = (event) => {
        setPlanInfo({...planInfo, [event.target.name]: event.target.value });
    };
  
    const handleSubmit= (event) => {
        event.preventDefault();
        console.log(planInfo);
        addPlan();
        setPlanInfo({ 
            trip_id: "",
            plantype_id: "",
            name: "",
            departure_date: "",
            arrival_date: "",
            dep_location: "",
            arr_location: "",
            ticket_info: "",
            vehicle_info: "",
            room_info: "",
            link: "",
            notes: "",
        });
    };
    
    const addPlan = () => {
        var data = planInfo;
        
        axios.post('https://8000-lynz951-tripwizardbacke-gwc815o36p3.ws-us77.gitpod.io/api/plan/', 
        data, 
        {
            'content-type': 'application/json'
        }
        )
        .then(function (response) {
            createPlan(response.data); // ??
        })
        .catch(function (error) {
            console.log(error);
        });
        
    };

  return (
    <>
    <div className="">
        <div className="">
        <h2>Create Plan</h2>
        <form>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Plan Name</label>
                <div className="col-sm-10">
                    <input type="text" 
                            name="name" 
                            placeholder="planName"
                            value={planInfo.name} onChange={handleChange}
                            />
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Departure Date</label>
                <div className="col-sm-10">
                    <input type="date" 
                            name="departure_date" 
                            placeholder="Departure Date"
                            value={planInfo.departure_date} onChange={handleChange}
                            />
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Arrival Date</label>
                <div className="col-sm-10">
                    <input type="date" 
                            name="arrival_date" 
                            id="Arrival Date"
                            value={planInfo.arrival_date} onChange={handleChange}
                            />
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Notes</label>
                <div className="col-sm-10">
                    <input type="text" 
                            name="notes" 
                            id="Plan Notes"
                            value={planInfo.notes} onChange={handleChange}/> 
                </div>
            </div>
            <button type="submit" 
                onClick={handleSubmit}
                >
                Save Plan
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