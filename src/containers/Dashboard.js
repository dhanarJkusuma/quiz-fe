import React, { useState, useEffect } from "react";
import { 
  Button, 
  Container,
  Row, 
  Col,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faHistory, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import Quiz from './Quiz';
import History from './History';


const Dashboard = () => {
  const [state, setSState ] = useState({
    displayState: "home",
    displayBack: false
  });

  const setDisplayState = (newState) => {
    const displayBack = newState !== "home" ? true : false;
    setSState(previousState => ({
      ...previousState,
      displayState: newState,
      displayBack: displayBack,
    }))
  };

  const getDisplayState = (display) => {
    switch(display){
      case "home":
        return (
          <div>
            <Button color="secondary" size="lg" block onClick={ () =>  setDisplayState("quiz") }>
              <FontAwesomeIcon icon={ faGamepad } /> &nbsp; Start Game
            </Button>
            <Button color="primary" size="lg" outline block onClick={ () =>  setDisplayState("history") }>
              <FontAwesomeIcon icon={ faHistory } /> &nbsp; History
            </Button>
          </div>
        );
      case "quiz":
        return <Quiz />;
      case "history":
        return <History />;
    }
  };

  return (
    <Container style={{ textAlign: "center", marginTop: '10vh' }}>
      <Row>
        <Col md={{ size: 6 }}>
          <Card>
            <CardImg top width="100%" src="https://akcdn.detik.net.id/community/media/visual/2019/05/03/df6af1b5-8c91-4f60-a6ca-34182a9f42d7_169.jpeg?w=700&q=90" alt="Card image cap" />
            <CardBody>
              <CardTitle>
                <b>
                  <h3>
                    Quiz Application
                  </h3>
                </b>
              </CardTitle>
              <CardSubtitle><small>v0.0.1</small></CardSubtitle>
              <br />
              <br />
              { getDisplayState(state.displayState) }
              <br />
              { state.displayBack && 
                <Button color="primary" outline size="sm" onClick={ () =>  setDisplayState("home") }>
                  <FontAwesomeIcon icon={ faLongArrowAltLeft } /> Back
                </Button> }
              <br />
              <br />
              <Button color="primary" target="_blank" href="https://www.github.com/dhanarJkusuma" outline>
                GitHub
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col md={{ size: 6 }}></Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
