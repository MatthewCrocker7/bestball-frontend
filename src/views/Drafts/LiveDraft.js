import React from "react";
import moment from 'moment';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components

import Cookies  from 'universal-cookie';
import HttpService from "../../utils/HttpService";
import api from "../../utils/api";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";

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

const LiveDraft = (props) => {
    const classes = useStyles();
    const [draft, updateDraft] = React.useState({});
    const formData = {
        email: cookies.get('email'),
        draftId: props.location.state.draftId
    };

    React.useEffect(() => {
        HttpService.post(api.loadDraft, formData, loadDraftSuccess, loadDraftError);
    }, []);

    const loadDraftSuccess = (data, status) => {
        console.log('succedss')
    };

    const loadDraftError = (error) => {
        console.log('Error: ', error);
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
                        <GridContainer>
                            <GridItem xs={12} sm={4}>
                                <DraftOrder />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <PgaPlayers />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <PgaPlayerInfo />
                            </GridItem>
                        </GridContainer>
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


