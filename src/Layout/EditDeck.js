import React, { useState, useEffect } from "react";
import {Link, useHistory} from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api/index.js";

function EditDeck({setTrigger, trigger, deck}){
    const history = useHistory();

    const [formData, setFormData] = useState({id:null,name:"",description:""});
    useEffect(() => {
        async function getCard(){
            const response = await readDeck(deck.id);
            setFormData(response) 
        }
        getCard();
        
    },[deck]);
        
    const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
      };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateDeck(formData);
        setTrigger(trigger + 1);
        history.push(`/decks/${deck.id}`);    
    };

return (
    <>
        <form onSubmit={handleSubmit}>
            <h2>Edit Deck</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handleChange} value={formData.name}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" rows="3" onChange={handleChange} value={formData.description}></textarea>
                </div>
            <Link to="/" type="button" className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
    )

}

export default EditDeck;