import React from 'react';
import Button from '@material-ui/core/Button';
import './Main.scss';

class Main extends React.Component {
    render() {
        return (
            <div className="main-container">
                Main
                <Button variant="contained" color="primary" className="horizontal-margin-5">
                    Button EXAMPLE
                </Button>
                <i className="material-icons">
                    file_copy
                </i>
            </div>
        );
    }
}

export default Main;
