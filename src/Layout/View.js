import React, { useState, useEffect } from "react";
import { Route, Switch, Link, useParams, useHistory } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faPlus, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index.js";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";

function View ({trigger, setTrigger}) {

    const [deck, setDeck] = useState({})
    const params = useParams();
    const deckId = params.deckId;
    const [cards, setCards] = useState([])
    const history = useHistory()

    useEffect(() => {
        async function findDeck(){
            const response = await readDeck(deckId);
            setDeck(response);
            setCards(response.cards)}
            findDeck()      
        }, [deckId, trigger]);


    return (
        <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
                <Switch>
                    <Route path="/decks/:deckId/edit">
                        <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit</li>
                    </Route>
                    <Route path="/decks/:deckId/cards/new">
                        <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add New Card</li>
                    </Route>
                    <Route path="/decks/:deckId/cards/:cardId/edit">
                        <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Card</li>
                    </Route>
                    <Route path="/decks/:deckId">
                        <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                    </Route>
                </Switch>
            </ol>
        </nav>
        <Switch>
            <Route path="/decks/:deckId/edit">
                <EditDeck deck={deck} trigger={trigger} setTrigger={setTrigger}/>
            </Route>
            <Route path="/decks/:deckId/cards/new">
                <EditCard deck={deck} trigger={trigger} setTrigger={setTrigger}/>
            </Route>
            <Route path="/decks/:deckId/cards/:cardId/edit">
                <EditCard setTrigger={setTrigger} trigger={trigger} deck={deck} cards={cards}/>
            </Route>
            <Route path="/decks/:deckId">
            <h4>{deck.name}</h4>
            <p>{deck.description}</p>
            <button type="button" className="btn btn-secondary" onClick={() => history.push(`/decks/${deck.id}/edit`)}><FontAwesomeIcon icon={faEye} /> Edit</button>
            <button type="button" className="btn btn-primary" onClick={() => history.push(`/decks/${deck.id}/study`)}><FontAwesomeIcon icon={faBook} /> Study</button>
            <button className="btn btn-secondary" onClick={() => history.push(`/decks/${deck.id}/cards/new`)}><FontAwesomeIcon icon={faPlus} /> Add Cards </button>
            <button type="button" onClick={() => (window.confirm("Delete this deck?")?(deleteDeck(deck.id),history.push("/"),setTrigger(trigger+1)):console.log("dont del"))} className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} /></button>
            <h3>Cards</h3>
            {cards.map((card) => (
            <div key={card.id} className="card">
                <div className="card-body">
                    <h5 className="card-title">{card.front}</h5>
                    <p className="card-text">{card.back}</p>
                    <button className="btn btn-secondary" type="button" onClick={() => history.push(`/decks/${deck.id}/cards/${card.id}/edit`)}>Edit</button>
                    <button type="button" onClick={() => (window.confirm("Delete this card?")?deleteCard(card.id)&&setTrigger(trigger+1):console.log("dont del"))} className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} /></button>
                </div>
            </div>))}
            </Route>
        </Switch>
        </>
    )
}

export default View;