import React, {useEffect, useState} from 'react';
import {Button, Form, FormControl, FormLabel, InputGroup, Modal} from "react-bootstrap";
import {useSubstrate} from "../../api/contracts";
import api from "../../api/index";
import Loading from "../loading/Loading";
import newVote from "../../images/newvoting.png";
import {useTranslation} from "react-i18next";


export default function VoteView (props){

    const {state} = useSubstrate();
    const {votecontract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [optionlist, setoptionlist] = useState([]);
    const [id, setId] = useState(null);
    const [voteid, setvoteid] = useState(null);
    const [title, settitle] = useState('');
    const [desc, setdesc] = useState('');
    const [selected, setselected] = useState('');
    const [logo, setLogo] = useState('');
    const [afterchoice, setafterchoice] = useState(false);

    let { t } = useTranslation();

    useEffect(() => {
        let logo = sessionStorage.getItem('logo');
        setLogo(logo);
    }, []);
    useEffect(() => {
        if(afterchoice){
            // props.history.push(`/voteOverview/${props.id}/${voteid}`);
            setLoading(false);
            props.handleClose()
        }

    }, [afterchoice]);

    useEffect(() => {
        console.log(props.id,props.voteid)
        setvoteid(props.voteid);
        setId(props.id);


        const setOnevote = async() => {

            await api.vote.queryOneVote(votecontract, props.voteid).then(data => {
                if (!data) return;
                console.log(data)
                const {
                    vote_id, title, desc, choices
                } = data;
                settitle(title);
                setId(vote_id);
                setdesc(desc);
                // setoptionlist(choices.split(','))
                setoptionlist(choices.split('|'))

            });
            // setLoading(false);
        };
        setOnevote();
    }, [props.voteid,props.id]);

    const handleClicktoVote = () => {
        props.history.push(`/vote/${props.id}`)
    }
    const handleClicktoOverview = async () => {
        setLoading(true);
        setTips( t('Voting'));

        await api.vote.VoteChoice(votecontract,voteid,selected,(data)=>{
            setafterchoice(data)
        });

    }
    const handleRadio = (e) =>{
        setselected(e.target.value)
    }
    let {handleClose, showTips} = props;
    return (
        <div>
            <Loading showLoading={loading} tips={tips}/>

            <Modal  show={showTips} onHide={handleClose} className='newVoteBrdr'>
                <Modal.Header closeButton>
                    <Modal.Title><img src={newVote} alt=""/><span> {t('Voting')}</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section>
                        <ul>
                            <li className='VotetitleTop'>{title}</li>
                            <li className='voteContent'>{desc}</li>
                            <li>
                                {optionlist.map((i, index) => (

                                    <div key={index}>
                                        <div className="row">
                                            <div className="col-12 radioOption">
                                                <Form.Group controlId="formBasicCheckbox">
                                                    <Form.Check
                                                        type="radio"
                                                        label={i.split(":")[0]}
                                                        id={`radio_${index}`}
                                                        value={index+1}
                                                        name='radiobutton' onChange={handleRadio}/>
                                                </Form.Group>
                                            </div>

                                        </div>
                                    </div>
                                ))
                                }


                            </li>
                            <li className='NextBrdr'>
                                {/*<Button variant="outline-primary" className='leftBtn'*/}
                                {/*        onClick={handleClicktoVote}>Cancel</Button>*/}
                                <Button variant="primary" onClick={handleClicktoOverview}>{t('Decide')}</Button>
                            </li>
                        </ul>
                    </section>
                </Modal.Body>
            </Modal>


        </div>
    )

}

