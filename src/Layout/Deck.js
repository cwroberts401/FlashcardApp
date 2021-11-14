import React from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faBook, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { deleteDeck } from "../utils/api";




function Deck ({ decks }) {
    const history = useHistory();
    const deck = decks

    





    return (
        <>
        {deck.map((deck) => (
        <div key={deck.id} className="card w-75">
            <div className="card-body">
                <h3 className="card-title"> {`${deck.name}`} </h3>
                <h4 className="card-text"><small className="text-muted"> {`${deck.cards.length} cards`} </small></h4>
                <p className="card-text"> {`${deck.description}`} </p>
                <button type="button" onClick={() => history.push(`/decks/${deck.id}`)} className="btn btn-secondary"><FontAwesomeIcon icon={faEye} /> View</button>
                <button type="button" onClick={() => history.push(`/decks/${deck.id}/study`)} className="btn btn-primary"><FontAwesomeIcon icon={faBook} /> Study</button>
                <button type="button" onClick={() => (window.confirm("Delete this deck?")?(deleteDeck(deck.id),history.push(`/`)):console.log("dont del"))} className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} /></button>
            </div>
        </div>))}
        </>
    )
}

export default Deck;