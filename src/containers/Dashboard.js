import React, { useState, useEffect } from "react";
import { 
  Button, 
  Container,
  Row, 
  Col,
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faHistory, faLongArrowAltLeft, faPowerOff, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import Config from '../Config';

import Quiz from './Quiz';
import History from './History';
import Notification from './Notification';
import Loading from './Loading';


const Dashboard = props => {
  const logoutUrl = "/api/user/logout";
  const verifyUrl = "/api/user/verify";

  const [state, setState ] = useState({
    displayState: "home",
    displayBack: false,

    notifyState: false,
    notificationMessage: "",
    isErrVerify: true,
    displayNotification: false,
    isLoading: false,

    displayLogout: true,
    showLogoutDialog: false
  });

  const toggleLogoutDialog = (toggle) => {
    setState(prevState => ({
      ...prevState,
      showLogoutDialog: !toggle,
    }))
  }

  const setDisplayState = (newState) => {
    const displayBack = newState !== "home" ? true : false;
    setState(previousState => ({
      ...previousState,
      displayState: newState,
      displayBack: displayBack,
    }));
  };

  const redirectLogin = () => {
    props.history.push("/signin");
  }

  const handleInGame = (inGame) => {
    setState(prevState => ({
      ...prevState,
      displayBack: !inGame,
      displayLogout: !inGame
    }));
  }

  const getDisplayState = (display) => {
    switch(display){
      case "home":
        return (
          <div>
            <Button color="secondary" block onClick={ () =>  setDisplayState("quiz") }>
              <FontAwesomeIcon icon={ faGamepad } /> &nbsp; Start Game
            </Button>
            <Button color="primary"  outline block onClick={ () =>  setDisplayState("history") }>
              <FontAwesomeIcon icon={ faHistory } /> &nbsp; History
            </Button>
          </div>
        );
      case "quiz":
        return <Quiz handleInGame={ handleInGame }/>;
      case "history":
        return <History />;
      default:
        return "";
    }
  };

  const onLogout = () => {
    doLogout();
  };

  const doLogout = () => {
    setState(prevState => ({
      ...prevState,
      isLoading: true,
    }));
    const api = Config.server.BaseUrl + logoutUrl;
    const payload = {};
    fetch(api, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(payload),
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('session-id')
        }
    })
    .then(response => {
      let respData = response.json();
      return respData;
    })
    .then(data => {
      localStorage.removeItem('session-id');
      localStorage.removeItem('session-user-id');

      redirectLogin();
    })
    .catch(err => {
      localStorage.removeItem('session-id');
      localStorage.removeItem('session-user-id');
      
      redirectLogin();
    });
  };

  const doVerify = () => {
    setState(prevState => ({
      ...prevState,
      isLoading: true,
    }));
    const api = Config.server.BaseUrl + verifyUrl;
    const payload = {};
    fetch(api, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(payload),
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('session-id')
        },
    })
    .then(response => {
      if (response.status === 401){
        // handle unauthorized user
        // force logout user
        localStorage.removeItem('session-id');
        localStorage.removeItem('session-user-id');
        redirectLogin();
      }
      let respData = response.json();
      return respData;
    })
    .then(data => {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        notifyState: false,
        displayNotification: false,
        isErrVerify: false,
        notificationMessage: "",
      }));
    })
    .catch(err => {
      // force redirect to login page
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        notifyState: false,
        isErrVerify: true,
        displayNotification: true,
        notificationMessage: "Cannot verify user data from server.",
      }));
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('session-id');
    const uid = localStorage.getItem('session-user-id');
    if (token == null || uid == null){
      props.history.push("/signin");
    }

    const fetchData = async () => {
      try {
          const api = Config.server.BaseUrl + verifyUrl;
          const token = localStorage.getItem('session-id');
          const response = await fetch(api, {
              method: 'POST',
              mode: 'cors',
              body: JSON.stringify({}),
              headers: {
                Authorization: 'Bearer ' + token
              },
          });

          if (!response.ok) {
            if (response.status === 401){
              // handle unauthorized user
              // force logout user
              localStorage.removeItem('session-id');
              localStorage.removeItem('session-user-id');
              props.history.push("/signin");
            }else{
              throw new Error(
                  `${response.status} ${response.statusText}`
              );
            }
          }
  
          //const data = await response.json();
  
          setState(prevState => ({
            ...prevState,
            isLoading: false,
            notifyState: false,
            displayNotification: false,
            isErrVerify: false,
            notificationMessage: "",
          }));
      } catch (e) {

          // force redirect to login page
          setState(prevState => ({
            ...prevState,
            isLoading: false,
            notifyState: false,
            isErrVerify: true,
            displayNotification: true,
            notificationMessage: "Cannot verify user data from server.",
          }));
      }
    };
    
    fetchData();
  }, [props.history])

  return (
    <Container style={{ textAlign: "center", marginTop: '10vh' }}>
      <Row>
        <Col md={{ size: 12 }}>
          <Card>
            <CardImg top width="100%" src="https://akcdn.detik.net.id/community/media/visual/2019/05/03/df6af1b5-8c91-4f60-a6ca-34182a9f42d7_169.jpeg?w=700&q=90" alt="Card image cap" />
            <CardBody>
              <CardTitle>
                <b>
                  <h4>
                    <b>- Duel Quiz Dota -</b>
                  </h4>
                </b>
              </CardTitle>
              <CardSubtitle><small><b>v0.0.1</b></small></CardSubtitle>
              <hr />
              { 
                  !state.isLoading && 
                  state.displayNotification && 
                  <div>
                    <Notification 
                      correct={ state.notifyState } 
                      message={ state.notificationMessage } /> 
                    <br/>
                  </div>
              }
              
              {
                state.isLoading && 
                <div>
                  <Loading color="danger" message="loading..."/>
                  <br />
                </div>
              }
              
              { !state.isLoading && 
                  !state.isErrVerify &&  
                    getDisplayState(state.displayState) 
              }
              {
                state.isErrVerify && 
                  <Button 
                    disabled={ state.isLoading }
                    color="danger" 
                    outline
                    onClick={ () => doVerify() }>
                    <FontAwesomeIcon icon={ faSyncAlt }/> Retry
                  </Button>
              }
              <br />
              { state.displayState !== "home" && state.displayBack && 
                <Button color="primary" outline size="sm" onClick={ () =>  setDisplayState("home") }>
                  <FontAwesomeIcon icon={ faLongArrowAltLeft } /> Back
                </Button> }
              <br />
              <br />
              {
                !state.isLoading && state.displayLogout &&
                <div>
                  <Button color="danger" outline onClick={ () => toggleLogoutDialog(state.showLogoutDialog) }>
                    <FontAwesomeIcon icon={ faPowerOff } /> Log Out
                  </Button>
                  <Modal isOpen={ state.showLogoutDialog } toggle={ () => toggleLogoutDialog(state.showLogoutDialog) } >
                    <ModalHeader>Logout Confirmation</ModalHeader>
                    <ModalBody>
                      Do you really want to logout ?
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" onClick={ () => onLogout() }>Logout </Button>{' '}
                      <Button color="secondary" onClick={ () => toggleLogoutDialog(state.showLogoutDialog) }>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </div>
              }
              <hr />
              <Button color="primary" target="_blank" href="https://www.github.com/dhanarJkusuma" outline>
                GitHub
              </Button>
            </CardBody>
          </Card>
        </Col>
        
      </Row>
    </Container>
  );
};

export default Dashboard;
