// Row2.js
import styles from '../../../styles/module.css/allPages/Dash_Content.module.css';
import React, {useEffect, useState} from 'react';
import Image from 'next/image';

const Row2 = ({row2Data}) => {
    const items = {
        'one': {name:'Home/Appliances', value : row2Data.items, icon: 'fa fa-car'},
        'two': {name: 'Phones/Tablets', value : row2Data.categories,  icon: 'fa fa-user'},
        'three': {name: 'Computers/TVs', value : row2Data.purchases, icon: 'fa fa-users'},
        'four': {name:'All Users', value : row2Data.users, icon: 'fa fa-road'}
    }    
    const the_items = row2Data
    const returnCard = (key, dict) =>{
        return(
            <div className={styles.card}>
                <article >
                    <Image src={dict.image} alt={dict.name} width={40} height={40}/>
                </article>
                <aside>
                    <p>{dict.description}</p>
                    <p>{dict.amount} rwf</p>
                </aside>
            </div>
        )
    }
    return (
        <div className={styles.row2}>
            {
                Object.keys(the_items).map(key=>(
                    returnCard(key, the_items[key])
                ))
            }
        </div>
    );
};

export default Row2;
