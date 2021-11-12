import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, updateCard } from "../utils/api/index.js";

function EditCard({setTrigger, trigger, deck, cards}){
    const history = useHistory();
    const params = useParams();
    const cardId = params.cardId;
    const [formData, setFormData] = useState({});

    useEffect(() => {
        async function getCard(){
            const response = await readCard(cardId);
            setFormData(response)   
        }
        getCard();
        
    },[cardId]);
    
      const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        updateCard(formData)

        console.log("Updated:", formData);
        history.push(`/decks/${deck.id}`);  
        setTrigger(trigger+1); 
      };

return (
    <>
        <form onSubmit={handleSubmit}>
        <h2>{`${deck.name}: Edit Card`}</h2>
        <div className="mb-3">
            <label htmlFor="front" className="form-label">Front</label>
            <textarea className="form-control" id="front" name="front" rows="3" onChange={handleChange} value={formData.front}></textarea>
        </div>
        <div className="mb-3">
            <label htmlFor="back" className="form-label">Back</label>
            <textarea className="form-control" id="back" name="back" rows="3" onChange={handleChange} value={formData.back}></textarea>
        </div>
        <Link to={`/decks/${deck.id}`} type="button" className="btn btn-secondary">Cancel</Link>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
    )

}

export default EditCard;