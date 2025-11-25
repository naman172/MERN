import React, {Component} from 'react'
import NavFloat from './NavFloat'
import styles from '../css/logout.module.css'

class Logout extends Component{
    render(){
        return (
            <div className={styles.body}>
                <div className={styles.container}>
                    <NavFloat/>
                    <section className={styles.display}>
                        <div className={styles.base}>
                            <div className={styles.card}>
                                <p className={styles.textHead}>
                                    Thanks for using <span className={styles.scenario}>Scenario</span>
                                </p>
                                <p className={styles.textSub}>
                                    You're all logged out
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default Logout