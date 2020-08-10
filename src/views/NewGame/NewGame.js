import React from "react";
import 'date-fns';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Danger from "../../components/Typography/Danger.js";
import Success from "../../components/Typography/Success.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
  const [selectedDate, setSelectedDate] = React.useState();//React.useState(new Date('2014-08-18T21:11:54'));
  const [buyIn, setBuyIn] = React.useState(20);
  const [numPlayers,  setNumPlayers] = React.useState(6);
  const [formData, updateFormData] = React.useState({});

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handeGameTypeChange = (event) => {
    setGameType(event.target.value);
    console.log(event.target.value);
  };

  const buyInText = (value) => {
    return `$${value}.00`;
  };

  const handleBuyInChange = (event, value) => {
    setBuyIn(value);
    console.log(value);
  };

  const handleNumPlayersChange = (event, value) => {
    setNumPlayers(value);
    console.log(value);
  };

  const handleChange = (e) => {
    const newData = Object.assign({}, formData);
    newData[e.target.id] = e.target.value;
    updateFormData(newData);
  };

  const handleNewGame = async (e) => {
    e.preventDefault();
    console.log('Submit new game');
    console.log(formData);
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
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4} sm={2}>
                  <Typography component="h5" variant="h5" align="center">
                    Game Type
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={1}>
                  <RadioGroup aria-label="gameType" name="gameType" value={gameType} onChange={handeGameTypeChange}>
                    <FormControlLabel value="public" control={<Radio />} label="Public" />
                    <FormControlLabel value="private" control={<Radio />} label="Private" />
                  </RadioGroup>
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={4} sm={2}>
                    <Typography component="h5" variant="h5" align="center">
                      Draft Date
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={2}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="draftDate"
                        label="Draft Date"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                    />
                  </Grid>
                  <Grid item xs={4} sm={2}>
                    <Typography component="h5" variant="h5" align="center">
                      Draft Time
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={2}>
                    <KeyboardTimePicker
                        margin="normal"
                        id="draftTime"
                        label="Draft Time"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
                        }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <Grid item xs={4} sm={2}>
                  <Typography component="h5" variant="h5" align="center">
                    Tournament
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={1}>
                  <RadioGroup aria-label="gameType" name="gameType" value={gameType} onChange={handeGameTypeChange}>
                    <FormControlLabel value="public" control={<Radio />} label="Public" />
                    <FormControlLabel value="private" control={<Radio />} label="Private" />
                  </RadioGroup>
                </Grid>
                <Grid item xs={4} sm={2}>
                  <Typography component="h5" variant="h5" align="center">
                    Buy In
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={2}>
                  <Slider
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
                <Grid item xs={4} sm={2}>
                <Typography component="h5" variant="h5" align="center">
                  Players
                </Typography>
              </Grid>
                <Grid item xs={4} sm={2}>
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
