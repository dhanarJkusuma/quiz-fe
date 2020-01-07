import React from 'react';
import {
    ListGroupItem,
    Row,
    Col,
    Badge
} from 'reactstrap';

const HistoryItem = ({ history }) => {
    const getWinStatus = (score, enemyScore) => {
        if(score > enemyScore){
            return <Badge href="#" color="success" style={{ float:'left' }}>WIN</Badge> 
        }else if (score == enemyScore){
            return <Badge href="#" color="secondary" style={{ float:'left' }}>DRAW</Badge> 
        }else{
            return <Badge href="#" color="danger" style={{ float:'left' }}>LOSE</Badge> 
        }
    }

    return (
        <ListGroupItem>
            <Row>
                <Col md={{ size: 12 }} sm={{ size: 12 }} style={{ fontSize: '15px' }}>
                    { getWinStatus(history.score, history.enemy_score) }
                    <div style={{ textAlign: 'center' }}>
                        You ({ history.score }) <b style={{ fontSize: '17px' }}> VS</b> { history.enemy_name } ({ history.enemy_score })
                    </div>
                    <Badge href="#" color="info" style={{ float:'right' }}>{ history.date }</Badge> 
                </Col>
            </Row>
        </ListGroupItem>
    )
}

export default HistoryItem;