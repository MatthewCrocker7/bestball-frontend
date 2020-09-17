import React from "react";
import moment from 'moment';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/TeamInfoTable.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";

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
  }
};

const useStyles = makeStyles(styles);

const Drafts = () => {
    const classes = useStyles();
    const [email] = React.useState({
        email: cookies.get('email')
    });
    const [currentDrafts, updateCurrentDrafts] = React.useState([]);
    const [completedDrafts, updateCompletedDrafts] = React.useState([]);

    React.useEffect(() => {
        HttpService.post(api.getTeamInfo, email, getDraftsSuccess, getDraftsError);
    }, []);

    const getDraftsSuccess = (data, status) => {
        updateCurrentDrafts(data.data.filter(x => x.draft.draftState !== 'COMPLETE'));
        updateCompletedDrafts(data.data.filter(x => x.draft.draftState === 'COMPLETE'));
    };

    const getDraftsError = (error) => {
        console.log('Error: ', error);
    };

    const formatTime = (localDateTime) => {
        const dateTime = moment.utc(localDateTime);
        const date = dateTime.local().format('MMMM Do YYYY, h:mm a');
        return date;
    };

    const mapDrafts = (drafts) => {
        return drafts.map(info => ({
            draftId: info.draft.draftId,
            gameId: info.game.gameId,
            isDraft: true,
            cellData: [info.game.tournament.name,
                formatTime(info.draft.startTime),
                info.draft.draftState,
                `${info.draft.teams.length}/${info.game.numPlayers}`,
                info.game.buyIn,
                `$${info.game.moneyPot}`]
        }));
    };

    return (
    <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader plain color="success">
                    <h4 className={classes.cardTitleWhite}>
                        Drafts
                    </h4>
                </CardHeader>
                <CardBody>
                    <Table
                        tableHeaderColor="success"
                        tableHead={["Tournament", "Draft Time", "Status", "Players", "Buy In", "Total Pot"]}
                        tableData={mapDrafts(currentDrafts)}
                    />
                </CardBody>
            </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader plain color="success">
                    <h4 className={classes.cardTitleWhite}>
                        Completed Drafts
                    </h4>
                </CardHeader>
                <CardBody>
                    <Table
                        tableHeaderColor="success"
                        tableHead={["Tournament", "Draft Time", "Status", "Players", "Buy In", "Total Pot"]}
                        tableData={mapDrafts(completedDrafts)}
                    />
                </CardBody>
            </Card>
        </GridItem>
    </GridContainer>
    );
};

export default Drafts;


