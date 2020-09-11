import React from "react";
import { StickyContainer, Sticky } from 'react-sticky';
import { withStyles, makeStyles } from "@material-ui/core/styles";

import Cookies  from 'universal-cookie';
import WebSocketService from "../../utils/WebSocketService";
import api from "../../utils/api";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import DraftBoard from "../../components/Draft/DraftBoard";
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

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
    paperStyle: {
        width: 'auto',
        height: 'auto',
        marginTop: 'auto',
        overflowX: 'visible',
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
        const { draft } = this.state;
        const offSet = 200;
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
                                    <Sticky topOffset={-offSet}>
                                        {({ style, isSticky, distanceFromTop }) =>
                                            <Box style={{ ...style, marginTop: isSticky ? `${offSet}px` : '0px' }} className={classes.paperStyle}>
                                                <h1>{distanceFromTop}</h1>
                                                <DraftOrder/>
                                            </Box>
                                        }
                                    </Sticky>
                                </GridItem>
                                <GridItem xs={12} sm={4}>
                                    <DraftBoard draftBoard={draft.availablePgaPlayers ? draft.availablePgaPlayers : []} />
                                </GridItem>
                                <GridItem xs={12} sm={4}>
                                    <Sticky topOffset={-offSet}>
                                        {({ style, isSticky }) =>
                                            <div style={{ ...style, marginTop: isSticky ? `${offSet}px` : '0px' }} className={classes.paperStyle}>
                                                <PgaPlayerInfo />
                                            </div>
                                        }
                                    </Sticky>
                                </GridItem>
                            </GridContainer>
                            </StickyContainer>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>


        );
    };
};

const DraftOrder = React.forwardRef((props, ref) => {
    return (
        <h1>draft column</h1>
    );
});

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

export default withStyles(styles)(LiveDraft);


