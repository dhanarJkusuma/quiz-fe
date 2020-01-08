
import React,  { useState, useEffect }  from 'react';
import { 
  Alert, 
  Button, 
  Badge,
  ListGroup, 
  ListGroupItem,
  Progress,
  FormGroup, 
  Label, 
  Input,
  Container,
  Row, 
  Col
} from "reactstrap";
import io from "socket.io-client";

import Notification from './Notification';
import Loading from './Loading';


const Quiz = ({ handleInGame }) => {
    const [state, setState] = useState({
        inlobby: false,
        idle: true,
        showAnswer: false,
        inquestion: false,
        correctAnswer: false,
        displayScore: false,
        displayCountDown: false,
        displayNotification: false,
        heading: "Dota Quiz Game",
        question: "",
        username: "",
        enemyName: "",
        tokenAnswer: "",
        quizCountDown: 0,
        maxCountDown: 0,
        options: [],
        score: 0,
        enemyScore: 0,
        socket: null,
        inGame: false,

        alertMsg: "",
        startButton: "Start Game",
      });

    const endpoint = "http://localhost:8000";

    const calculatePercentageProgressBar = (count, max) => {
        return parseFloat(count/max) * 100;
    }

    const getStateProgressBar = (count) => {
        if(count >= 70){
            return "success";
        }else if (count >= 40 && count < 70){
            return "warning";
        }
        return "danger";
    }

    const getUserName = (initiateData) => {
        let sessionID = parseInt(localStorage.getItem("session-user-id"));
        if(parseInt(initiateData.player_1_id) === sessionID){
            return initiateData.player_1;
        }
        if(parseInt(initiateData.player_2_id) === sessionID){
            return initiateData.player_2;
        }
    }

    const getEnemyName = (initiateData) => {
        let sessionID = parseInt(localStorage.getItem("session-user-id"));
        if(parseInt(initiateData.player_1_id) === sessionID){
            return initiateData.player_2;
        }
        if(parseInt(initiateData.player_2_id) === sessionID){
            return initiateData.player_1;
        }
    }

    const connectLobby = () => {
        setState(prevState => ({
            ...prevState,
            isLoading: true,
        }));
        let socket = io(endpoint, { autoConnect: false });

        socket.on('do_quiz:initiation', data => {
            let initiateData = JSON.parse(data);
            let user = getUserName(initiateData)
            let enemyName = getEnemyName(initiateData);
            
            setState(prevState => ({
                ...prevState,
                idle: false,
                inlobby: false,
                inquestion: false,
                heading: "Ready ?",
                username: user,
                enemyName: enemyName,
                maxCountDown: initiateData.max_count_down,
                score: 0,
                enemyScore: 0,
                displayScore: true,
                inGame: true,
                isLoading: false,
            }));
            handleInGame(true);
        });

        socket.on('do_quiz:counter', counter => {
            setState(prevState => ({
            ...prevState,
            idle: false,
            inquestion: true,
            displayNotification: false,
            question: counter,
            }))
        });

        socket.on('do_quiz:publish_question', data => {
            let question = JSON.parse(data);
            
            setState(prevState => ({
                ...prevState,  
                heading: "Answer The Questions Below !!",
                idle: false,
                inquestion: true,
                quizCountDown: question.count_down,
                maxCountDown: question.count_down,
                question: question.question,
                options: question.options,
                tokenAnswer: question.token,
                showAnswer: false,
                correctAnswer: false,
                displayNotification: false,
                displayScore: true,
                displayCountDown: true,
            }));
        });

        socket.on('do_quiz:count_down', count => {
            setState(prevState => ({
                ...prevState,
                idle: false,
                inquestion: true,
                quizCountDown: count
            }));
        });

        socket.on('do_quiz:next_question', data => {
            const question = JSON.parse(data);
            const options = question.options;
        
            options.map((option, index) => {
                option.choosen = true;
                options[index] = option;
                return option;
            });


            setState(prevState => ({
                ...prevState,
                showAnswer: true,
                options: options,
                displayCountDown: false,
            }));
            
        });

        socket.on('do_quiz:finish_question', data => {
            const scoreSummaries = JSON.parse(data);
            const userID = parseInt(localStorage.getItem('session-user-id'));
            var userScore
            var enemyScore

            if(scoreSummaries.player_1_id === userID) {
                userScore = scoreSummaries.player_1_score;
                enemyScore = scoreSummaries.player_2_score;
            }

            if(scoreSummaries.player_2_id === userID){
                userScore = scoreSummaries.player_2_score;
                enemyScore = scoreSummaries.player_1_score;
            }

            setState(prevState => ({
                ...prevState,
                idle: true,
                inquestion: false,
                inlobby: true,
                question: "",
                options: [],
                heading: "Summary",
                score: userScore,
                enemyScore: enemyScore,
                displayScore: true,
                inGame: false,
                startButton: "Play Agan ?"
            }));

            socket.close();
            handleInGame(false);
        })

        socket.on('do_quiz:update_score', data => {
            let scoreMsg = JSON.parse(data);
            let userID = parseInt(localStorage.getItem('session-user-id'));

            if(scoreMsg.player_id === userID) {
                setState(prevState => ({
                    ...prevState,
                    score: scoreMsg.score
                }));
            }else{
                setState(prevState => ({
                    ...prevState,
                    enemyScore: scoreMsg.score
                }));
            }
        })

        socket.on('connect', () => {
            socket.emit('init', localStorage.getItem('session-id'));
            setState(prevState => ({
                ...prevState,
                displayConnErr: false,
                errConnMsg: "",
            }));

        });

        socket.on('disconnect', () => {
            
        });

        socket.on("connect_error", () => {
            setState(prevState => ({
                ...prevState,
                displayConnErr: true,
                errConnMsg: "Failed to connect server",
                isLoading: false,
            }));

            handleInGame(false);
        });


        socket.open();

        setState(prevState => ({
            ...prevState,
            inlobby: true,
            socket: socket
        }));
    }

    const answerQuestion = (socket, opt, token) => {
        if(state.showAnswer){
          return
        }
        
        const options = state.options.slice();
        var correctAnswer
        options.map((option, index) => {
          if(option.answer_id === opt.answer_id){
            option.choosen = true;
            options[index] = option;
            if(opt.is_correct){
              correctAnswer = true;
            }
          }
          return option;
        });
    
        const answerID = opt.answer_id;
        const userID = localStorage.getItem('session-user-id');
        const payload = {
          token: token,
          answer_id: answerID,
          user_id: parseInt(userID),
          delta: state.quizCountDown
        };

        const msg = correctAnswer ? "Cool, your answer is correct !! " : "Wrong answer dude !!"

        socket.emit('answer', JSON.stringify(payload));
        setState(prevState => ({
          ...prevState,
          showAnswer: true,
          options: options,
          correctAnswer: correctAnswer,
          displayNotification: true,
          alertMsg: msg,
        }));
    }
    
    const decorateWrongAnswer = (opt) => {
        if(opt){
            return "danger";
        }
        return "";
    }

    useEffect(() => {

        return (() => {
            console.log('hi');
            //TODO::handle for user find match, than click back button
        });
    }, []);

    return (
        <div>
            <br/>
            { 
                state.displayConnErr && 
                    <Notification correct={ false } message={ state.errConnMsg }  /> 
            }
            { 
                state.inquestion && 
                    state.displayNotification && 
                        <Notification correct={ state.correctAnswer } message={ state.alertMsg }  /> 
            }
            <br/>
            {
            state.inquestion && 
            <Alert color="light">
                <h5> { state.question } </h5>
                <ListGroup>
                {
                    state.options.map((item, index) => {
                        const show = state.showAnswer && item.is_correct;
                        const wrongAnswer = state.showAnswer && !state.is_correct && item.choosen;
                        const decoration = show ? "success" : decorateWrongAnswer(wrongAnswer);
                        return (
                            <ListGroupItem 
                                color={ decoration } 
                                tag="button" 
                                key={ index } 
                                action 
                                onClick={() => answerQuestion(state.socket, item, state.tokenAnswer)}>
                            { item.answer }
                            </ListGroupItem>
                        )
                    })
                }
                </ListGroup>
                <hr />
            </Alert>
            }
            
            {
                !state.inGame && 
                <div>
                    <Button 
                        disabled={ state.isLoading }
                        onClick={ connectLobby }
                        color="info">
                        { state.startButton }
                    </Button> 
                    <br />
                </div>
            }
            {
                state.isLoading && 
                <div>
                    <Loading 
                        color="info" 
                        message="[ Finding Match ]"/>
                    <br />
                </div>
            }
            
            { 
                state.displayCountDown && 
                <div>
                    <Progress 
                        style={{ height: '0.5rem' }}
                        animated 
                        color={ 
                            getStateProgressBar(
                                calculatePercentageProgressBar(
                                    state.quizCountDown, 
                                    state.maxCountDown
                                )
                            ) 
                        } 
                        value={ 
                            calculatePercentageProgressBar(
                                state.quizCountDown, 
                                state.maxCountDown
                            ) 
                        } 
                    />
                    <br/> 
                    <Button color="primary" outline disabled>
                    Timer: <Badge color="secondary">{ state.quizCountDown }</Badge> s
                    </Button>
                </div> 
            }
            <br />
            {
                !state.inGame && 
                    state.displayScore && 
                        <div>
                            <h5>Summary : </h5>
                            <hr />
                        </div>
            }
            {  
                state.displayScore && 
                    <Container>
                        <Row>
                        <Col sm="12" md={{ size: 3 }}> 
                            <Alert style={{ 
                            display: 'table', 
                            width: '100%', 
                            height: '100%' 
                            }}
                            color="dark">
                                <div style={{ 
                                display: 'table-cell',
                                verticalAlign: 'middle'
                                }}>
                                <b>VS</b>
                                </div>
                            </Alert>
                        </Col>
                        <br />
                        <Col md={{ size: 9 }}>
                            <br />
                            <FormGroup>
                            <Label for="scoreStatus">Score: </Label>
                            <Row>
                                <Col md={{ size: 9 }} sm={{ size: 9 }}>
                                <Input 
                                    type="text" 
                                    value={ state.username }
                                    disabled/>
                                </Col>
                                <Col md={{ size: 3 }} sm={{ size: 3 }}>
                                <Button color="info" disabled>
                                    { state.score }
                                </Button>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col md={{ size: 9 }} sm={{ size: 9 }}>
                                <Input 
                                    type="text" 
                                    value={ state.enemyName }
                                    disabled/>
                                </Col>
                                <Col md={{ size: 3 }} sm={{ size: 3 }}>
                                <Button color="info" disabled>
                                    { state.enemyScore }
                                </Button>
                                </Col>
                            </Row>
                            </FormGroup>
                        </Col>
                        </Row>
                    </Container>
            }
            
        </div>
    );
}

export default Quiz;
