import React from "react";

function AddCard({ deck }){
    const history = useHistory();
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
        const response = await updateDeck(formData);
        console.log("Updated:", formData);
        history.push(`/decks/${deck.id}`);    
      };

return (
    <>
        <form onSubmit={handleSubmit}>
        <h2>Edit Deck</h2>
        <div class="mb-3">
            <label htmlFor="front" className="form-label">Front</label>
            <textarea className="form-control" id="front" name="front" rows="3" onChange={handleChange} value={formData.back}></textarea>
        </div>
        <div class="mb-3">
            <label htmlFor="back" className="form-label">Back</label>
            <textarea className="form-control" id="back" name="back" rows="3" onChange={handleChange} value={formData.back}></textarea>
        </div>
        <Link to="/" type="button" className="btn btn-secondary">Cancel</Link>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
    )

}


export default AddCard