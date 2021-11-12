import React, { useState, useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import Study from "./Study";
import View from "./View";
import CreateDeck from "./CreateDeck";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom";
import { listDecks } from "../utils/api/index.js";

function Layout() {
  const [decks, setDecks] = useState([]); 
  const [trigger, setTrigger] = useState(0)   
    
    useEffect(() => {
        async function getDecks(){
            const response = await listDecks();
            setDecks(response);      
        }
        getDecks();    
    },[trigger]);

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home decks={decks} trigger={trigger} setTrigger={setTrigger}/>
          </Route>
          <Route path="/decks/:deckId/study">
            <Study decks={decks}/>
          </Route>
          <Route path="/decks/new">
            <CreateDeck trigger={trigger} setTrigger={setTrigger}/>
          </Route>
          <Route path="/decks/:deckId">
            <View decks={decks} trigger={trigger} setTrigger={setTrigger}/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
