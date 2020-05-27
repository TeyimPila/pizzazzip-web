# PizzAzziP [Summarised] System Requirements Specification

# Introduction
This document outlines the technical and non-technical requirements, specifications, and considerations made in the implementation
 of a simple ReactJS frontend (client) to consume an API
 
This document also outlines the development stack, implementation consideration, assumptions made, design consideration and reasons behind the decisions and assumptions made.

# Running the application
To run the application, make sure you already have node installed. Then:
- Clone this repository (a ReactJS application) 
- Install the dependencies
- Clone and run the backend following the instruction in [this repository](https://github.com/TeyimPila/pizzazzip-api)
- Start the development server by running `npm run start:dev`

If all goes well, the application should be up and running.

This application has been hosted on heroku here: https://pizzazzip.herokuapp.com

# Design and implementation Considerations

## Assumptions
In implementing this REST API, the following assumptions were made:

- Users do not need to be authenticated to use the application
- Users won't be able to make payments and view previous orders
- Users won't log in to maintain their orders. Each order for pizzas is placed with a new address and user contact details, which are stored each time, unless if the contact details contain a existing email address or phone number.

# Technology Stack
- This is implemented using ReactJS, Redux, Webpack, and Semantic UI React as the UI framework.


## Limitations
- Users cannot see previously placed orders
- Users cannot login
- Items cannot be edited on the cart page
- Orders can't be processed and payment is not implemented

# Non Functional Requirements
## Usability
I implemented the app to be very intuitive and easily usable by anyone

## Supportability and Extensibility
The code can easily be managed and extended to add new features. This is made possible by my
observation of some key software engineering principles such as Single responsibility principle, DRY,
proper documentation, and overall code simplicity.

# Further Improvements
- Make it possible to edit items in the cart.
- Retrieve the current exchange rate between Euros and Dollars from a live server so that prices are always up to date.
- Break down some components further into smaller reusable components to reduce ant form of repetition
- Provide more feedback when users take actions.
- Add more form validation constraints to maintain data integrity

# Challenges
- Reaching a decision about which UI layout is best was a challenge. They're always many possibilities.
- Deploying the application successfully was challenging.
