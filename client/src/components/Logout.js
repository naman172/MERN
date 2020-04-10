import React, {Component} from 'react'
import NavFloat from './NavFloat'
import styles from '../css/logout.module.css'

class Logout extends Component{
    render(){
        return (
            <div className={styles.body}>
                <div className={styles.container}>
                    <NavFloat/>
                    <section class={styles.display}>
                        <div class={styles.base}>
                            <div class={styles.card}>
                                <p class={styles.textHead}>
                                    Thanks for using <span class={styles.scenario}>Scenario</span>
                                </p>
                                <p class={styles.textSub}>
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