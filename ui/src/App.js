import React, { Component } from 'react';
import Header from './components/header/Header';
import Main from './containers/main/Main';
import Footer from './components/footer/Footer';
import './App.scss';

class App extends Component {
    render() {
        return (
            <div className="app-container flex-self flex-vertical">
                <Header />
                <Main />
                <Footer />
            </div>
        );
    }
}

export default App;
