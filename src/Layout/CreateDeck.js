import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { createDeck } from "../utils/api/index.js";


function NewDeck(){
    const history = useHistory();
    const initialFormState = {
        id: "",
        name: "",
        description: "",
      };
      const [formData, setFormData] = useState({ ...initialFormState });
      const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await createDeck(formData);
        console.log("Submitted:", formData);
        history.push(`/decks/${response.id}`) 
   
      };
    

    return (
    <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
            </ol>
        </nav>
        <form onSubmit={handleSubmit}>
        <h2>Create Deck</h2>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" onChange={handleChange} value={formData.name}/>
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name="description" rows="3" onChange={handleChange} value={formData.description}></textarea>
        </div>
        <Link to="/" type="button" className="btn btn-secondary">Cancel</Link>
        <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    </>
    )

}

export default NewDeck;