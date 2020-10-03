import React from "react";
import { Switch, Route } from "react-router-dom";

import Games from './Games';
import LiveGame from './LiveGame';

const GameContainer = () => {
    return (
        <Switch>
          <Route exact path="/home/games" component={Games}/>
          <Route path="/home/games/game" component={LiveGame}/>
        </Switch>
    );
};

export default GameContainer;


