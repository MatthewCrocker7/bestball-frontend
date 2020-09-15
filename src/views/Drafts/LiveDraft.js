import React from "react";
// import { StickyContainer, Sticky } from 'react-sticky';
import Sticky from 'react-sticky-el';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { successColor } from "../../assets/jss/material-dashboard-react.js";

import Cookies  from 'universal-cookie';
import WebSocketService from "../../utils/WebSocketService";
import api from "../../utils/api";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import DraftBoard from "../../components/Draft/DraftBoard";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Table from "../../components/Table/DraftTable.js";
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";

const cookies = new Cookies();

const styles = () => ({
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
    grid: {
        width: 'auto',
        height: 'auto',
        marginTop: '10px',
        overflowX: 'visible',
    },
    font: {
      marginTop: '30px'
    },
    button: {
        margin: 'auto',
        background: successColor[0],
    },
    formControl: {
        minWidth: 120,
    },
});

let client;
class LiveDraft extends React.Component {
    constructor(props) {
        super(props);
        client = new WebSocketService(api.socketDraft, this.onClientConnect, this.onStompError);
    }
    state = {
        draft: {},
        formData: {
            email: cookies.get('email'),
            draftId: this.props.location.state.draftId
        }
    };

    componentDidMount = () => {

    };

    componentWillUnmount = () => {
        client.deactivate();
    };

    clientSubscription = (data) => {
        console.log('Draft refreshed');
        const result = JSON.parse(data.body);
        console.log(result);
        this.setState({ draft: result });
    };

    onClientConnect = () => {
        console.log("Draft client connected");
        const draftId = this.state.formData.draftId;
        client.subscribe(api.refreshDraft(draftId), this.clientSubscription);
        client.publish(api.loadDraft(draftId), this.state.formData);
    };

    onStompError = () => {
        console.log('Client error');
    };

    render = () => {
        const { classes } = this.props;
        const { draft, formData } = this.state;
        const offSet = 40;
        return (

            <div className="cardContainer">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader plain color="success">
                            <h4 className={classes.cardTitleWhite}>
                                Draft - The Masters 2020
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <div className="bodyContainer">
                            <GridContainer>
                                <GridItem xs={12} sm={5}>
                                    <Sticky topOffset={-offSet} scrollElement=".bodyContainer">
                                        <DraftOrder classes={classes} draft={draft} email={formData.email} />
                                        <Roster classes={classes} draft={draft} email={formData.email} />
                                    </Sticky>
                                </GridItem>
                                <GridItem xs={12} sm={2}>
                                    <DraftBoard draftBoard={draft.availablePgaPlayers ? draft.availablePgaPlayers : []} />
                                </GridItem>
                                <GridItem xs={12} sm={5}>
                                    <Sticky topOffset={-offSet} scrollElement=".bodyContainer">
                                        <PgaPlayerInfo />
                                    </Sticky>
                                </GridItem>
                            </GridContainer>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            </div>

        );
    };
};

const DraftOrder = React.forwardRef((props, ref) => {
    const { classes, draft, email } = props;
    if (!draft.currentPick) return;
    const currentPick = draft.draftOrder[draft.currentPick];
    const userTurn = (currentPick.email === email);

    return (
        <Grid container alignItems="center" spacing={3} className={classes.grid}>
            <Grid item xs={12} sm={8}>
                <Typography component="h5" variant="h5" align="left" className={classes.font}>
                    Currently picking: {currentPick.userName}
                </Typography>
                { userTurn &&
                    <Typography component="h5" variant="h5" align="left" className={classes.font}>
                        Selected: Dustin Johnson
                    </Typography>
                }
            </Grid>
            <Grid item xs={12} sm={4}>
                { userTurn &&
                    <Button variant="contained" size="large" className={classes.button}>Draft</Button>
                }
            </Grid>
            </Grid>
    );
});

const Roster = React.forwardRef((props, ref) => {
    const { classes, draft, email } = props;

    if (!draft.teams) return;

    const getDefaultUser = () => {
        return draft.teams.filter(team => team.userInfo.email === email);
    };

    const [ defaultUser, updateDefaultUser ] = React.useState(getDefaultUser);
    const [ value, updateValue ] = React.useState(defaultUser[0].userInfo.userId);

    const handleRosterUpdate = (event) => {
        updateValue(event.target.value);
    };



    const mapTeams = (teams) => {

        return teams.map(team => ({
            test: true,
            cellData: [
                team.userInfo.userName,
                team.golferOne ? team.golferOne.playerName : '-',
                team.golferTwo ? team.golferTwo.playerName : '-',
                team.golferThree ? team.golferThree.playerName : '-',
                team.golferFour ? team.golferFour.playerName : '-']
        }));
    };



    // const teams = draft.teams.filter(team => team.userInfo.email !== email);

    return (
        <Grid container alignItems="center" alignspacing={3} className={classes.grid}>
            <Grid item xs={12} sm={12}>
                <Table
                    tableHeaderColor="success"
                    tableHead={["User", "Golfer One", "Golfer Two", "Golfer Three", "Golfer Four"]}
                    tableData={mapTeams(draft.teams)}
                />
            </Grid>
        </Grid>
    )
});

/*
<Grid container alignItems="center" alignspacing={3} className={classes.grid}>
            <Grid item xs={12} sm={5}/>
            <Grid item xs={12} sm={4}>
                <FormControl className={classes.formControl}>
                  <InputLabel>Player</InputLabel>
                  <Select
                      value={value}
                      onChange={handleRosterUpdate}
                  >
                      {defaultUser.map(user => <MenuItem key={user.userInfo.userId} value={user.userInfo.userId}>{user.userInfo.userName}</MenuItem>)}
                      {teams.map(team => <MenuItem key={team.userInfo.userId} value={team.userInfo.userId}>{team.userInfo.userName}</MenuItem>)}
                  </Select>
                  <FormHelperText>Rosters</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}/>
        </Grid>
 */

const PgaPlayerInfo = (props) => {
    return (
        <h1>player info column</h1>
    );

};

export default withStyles(styles)(LiveDraft);


