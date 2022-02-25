# FlashCard App

> A simple study tool built using React.js

This study app allows users to create decks of flashcards and then go through them indivudually and study.


## Features
### Homepage
This is the main page, here all the user created decks are dispayed. From this page the user can select a deck to study from, add a card to an existing deck, or create a new deck.
![](https://github.com/cwroberts401/FlashcardApp/blob/main/Screen%20Shot%202022-02-25%20at%205.22.39%20PM.png)


### Deck
This page shows all the cards in the deck, from here the user can add a card or start studying from the selected deck.
![](https://github.com/cwroberts401/FlashcardApp/blob/main/Screen%20Shot%202022-02-25%20at%205.22.58%20PM.png)


### Study
Once a deck is selected from the decks page, the front of the first card is displayed by default. Once the user selects "flip" the user is then allowed to move on to the next card, where the front is again displayed by default. There is also an edit button that allows the user to edit the contents of each card.
![](https://github.com/cwroberts401/FlashcardApp/blob/main/Screen%20Shot%202022-02-25%20at%205.23.32%20PM.png)


### New Deck
Here the user creates a new deck, you can create the title and then add as many cards as you want.
![](https://github.com/cwroberts401/FlashcardApp/blob/main/Screen%20Shot%202022-02-25%20at%205.24.02%20PM.png)


### New/Edit Card
Here the user can create a new card by adding text to the front and back or can edit an alredy existing card, if editing, the exisitng card data is populated by default.
![](https://github.com/cwroberts401/FlashcardApp/blob/main/Screen%20Shot%202022-02-25%20at%205.23.52%20PM.png)


## Local Installation
1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.



