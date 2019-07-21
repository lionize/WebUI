import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FolderIcon from '@material-ui/icons/Folder';
import './Footer.scss';
import '../../assets/styles/variables.scss';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'block',
        backgroundColor: 'rgba($primary, 0.5)' //todo fix
    }
}));

const Footer = (props) => {

    const [value, setValue] = React.useState('recents');
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <footer className={classes.root}>
            <BottomNavigation value={value} onChange={handleChange}>
                <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
            </BottomNavigation>
        </footer>
    );
}

export default Footer;

