import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FolderIcon from '@material-ui/icons/Folder';
import './Footer.scss';
import variables from '../../assets/styles/variables.scss';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'block'
    },
    bottomNavogation: {
        backgroundColor: `${variables.primaryLight}`
    },
    // navigationButton: {
    //     backgroundColor: `${variables.pureWhite}`
    // }
}));

const Footer = (props) => {

    const [value, setValue] = React.useState('recents');
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <footer className={classes.root}>
            <BottomNavigation className={classes.bottomNavogation} value={value} onChange={handleChange}>
                <BottomNavigationAction className={classes.navigationButton} label="Recents" value="recents" icon={<RestoreIcon />} />
                <BottomNavigationAction className={classes.navigationButton} label="Favorites" value="favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction className={classes.navigationButton} label="Folder" value="folder" icon={<FolderIcon />} />
            </BottomNavigation>
        </footer>
    );
}

export default Footer;

