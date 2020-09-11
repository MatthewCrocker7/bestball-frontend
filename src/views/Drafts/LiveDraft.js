import React from "react";
import { StickyContainer, Sticky } from 'react-sticky';
import { makeStyles } from "@material-ui/core/styles";

import Cookies  from 'universal-cookie';
import WebSocketService from "../../utils/WebSocketService";
import api from "../../utils/api";
import Grid from '@material-ui/core/Grid';
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import DraftBoard from "../../components/Draft/DraftBoard";
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

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
    paperStyle: {
        width: 'auto',
        height: 'auto',
        marginTop: 'auto',
        overflowX: 'visible',
    },
};

const sortPgaPlayers = (pgaPlayers) => {
    return pgaPlayers.sort((a, b) => (a.rank > b.rank) ? 1 : -1);
};

const useStyles = makeStyles(styles);


const LiveDraft = (props) => {
    const classes = useStyles();
    const [draft, updateDraft] = React.useState({});
    const formData = {
        email: cookies.get('email'),
        draftId: props.location.state.draftId
    };
    let client;

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



    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader plain color="success">
                        <h4 className={classes.cardTitleWhite}>
                            Draft - The Masters 2020
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <StickyContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={4}>
                                    <Sticky>
                                    {({ style }) =>
                                        <DraftOrder style={{ ...style}}/>
                                    }
                                    </Sticky>
                                </GridItem>
                                <GridItem xs={12} sm={4}>
                                    <DraftBoard draftBoard={draft.availablePgaPlayers ? draft.availablePgaPlayers : []} />
                                </GridItem>
                                <GridItem xs={12} sm={4}>
                                    <PgaPlayerInfo />
                                </GridItem>
                            </GridContainer>
                        </StickyContainer>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
};

const DraftOrder = (props) => {
    return (
        <h1>draft column</h1>
    );
};

const PgaPlayers = (props) => {
    return (
        <h1>pga player column</h1>
    );
};

const PgaPlayerInfo = (props) => {
    return (
        <h1>player info column</h1>
    );

};

export default LiveDraft;


