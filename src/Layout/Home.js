import React from "react";
import Deck from "./Deck.js";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


function Home ({ decks }) {

    return (
        <>
            <Link to="/decks/new"className="btn btn-secondary"><FontAwesomeIcon icon={faPlus} /> Create Deck </Link>           
            <Deck decks={decks}/>
        </>

    )
}

export default Home;