import React from "react";
import {successColor} from "../../assets/jss/material-dashboard-react";
import {makeStyles} from "@material-ui/core/styles";

import Cookies  from 'universal-cookie';
import HttpService from "../../utils/HttpService";
import api from "../../utils/api";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Sticky from "react-sticky-el";
import TeamRoundTable from "../../components/Table/TeamRoundTable";
import Table from "../../components/Table/DraftTable";
import Grid from "@material-ui/core/Grid";
import TeamSummaryTable from "../../components/Table/TeamSummaryTable";

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
    tabRoot: {
      flexGrow: 1
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

const LiveGame = (props) => {
    const classes = useStyles();
    const [tabValue, updateTabValue] = React.useState(0);
    const [game, updateGame] = React.useState();
    const [formData] = React.useState({
        email: cookies.get('email'),
        gameId: props.location.state.gameId
    });

    React.useEffect(() => {
        HttpService.post(api.loadGame, formData, loadGameSuccess, loadGameError);
    }, []);

    const loadGameSuccess = (data, status) => {
        console.log('Live Game Data: ', data.data);
        updateGame(data.data);
    };

    const loadGameError = (error) => {
        console.log('Error: ', error);
    };

    const handleTabChange = (event, newValue) => {
        updateTabValue(newValue);
    };

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader plain color="success">
                        <h4 className={classes.cardTitleWhite}>
                            Game - {game && game.tournament.name}
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Summary" />
                            <Tab label="Round One" />
                            <Tab label="Round Two" />
                            <Tab label="Round Three" />
                            <Tab label="Round Four" />
                        </Tabs>
                        {
                            tabValue === 0 ?
                            <Summary game={game} />
                            :
                            <Round round={tabValue} game={game} />
                        }
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
};

const getRoundScore = (teamRounds, roundNumber) => {
    const teamRound = teamRounds.filter(x => x.roundNumber === roundNumber)[0];

    if (!teamRound) {
        return 'TBD';
    }

    return teamRound.toPar;
};

const getSummaryData = (game) => {
    const teams = game.teams;

    const data = teams.map((team) => {
        return [
            team.userInfo.userName,
            getRoundScore(team.teamRounds, 1),
            getRoundScore(team.teamRounds, 2),
            getRoundScore(team.teamRounds, 3),
            getRoundScore(team.teamRounds, 4),
            team.toPar,
        ]
    });

    return data;
};

const Summary = (props) => {
    const { game } = props;

    if (!game) {
        return null;
    }

    const header = [['', 'Round 1', 'Round 2', 'Round 3', 'Round 4', 'Total']];
    const data = getSummaryData(game);

    return (
        <GridContainer alignItems="center" spacing={0}>
            <GridItem xs={12} sm={12}>
                <TeamSummaryTable
                    tableHeaderColor="success"
                    tableHead={header}
                    tableData={data}
                />
            </GridItem>
        </GridContainer>
    );
};

const sumFront = (holes, strokes) => {
    const frontNine = holes.filter((hole) => hole.holeNumber <= 9);
    if (strokes) {
        return frontNine.reduce((sum, hole) => sum + (hole.strokes || 0), 0);
    }
    return frontNine.reduce((sum, hole) => sum + (hole.par || 0), 0);
};

const sumBack = (holes, strokes) => {
    const backNine = holes.filter((hole) => hole.holeNumber > 9);
    if (strokes) {
        return backNine.reduce((sum, hole) => sum + (hole.strokes || 0), 0);
    }
    return backNine.reduce((sum, hole) => sum + (hole.par || 0), 0);
};

const sumTotal = (holes, strokes) => {
    if (strokes) {
        return holes.reduce((sum, hole) => sum + (hole.strokes || 0), 0);
    }
    return holes.reduce((sum, hole) => sum + (hole.par || 0), 0);
};

const coursePar = (course, hole) => {
  return course.courseHoles[hole-1].par;
};

const mapGolfHeader = (game) => {
    const course = game.tournamentSummary.tournamentCourses[0];
    return [
        ['Hole', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'Out', '10', '11', '12', '13', '14', '15', '16', '17', '18', 'In', 'Total', 'To Par'],
        ['Par', `${coursePar(course, 1)}`, `${coursePar(course, 2)}`, `${coursePar(course, 3)}`, `${coursePar(course, 4)}`,
            `${coursePar(course, 5)}`, `${coursePar(course, 6)}`, `${coursePar(course, 7)}`, `${coursePar(course, 8)}`,
            `${coursePar(course, 9)}`, `${sumFront(course.courseHoles, false)}`, `${coursePar(course, 10)}`, `${coursePar(course, 11)}`, `${coursePar(course, 12)}`,
            `${coursePar(course, 13)}`, `${coursePar(course, 14)}`, `${coursePar(course, 15)}`, `${coursePar(course, 16)}`,
            `${coursePar(course, 17)}`, `${coursePar(course, 18)}`, `${sumBack(course.courseHoles, false)}`, `${sumTotal(course.courseHoles, false)}`, '']
    ];
};

const sortScores = (scores) => {
    return scores.sort((a, b) => (a.holeNumber > b.holeNumber) ? 1 : -1);
};

const getGolferRound = (golfer, roundNumber) => {
    if (golfer.rounds.length === 0) {
        return null;
    }
    const round = golfer.rounds.filter(x => x.roundNumber === roundNumber)[0];

    if (!round || round.length === 0) {
        return null;
    }

    const sortedScores = sortScores(round.scores);

    return [
        golfer.playerName,
        sortedScores[0].strokes,
        sortedScores[1].strokes,
        sortedScores[2].strokes,
        sortedScores[3].strokes,
        sortedScores[4].strokes,
        sortedScores[5].strokes,
        sortedScores[6].strokes,
        sortedScores[7].strokes,
        sortedScores[8].strokes,
        sumFront(sortedScores, true),
        sortedScores[9].strokes,
        sortedScores[10].strokes,
        sortedScores[11].strokes,
        sortedScores[12].strokes,
        sortedScores[13].strokes,
        sortedScores[14].strokes,
        sortedScores[15].strokes,
        sortedScores[16].strokes,
        sortedScores[17].strokes,
        sumBack(sortedScores, true),
        sumTotal(sortedScores, true),
        round.toPar
    ];
};

const getPlayerRound = (team, roundNumber) => {
    const round = team.teamRounds.filter(x => x.roundNumber === roundNumber)[0];

    if (!round || round.length === 0) {
        return null;
    }

    const sortedScores = sortScores(round.holeScores);

    return [
        'Best Ball',
        sortedScores[0].strokes,
        sortedScores[1].strokes,
        sortedScores[2].strokes,
        sortedScores[3].strokes,
        sortedScores[4].strokes,
        sortedScores[5].strokes,
        sortedScores[6].strokes,
        sortedScores[7].strokes,
        sortedScores[8].strokes,
        round.backNine,
        sortedScores[9].strokes,
        sortedScores[10].strokes,
        sortedScores[11].strokes,
        sortedScores[12].strokes,
        sortedScores[13].strokes,
        sortedScores[14].strokes,
        sortedScores[15].strokes,
        sortedScores[16].strokes,
        sortedScores[17].strokes,
        round.frontNine,
        round.strokes,
        round.toPar
    ];
};

const mapTeamRound = (team, round) => {

    const data = [];

    const golferOne = getGolferRound(team.golferOne, round);
    const golferTwo = getGolferRound(team.golferTwo, round);
    const golferThree = getGolferRound(team.golferThree, round);
    const golferFour = getGolferRound(team.golferFour, round);
    const bestBall = getPlayerRound(team, round);

    golferOne && data.push(golferOne);
    golferTwo && data.push(golferTwo);
    golferThree && data.push(golferThree);
    golferFour && data.push(golferFour);
    bestBall && data.push(bestBall);

    if (data.length > 0) {
        return data;
    }
    return [['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']];
};

const Round = (props) => {
    const { round, game } = props;

    if (!game.courseHoles) {
        return null;
    }

    return (
        <GridContainer alignItems="center" spacing={0}>
            <GridItem xs={12} sm={12}>
            {game.teams.map(team => {
                return (
                    <GridContainer alignItems="center" spacing={2} key={team.teamId}>
                        <GridItem xs={12} sm={1} key={'1' + team.teamId}>
                            <h5>{team.userInfo.userName}</h5>
                        </GridItem>
                        <GridItem xs={12} sm={11} key={team.teamId}>
                            <TeamRoundTable
                                tableHeaderColor="success"
                                tableHead={mapGolfHeader(game)}
                                tableData={mapTeamRound(team, round)}/>
                        </GridItem>
                    </GridContainer>
                );
            })}
            </GridItem>
        </GridContainer>
    );
};

export default LiveGame;
