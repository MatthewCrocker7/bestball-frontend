import React from "react";
import 'date-fns';
import moment from 'moment';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers';

import HttpService from "../../utils/HttpService";
import api from "../../utils/api";
import Cookies  from 'universal-cookie';

const cookies = new Cookies();

const styles = {
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
  tableUpgradeWrapper: {
    display: "block",
    width: "100%",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    MsOverflowStyle: "-ms-autohiding-scrollbar"
  },
  table: {
    width: "100%",
    maxWidth: "100%",
    marginBottom: "1rem",
    backgroundColor: "transparent",
    borderCollapse: "collapse",
    display: "table",
    borderSpacing: "2px",
    borderColor: "grey",
    "& thdead tr th": {
      fontSize: "1.063rem",
      padding: "12px 8px",
      verticalAlign: "middle",
      fontWeight: "300",
      borderTopWidth: "0",
      borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
      textAlign: "inherit"
    },
    "& tbody tr td": {
      padding: "12px 8px",
      verticalAlign: "middle",
      borderTop: "1px solid rgba(0, 0, 0, 0.06)"
    },
    "& td, & th": {
      display: "table-cell"
    }
  },
  center: {
    textAlign: "center"
  }
};

const buyInMarks = [
  {
    value: 0,
    label: '$0.00'
  },
  {
    value: 100,
    label: '$100.00'
  },
];

const playerMarks = [
  {
    value: 4,
    label: 4
  },
  {
    value: 6,
    label: 6
  },
  {
    value: 8,
    label: 8
  },
  {
    value: 10,
    label: 10
  }
];

const useStyles = makeStyles(styles);


const NewGame = () => {
  const [gameType, setGameType] = React.useState('public');
  const [tournament, setTournament] = React.useState();
  const [tournaments, setTournaments] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState();//React.useState(new Date('2014-08-18T21:11:54'));
  const [formData, updateFormData] = React.useState({
    email: cookies.get('email'),
    gameType: 'public',
    numPlayers: 6,
    buyIn: 0,
    draftDate: moment().format(),
    tournamentId: ''
  });

  React.useEffect(() => {
    HttpService.get(api.upcomingTournaments, null, getTournamentsSuccess, getTournamentsError);
  }, []);

  const getTournamentsSuccess = (data, status) => {
    setTournaments(data.data);
    const newData = Object.assign({}, formData);
    newData.tournamentId = data.data[0].tournamentId;
    updateFormData(newData);
  };

  const getTournamentsError = (error) => {
    console.log(error);
  };

  const handleTournamentSelect = (event) => {
    setTournament(event.target.value);
    const newData = Object.assign({}, formData);
    newData.tournamentId = event.target.value.tournamentId;
    updateFormData(newData);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const newData = Object.assign({}, formData);
    newData.draftDate = moment(date).format();
    updateFormData(newData);
    console.log(formData);
  };

  const handleGameTypeChange = (event) => {
    setGameType(event.target.value);
    const newData = Object.assign({}, formData);
    newData.gameType = event.target.value;
    updateFormData(newData);
  };

  const buyInText = (value) => {
    return `$${value}.00`;
  };

  const handleBuyInChange = (event, value) => {
    const newData = Object.assign({}, formData);
    newData.buyIn = value;
    updateFormData(newData);
  };

  const handleNumPlayersChange = (event, value) => {
    const newData = Object.assign({}, formData);
    newData.numPlayers = value;
    updateFormData(newData);
  };

  const handleNewGame = async (e) => {
    e.preventDefault();
    console.log('Submit new game');
    console.log(formData);

    HttpService.post(api.newGame, formData, handleSuccess, handleError);
  };

  const handleSuccess = (data, status) => {
    console.log('Registration success!');

  };

  const handleError = (error) => {
    console.log('Error: ', error);
  };

  const classes = useStyles();
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="success">
            <h3 className={classes.cardTitleWhite}>
              New Game
            </h3>
            <p className={classes.cardCategoryWhite}>
              Choose your game settings and then submit a new game.
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleNewGame}>
              <Grid container alignItems="center" spacing={3}>
                <Grid item xs={12} sm={3} />
                <Grid item xs={12} sm={3}>
                  <Typography component="h5" variant="h5" align="center">
                    Game Type
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <RadioGroup aria-label="gameType" name="gameType" value={gameType} onChange={handleGameTypeChange}>
                    <FormControlLabel value="public" control={<Radio />} label="Public" />
                    <FormControlLabel value="private" control={<Radio />} label="Private" />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12} sm={3} />
                <Grid item xs={6} sm={3}>
                  <Typography component="h5" variant="h5" align="center">
                    Tournament
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Select
                      value={tournament ? tournament : ''}
                      onChange={handleTournamentSelect}
                  >
                    {
                      tournaments.map(item =>
                          <MenuItem key={item.tournamentId} value={item}>{item.name}</MenuItem>
                      )
                    }
                  </Select>
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={6} sm={3}>
                    <Typography component="h5" variant="h5" align="center">
                      Draft Date
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <KeyboardDateTimePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                        label="Draft Date"
                        onError={console.log}
                        format="yyyy/MM/dd hh:mm a"
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <Grid item xs={12} sm={12} />
                <Grid item xs={12} sm={12} />
                <Grid item xs={6} sm={3}>
                  <Typography component="h5" variant="h5" align="center">
                    Buy In
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Slider
                      color="primary"
                      min={0}
                      max={100}
                      defaultValue={0}
                      step={5}
                      getAriaValueText={buyInText}
                      valueLabelDisplay="on"
                      marks={buyInMarks}
                      onChangeCommitted={handleBuyInChange}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                <Typography component="h5" variant="h5" align="center">
                  Players
                </Typography>
              </Grid>
                <Grid item xs={6} sm={3}>
                  <Slider
                      min={4}
                      max={10}
                      defaultValue={6}
                      step={1}
                      valueLabelDisplay="on"
                      marks={playerMarks}
                      onChangeCommitted={handleNumPlayersChange}
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button type="submit" variant="contained" color="success">Submit</Button>
                </Grid>
              </Grid>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default NewGame;
