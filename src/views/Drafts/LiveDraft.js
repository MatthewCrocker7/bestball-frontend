import React from "react";
// import { StickyContainer, Sticky } from 'react-sticky';
import Sticky from 'react-sticky-el';
import { makeStyles } from "@material-ui/core/styles";
import { successColor } from "../../assets/jss/material-dashboard-react.js";

import Cookies  from 'universal-cookie';
import WebSocketService from "../../utils/WebSocketService";
import HttpService from "../../utils/HttpService";
import api from "../../utils/api";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import DraftBoard from "../../components/Draft/DraftBoard";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Table from "../../components/Table/DraftTable.js";
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import moment from "../NewGame/NewGame";

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
    inviteDiv: {
        width: 'auto',
        height: 'auto',
        marginTop: '10px'
    },
    textField: {
        minWidth: 230,
    },
    formControl: {
        minWidth: 120,
    },
    notchedOutline: {
        borderWidth: "1px",
        borderColor: `${successColor[0]} !important`
    }
});

const useStyles = makeStyles(styles);
let client;

const LiveDraft = (props) => {
    const classes = useStyles();
    const offSet = 40;
    const [draft, updateDraft] = React.useState({});
    const [formData] = React.useState({
        email: cookies.get('email'),
        draftId: props.location.state.draftId
    });
    const [golfer, updateGolfer] = React.useState({});


    React.useEffect(() => {
        client = new WebSocketService(api.socketDraft, onClientConnect, onStompError);

        return () => {
          client.deactivate();
        };
    }, [draft.draftVersion]);

    const clientSubscription = (data) => {
        console.log('Draft refreshed');
        const result = JSON.parse(data.body);
        console.log(result);
        updateDraft(result);
    };

    const onClientConnect = () => {
        console.log("Draft client connected");
        const draftId = formData.draftId;
        client.subscribe(api.refreshDraft(draftId), clientSubscription);
        client.publish(api.loadDraft(draftId), formData);
    };

    const onStompError = () => {
        console.log('Client error');
    };

    const handleSelect = (event, name, rank, id) => {
        updateGolfer({
            name: name,
            playerId: id,
            rank: rank
        });
    };

    const handleDraft = () => {
        console.log('Drafting: ', golfer);
        const draftId = formData.draftId;

        client.publish(api.draftPlayer(draftId, golfer.playerId), formData);
    };

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
                        {draft.draftState === 'NOT_STARTED' ?
                            <NotStarted classes={classes} draft={draft} location={props.location} />
                            :
                            <div className="bodyContainer">
                                <GridContainer>
                                    <GridItem xs={12} sm={5}>
                                        <Sticky topOffset={-offSet} scrollElement=".bodyContainer">
                                            <DraftOrder classes={classes} draft={draft} email={formData.email}
                                                        golfer={golfer} handleDraft={handleDraft}/>
                                            <Roster classes={classes} draft={draft}/>
                                        </Sticky>
                                    </GridItem>
                                    <GridItem xs={12} sm={2}>
                                        <DraftBoard handleSelect={handleSelect}
                                                    draftBoard={draft.availablePgaPlayers ? draft.availablePgaPlayers : []}/>
                                    </GridItem>
                                    <GridItem xs={12} sm={5}>
                                        <Sticky topOffset={-offSet} scrollElement=".bodyContainer">
                                            <PgaPlayerInfo/>
                                        </Sticky>
                                    </GridItem>
                                </GridContainer>
                            </div>
                        }
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
        </div>

    );
};

const NotStarted = (props) => {
    const { classes, draft, location } = props;
    const [formData, updateFormData] = React.useState({
        email: cookies.get('email'),
        draftId: location.state.draftId,
        inviteEmail: ''
    });

    const handleChange = (e) => {
        const newData = Object.assign({}, formData);
        newData.inviteEmail = e.target.value;
        updateFormData(newData);
    };

    const handleInvite = () => {
        console.log('Invite sent to ', formData.inviteEmail);
        HttpService.post(api.addToDraft, formData, handleSuccess, handleError);
    };

    const handleSuccess = (data, status) => {
        console.log('Registration success!');

    };

    const handleError = (error) => {
        console.log('Error: ', error);
    };

    const draftIsFull = (draft.teams.length === draft.maxPlayers);

    return (
        <Grid container alignItems="center" spacing={3} className={classes.grid}>
            <Grid item xs={12} sm={12}>
                <Typography component="h5" variant="h5" align="center" className={classes.font}>
                    Draft will begin at {draft.startTime}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
            { !draftIsFull &&
                <Grid container alignItems="center" spacing={0} className={classes.grid}>
                    <Grid item xs={12} sm={12}>
                        <Typography component="h5" variant="h5" align="center" className={classes.font}>
                            {draft.teams.length} out of {draft.maxPlayers} people have joined this draft. Invite more players?
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} />
                    <Grid item xs={12} sm={2}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            className={classes.textField}
                            onChange={handleChange}
                            InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button variant="contained" size="large" className={classes.button} onClick={handleInvite}>Invite</Button>
                    </Grid>
                    <Grid item xs={12} sm={4} />
                </Grid>
            }
            </Grid>

        </Grid>

    );
};

const DraftOrder = React.forwardRef((props, ref) => {
    const { classes, draft, email, golfer, handleDraft } = props;
    if (!draft.currentPick) return;
    if (draft.draftState === 'COMPLETE') {
        return (
            <Typography component="h5" variant="h5" align="center" className={classes.font}>
                Draft complete
            </Typography>
        );
    }
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
                        Selected: {golfer.name}
                    </Typography>
                }
            </Grid>
            <Grid item xs={12} sm={4}>
                { userTurn &&
                    <Button variant="contained" size="large" className={classes.button} onClick={handleDraft}>Draft</Button>
                }
            </Grid>
            </Grid>
    );
});

const Roster = React.forwardRef((props, ref) => {
    const { classes, draft } = props;

    if (!draft.teams) return;

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

const PgaPlayerInfo = (props) => {
    return (
        <h1>player info column</h1>
    );

};

export default LiveDraft;


