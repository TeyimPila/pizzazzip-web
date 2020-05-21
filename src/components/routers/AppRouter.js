import React, { Fragment } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Header } from '../Header/Header';
import { HomePage } from '../pages/HomePage/HomePage';
import { AboutPage } from '../pages/AboutPage/AboutPage';
import ShopPage from '../pages/ShopPage/ShopPage';
import BuilderPage from "../pages/BuilderPage/BuilderPage";

export const AppRouter = () => (
    <BrowserRouter>
        <Fragment>
            <BrowserRouter>
                <Header />
                <div style={{ padding: '50px 50px 0 50px' }}>
                    <Switch>
                        <Route path="/" component={HomePage} exact={true} />
                        <Route exact={true} path="/shop" component={ShopPage} />
                        <Route exact path="/builder/:id" component={BuilderPage} />
                        <Route exact path="/about" component={AboutPage} />
                        <Redirect to="/" />
                    </Switch>
                </div>
            </BrowserRouter>
        </Fragment>
    </BrowserRouter>
);
