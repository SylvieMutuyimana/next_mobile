// nav.js
import styles from '../../../styles/module.css/allPages/categories.module.css';
import React from 'react';
import Image from 'next/image';
const Nav = ({navData, setCategory, selectedCategory, setSelectedItem}) => {
    const the_items = navData
    const handleNav = (theCategory)=>{
        setCategory(theCategory)
        setSelectedItem(null)
    }
    const returnCard = (key, dict) =>{
        return(
            <div 
                className={styles.card} onClick={()=>handleNav(dict.name)}
                style={{
                    fontWeight:selectedCategory === dict.name? 'bold': 'normal'
                }}
            >
                <div className={styles.top}>
                    <Image src={dict.image} alt={dict.name}/>
                </div>
                <div className={styles.bottom}>
                    <p>{dict.name}</p>
                </div>
            </div>
        )
    }
    return (
        <div className={styles.grid1}>
            {
                Object.keys(the_items).map(key=>(
                    returnCard(key, the_items[key])
                ))
            }
        </div>
    );
};

export default Nav;
