import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

import styles from '../css/navFloat.module.css'

class NavFloat extends Component{

    render(){
        return (
        <div className={styles.navfloat}>
            <div className={styles.overlay}>
                <div className={styles.subContainer}>
                    <img className={styles.icon} src="./dashboard.ico" style={{zIndex:'1'}} alt="dasboard icon"/>
                    <div className={styles.title}>Scenario</div>
                </div>
                < div className={styles.subContainer}>
                    <NavLink to='/auth'>
                        <button className={styles.authButton}>
                            Log In / Sign Up
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
        )
    }
}

export default NavFloat