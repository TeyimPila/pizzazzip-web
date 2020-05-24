import React from 'react';
import { Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HomePage = () => (
    <main>
        <div className="jumbotron jumbotron-fluid text-dark bg-light animated fadeIn">
            <h1 className={'text-center'}>This is pizzAzzip!</h1>
            <h5 className={'text-center'}>...weird name right? lol. We know!</h5>

            <Divider section />

            <p className={'text-center'}>
                Checkout our <Link to={'/shop'}>Menu</Link> for our latest collection of hot 🔥 pizza delicacies
            </p>

        </div>
    </main>
);

export { HomePage };
