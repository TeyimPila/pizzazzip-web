import React from 'react';
import { Divider } from 'semantic-ui-react';

const AboutPage = () => (
    <main className="p-3 animated fadeIn">
        <h1 className={'text-center'}>This is pizzAzzip!</h1>
        <h5 className={'text-center'}>...weird name right? lol. We know!</h5>

        <Divider section />

        <p>
            We are without and epitome of doubt, the best pizza delivery shop that ever existed. Such a bold claim
            you&apos;d
            say. But why is this? Well, for one simple reason. All orders are free!! But there is a catch, which is,
            you&apos;d never receive your orders :)
        </p>

        <Divider section />

        This is our website and it is built using the following:
        <ul>
            <li>ReactJS</li>
            <li>Redux for state management</li>
            <li>Semantic UI React for interface design and layout</li>
            <li>Webpack</li>
            <li>Babel</li>
            <li>ESLint to make sure code adheres to standards</li>
            <li>SCSS for styling</li>
            <li>React Router for navigation</li>
            <li>A typical project layout structure</li>
        </ul>
    </main>
);

export { AboutPage };
