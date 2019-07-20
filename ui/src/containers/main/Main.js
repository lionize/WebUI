import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './Main.scss';

class Main extends Component {
    render() {
        return (
            <div className="main-container">
                Main
                <Button variant="contained" color="primary" className="horizontal-margin-5">
                    Button EXAMPLE
                </Button>
            </div>
        );
    }
}

export default Main;
