import React, { Component } from 'react';
import LionizeCard from '../../components/bussiness-components/LionizeCard';
import './Main.scss';

class Main extends Component {
    render() {
        return (
            <div className="main-container border-box">
                <LionizeCard number={1} />
                <LionizeCard number={2} />
                <LionizeCard number={3} />
                <LionizeCard number={4} />
            </div>
        );
    }
}

export default Main;
