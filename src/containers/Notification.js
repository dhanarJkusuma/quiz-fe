import React from 'react';
import { Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Notification = ({ correct }) => {
    var color
    var message
    
    if(correct){
        color = "success";
        message = "Correct !";
    } else {
        color = "danger";
        message = "Wrong !";
    }

    console.log(color);
    return (
        <Alert color={ color }>
            { correct && <FontAwesomeIcon icon={faCheckCircle} /> } { !correct && <FontAwesomeIcon icon={faTimesCircle} /> }  { message }
        </Alert>
    )
}

export default Notification;