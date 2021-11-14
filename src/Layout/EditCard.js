import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, updateCard, createCard } from "../utils/api/index.js";

function EditCard({ deck }){
    const history = useHistory();
    const params = useParams();
    const cardId = params.cardId;
    const initialState = {id: "", front: "", back: "",};
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if(cardId !== undefined){
        async function getCard(){
            const response = await readCard(cardId);
            setFormData(response)   
        }
        getCard();}
    },[cardId]);
  
    const handleChange = ({ target }) => {
       setFormData({
         ...formData,
         [target.name]: target.value,
       });
     };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        if (cardId !== undefined)
        {updateCard(formData)
        history.push(`/decks/${deck.id}`);  
        } else {
        await createCard(deck.id, formData);
        setFormData(initialState);
        history.push(`/decks/${deck.id}/cards/new`)
        };

        
      };

return (
    <>
        <form onSubmit={handleSubmit}>
        {cardId === undefined?<h2>{`Add Card`}</h2>:<h2>{`${deck.name}: Edit Card`}</h2>}
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