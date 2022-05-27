import React from 'react';
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage() {
return (
   <div className={styles.background}>
      <div className={styles.contentPadre}>
         
         <div className={styles.contentHijo}>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.content}>
               <div className={styles.contElem}>
                  <div className={styles.contText}>
                     <h1>Desayuna como un rey,</h1>
                     <h1>almuerza como un príncipe</h1>
                     <h1>y cena como un mendigo.</h1>
                  </div>
                  <Link to='/home'>
                     <button className = {styles.btn} >Recetas</button>
                  </Link>
               </div>
            </div>
         
        </div>
     </div>
  </div>
  );
}

