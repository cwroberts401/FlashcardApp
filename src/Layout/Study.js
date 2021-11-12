import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import { readDeck } from "../utils/api/index.js";

function Study({decks}) {

    const [deck, setDeck] = useState({})
    const params = useParams();
    const deckId = params.deckId;
    const [cards, setCards] = useState([]);
    const [int, setInt] = useState(0);
    const [cardText, setCardText] = useState("");
    const [cardFront, setCardFront] = useState(true);
    const history = useHistory();

    useEffect(() => {
        async function findDeck(){
            const response = await readDeck(deckId);
            setDeck(response);
            setCards(response.cards);
            if(response.cards.length > 0 ){
            setCardText(response.cards[int].front)}}
            findDeck()      
        }, [deckId, int]);
        console.log(deck)

    function nextCard() {
        setInt(int+1);
        setCardText(cards[int].front);
        setCardFront(true);
    }
    
    

    
    if (cards.length > 2) {
    return(     
        <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
                <li className="breadcrumb-item"><Link to="/">Library</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Data</li>
            </ol>
        </nav>
        <h3>{`${deck.name}`}</h3>
        <div className="card">
        <div className="card-body">
        <h5 className="card-title">{`Card ${int+1} of ${cards.length}`}</h5>
        <p className="card-text">{cardText}</p>
        <button className="btn btn-secondary" type="button" onClick={() => cardFront? (setCardText(cards[int].back), setCardFront(false)):(setCardText(cards[int].front), setCardFront(true))}>Flip</button>
        {cardFront? null : <button className="btn btn-primary" type="button" onClick={() => (int+1) < cards.length? nextCard():window.confirm("Reset Deck? Cancel will bring you to homepage")?(setInt(0),setCardFront(true)):history.push("/")}>Next</button>}
        </div>
        </div>

        </>) } else {return (
        <>
         <nav aria-label="breadcrumb">
             <ol className="breadcrumb">
                 <li className="breadcrumb-item"><Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
                 <li className="breadcrumb-item"><Link to="/">Library</Link></li>
                 <li className="breadcrumb-item active" aria-current="page">Data</li>
             </ol>
         </nav>
         <h3>{`${deck.name}`}</h3>
         <h5>Not Enough Cards</h5>
         <p>{`You need at least 3 cards to study. There are ${cards.length} cards in this deck.`}</p>
         <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /> Add Cards</Link>
         </>    
        )}

}

export default Study;

