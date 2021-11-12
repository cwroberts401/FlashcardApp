import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createCard } from "../utils/api/index.js";

function NewCard({setTrigger, trigger, deck}){
    const initialFormState = {
        id: "",
        front: "",
        back: "",
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
        await createCard(deck.id, formData);
        setTrigger(trigger + 1);
        console.log("Updated:", formData);
        setFormData({ ...initialFormState });    
      };

return (
    <>
        <form onSubmit={handleSubmit}>
        <h2>{`Add Card`}</h2>
        <div class="mb-3">
            <label htmlFor="front" className="form-label">Front</label>
            <textarea className="form-control" id="front" name="front" rows="3" onChange={handleChange} value={formData.front}></textarea>
        </div>
        <div class="mb-3">
            <label htmlFor="back" className="form-label">Back</label>
            <textarea className="form-control" id="back" name="back" rows="3" onChange={handleChange} value={formData.back}></textarea>
        </div>
        <Link to={`/decks/${deck.id}`} type="button" className="btn btn-secondary">Cancel</Link>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
    )

}

export default NewCard;