import React from 'react'
import { useState } from 'react';
import '../styles/feedback.css'
import axios from 'axios';
function Feedback() {
  const [state, setState] = useState({ name: "" ,email: "", message: "" });

  const handleChange = e =>{
    const name = e.target.name;
    const value = e.target.value;
    

    setState({ ...state, [name] : value });

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(state.name === ""){
      alert("name should not be empty");
      return;
    }
    if(state.name.length < 3){
      alert("name should be at least 3 characters");
      return;
    }
    if(state.email === ""){
      alert("please enter a valid email");
      return;
    }
    if(state.message === ""){
      alert("message should not be empty");
      return;
    }
    
    
    try {
       await axios.post(`https://node-mysql-restocafe.onrender.com/feedback`, state);
       alert(" Your feedback was submitted successfully");
       setState({ name: "", email: "", message: "" });
    } catch (err) {
      console.log(err);
      alert("There was an error submitting your feedback");
    }
  
  };



  


  return (
    <div className="feedback">

        <h1> Feedback</h1>

        <form id="contact-form" onSubmit={handleSubmit} >
          <label htmlFor="name">Full Name</label>
          <input name="name" placeholder="Enter full name..." type="text" onChange={handleChange}/>
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="Enter email..." type="email" onChange={handleChange} />
          <label htmlFor="message">Message</label>
          <textarea
            rows="6"
            placeholder="Enter message..."
            name="message"
            required onChange={handleChange}
          ></textarea>
          <button type="submit" > Send Message</button>
        </form>
      
    </div>
  );
}

export default Feedback;
