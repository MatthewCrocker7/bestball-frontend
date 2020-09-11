import React from "react";
import { Switch, Route } from "react-router-dom";

import Drafts from './Drafts';
import LiveDraft from './LiveDraft';

const DraftContainer = () => {
    return (
        <Switch>
          <Route exact path="/home/drafts" component={Drafts}/>
          <Route path="/home/drafts/draft" component={LiveDraft}/>
        </Switch>
    );
};

export default DraftContainer;


