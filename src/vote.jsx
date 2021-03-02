import React, {useEffect, useState} from 'react';
import t3 from "./images/t-4.png";
import VotePagination from './components/vote/votePagination';
import VotePending from './components/vote/votePending';
import VoteActive from './components/vote/voteActive';
import {Button} from "react-bootstrap";
import PageBackground from "./components/pagebackground";

export default function Vote(props){
    const [id, setAId] = useState(null);

    const  handleClicktonewVote = () => {
        props.history.push(`/newVote/${id}`)
    }
    const handleClicktoview = (voteid) => {
        let { id } = props;
        props.history.push(`/voteView/${id}/${voteid}`)
    }
    const handleClicktoVoteview = (voteid) => {
        let { id } = props;
        props.history.push(`/voteOverview/${id}/${voteid}`)
    }
    useEffect(() => {
        setAId(props.match.params.id)

    }, []);

        return (
            <div>
                <section>
                    <PageBackground />
                    <div className="container">
                        <div className="createSingle row">
                            <div className='col-lg-4'>
                                <div>
                                    <img src={t3} alt=""/>
                                </div>
                                <div className='newVote'>
                                    <Button variant="primary" onClick={handleClicktonewVote}>New voting</Button>
                                </div>
                            </div>
                            <div className='col-lg-8'>
                                <ul className="vote">
                                    <li>
                                        <h6>Active Voting List</h6>
                                        <VoteActive  id={id}  history={props.history} />
                                    </li>
                                    <li>
                                        <h6>Pending Voting List</h6>
                                        <VotePending  id={id}  history={props.history}  />
                                    </li>
                                    <li>
                                        <h6>History</h6>
                                        <VotePagination id={id}  history={props.history}  />
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )

}

