import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'
import {withRouter} from 'react-router'
import { Card} from 'semantic-ui-react'

import NavFloat from './NavFloat'

import styles from '../css/landing.module.css'

class Landing extends Component {
    render(){
        return (
           <div className={styles.body}>
                    <NavFloat/>
                    <svg className={styles.curve} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path fill="rgba(245,245,245)" fill-opacity="1" d="M0,96L60,90.7C120,85,240,75,360,106.7C480,139,600,213,720,229.3C840,245,960,203,1080,160C1200,117,1320,75,1380,53.3L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                    </svg>
                    <div className={styles.frameOne}>
                    <div className={styles.textOne}>
                        <p className={styles.textHead}>What's the scene ?</p>
                        <p className={styles.textSub}>With <span className={styles.scenario}>Scenario's</span> fast, easy & efficient project management features keep your scene, well as they say... sorted.</p>                    
                        <Button style={{backgroundColor:"white", fontSize: "1.5em", zIndex:"1"}} onClick={()=>{this.props.history.push('/auth')}}>
                            Let's get started
                        </Button>
                    </div>
                    </div>
                    <div className={styles.frameTwo}>
                            <div className={styles.cardHolder} >
                                <Card id={styles.card1}>
                                    <Card.Content style={{ background:"rgba(0,0,0,0.9)" }}>
                                    <Card.Header style={{color:"whitesmoke"}}>Step 1</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                    <Card.Header>Create a new board</Card.Header>
                                    <Card.Description>
                                        Starting a new Project?
                                        <br/> 
                                        Create a new board and use it as a space to keep track of what's going on with your project.
                                    </Card.Description>
                                    </Card.Content>
                                </Card>
                            </div>
                            <div className={styles.cardHolder} >
                                <Card id={styles.card2}>
                                    <Card.Content style={{ background:"rgba(0,0,0,0.9)" }}>
                                    <Card.Header style={{color:"whitesmoke"}}>Step 2</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                    <Card.Header>Add lists to your board</Card.Header>
                                    <Card.Description>
                                        To Do? Doing? Done? 
                                        <br/> 
                                        Add lists to your board to represent the different states that a task could be in.
                                    </Card.Description>
                                    <br/>
                                    <Card.Meta>I have a list called "Procastinating about for a long time" on my board</Card.Meta>
                                    </Card.Content>
                                </Card>
                            </div>
                            <div className={styles.cardHolder} >
                                <Card id={styles.card3}>
                                    <Card.Content style={{ background:"rgba(0,0,0,0.9)" }}>
                                    <Card.Header style={{color:"whitesmoke"}}>Step 3</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                    <Card.Header>Add cards to the lists</Card.Header>
                                    <Card.Description>
                                        Got a new task?
                                        <br/> 
                                        Add tasks to the lists to which they belong by creating new cards.
                                    </Card.Description>
                                    </Card.Content>
                                </Card>
                            </div>
                            <div className={styles.cardHolder} >
                                <Card id={styles.card4}>
                                    <Card.Content style={{ background:"rgba(0,0,0,0.9)" }}>
                                    <Card.Header style={{color:"whitesmoke"}}>Step 4</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                    <Card.Header>Mix it up</Card.Header>
                                    <Card.Description>
                                        Made some progress with your project? 
                                        <br/> 
                                        Switch up the position of the cards OR even lists just by draging them around your board.
                                    </Card.Description>
                                    <br/>
                                    <Card.Meta>
                                    Sometimes when I'm not making any progess, I like to play around with the cards just for fun. 
                                    </Card.Meta>
                                    </Card.Content>
                                </Card>
                            </div>
                    </div>
                    <div className={styles.frameThree}>
                        <div className={styles.textThree}>
                        <p className={styles.textHead}>Let's make a scene! .. . together?</p>
                        <p className={styles.textSub}><span className={styles.scenario}>Scenario</span> supports board collaboration, which allows for multiple users to work together on a board & make a "scene" together.</p>                 
                        </div>
                        <div  className={styles.frameFour}></div>
                    </div>
                    
           </div>
        )
    }
}

export default withRouter(Landing)