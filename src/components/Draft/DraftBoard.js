import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
    root: {
        width: 'auto',
        margin: 'auto'
    },
    textStyle: {
        textAlign: 'left',
        wordWrap: 'break-word',
        marginLeft: '1%'
    }
};

const sortPgaPlayers = (pgaPlayers) => {
    return pgaPlayers.sort((a, b) => (a.rank > b.rank) ? 1 : -1);
};

const useStyles = makeStyles(styles);

const Draftboard = (props) => {
    const { draftBoard, style } = props;
    const [golfer, updateGolfer] = React.useState({});
    const [selectedIndex, updateSelectedIndex] = React.useState(0);
    const classes = useStyles();

    const handleListItemClick = (event, name, rank, id) => {
        updateGolfer({ playerId: id });
        updateSelectedIndex(rank);
    };

    return (
        <div className={classes.root}>
            <List dense component="ul">
                {sortPgaPlayers(draftBoard).map(x => (
                    <ListItem
                        key={x.playerId}
                        button
                        selected={selectedIndex === x.rank}
                        onClick={event => handleListItemClick(event, x.playerName, x.rank, x.playerId)}
                    >
                        <ListItemText
                            primary={x.playerName}
                            secondary={(
                                <React.Fragment>
                                    {'Rank - '}
                                    {x.rank}
                                </React.Fragment>
                            )}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Draftboard;
