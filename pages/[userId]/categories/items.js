// theItems.js
import styles from '../../../styles/module.css/allPages/categories.module.css';
import React, {useEffect, useState} from 'react';
import { setLocalStorageProp_ } from '../../../components/localStorage';
import { useRouter } from 'next/router';
import Image from 'next/image';
const ItemsContainer = ({theItemsData, setSelectedItem}) => {
    const the_items = theItemsData
    const handleselected = (item)=>{
        setLocalStorageProp_('selecteditem', item)
        setSelectedItem(item)
        console.log('clicked')
        console.log('item:', item)
    }
    const returnCard = (item, index) =>{
        return(
            <div className={styles.card} key={index} onClick={()=>handleselected(item)}>
                <article >
                    <Image src={item.image} alt={item.name} width={40} height={40}/>
                </article>
                <aside>
                    <p>{item.description}</p>
                    <p>{item.amount} rwf</p>
                </aside>
            </div>
        )
    }
    return (
        <div className={styles.grid2}>
            {
                the_items.map((item, index)=>(
                    returnCard(item, index)
                ))
            }
        </div>
    );
};

export default ItemsContainer;
