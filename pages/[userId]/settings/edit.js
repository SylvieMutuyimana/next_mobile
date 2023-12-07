import React, { useState } from 'react';
import styles from '../../../styles/module.css/allPages/app_pages.module.css';
import Layout from './Layout';
import { districts_provinces } from '../../../components/data/constants';
import componentStyles from '../../../styles/module.css/components.module.css';

const Edit = ({ userId }) => {
    const [userDetails, setUserDetails] = useState({
        name: '', location: { province: '', district: '', sector: '', street: '' },
        postalCode: '', email: '',phoneNumber: '', mobileNumber: '',
        fax: '',website: '',
    });

    const handleLocation = (event) => {
        const { name, value } = event.target;
        setUserDetails({
        ...userDetails,
        location: {
            ...userDetails.location,
            [name]: value,
        },
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserDetails({
            ...userDetails, [name]: value,
        });
    };
    const all_placeholders = {
        name: 'FACILITY NAME', street: 'STREET NAME' ,
        postalCode: 'POSTAL CODE', email: 'frontoffice@facilityname.com',
        phoneNumber: '078*******', mobileNumber: '078*******',
        fax: 'FAX NUMBER',website: 'www.facility.com',
    }
    const the_placeholder = (name) =>{
        if(userDetails[name]){
            return userDetails[name]
        }else{
            return all_placeholders[name]
        }
    }
    return (
        <Layout userId={userId} add_route="/settings/edit">
            <div className={styles.all_settings}>
                <div className={styles.theDetails}>
                <form>
                    <h3>Facility Settings</h3>
                    <article>
                        <label>
                            <p>Facility Name <span>*</span></p>
                            <input type="text" value={userDetails.name} name="name" onChange={handleChange}  placeholder={the_placeholder('name')}/>
                        </label>
                        <label>
                            <p>Address</p>
                            <select name="province" id={styles.province} onChange={handleLocation} value={userDetails.location.province}>
                                <option value={""}>Select province</option>
                                {districts_provinces &&
                                    Object.keys(districts_provinces).map((province, index) => (
                                        <option key={index} value={province}>
                                            {province}
                                        </option>
                                    ))
                                }
                            </select>
                            <select name="district" id={styles.district} onChange={handleLocation} value={userDetails.location.district}>
                                <option value={""}>Select district</option>
                                {districts_provinces && userDetails.location.province &&
                                    districts_provinces[userDetails.location.province].map((district, index) => (
                                    <option key={index} value={district}>
                                        {district}
                                    </option>
                                    ))
                                }
                            </select>
                            <select name="sector" id={styles.province} onChange={handleLocation} value={userDetails.location.sector}>
                                <option value={""}>Select sector</option>
                                {districts_provinces && userDetails.location.district &&
                                    districts_provinces[userDetails.location.province][userDetails.location.district].map((sector, index) => (
                                    <option key={index} value={sector}>
                                        {sector}
                                    </option>
                                    ))
                                }
                            </select>
                            <input value={userDetails.location.district} id={styles.street} type="text" name="street" onChange={handleLocation}  placeholder={the_placeholder('street')}/>
                        </label>
                        <label>
                            <p>Postal Code</p>
                            <input value={userDetails.postalCode} type="text" name="postalCode" onChange={handleChange}  placeholder={the_placeholder('postalCode')} />
                        </label>
                    </article>
                    <aside>
                        <label>
                            <p>Email</p>
                            <input value={userDetails.email} type="email" name="email" onChange={handleChange} placeholder={the_placeholder('email')}/>
                        </label>
                        <label>
                            <p>Phone Number</p>
                            <input value={userDetails.phoneNumber} type="text" name="phoneNumber" onChange={handleChange} placeholder={the_placeholder('phoneNumber')} />
                        </label>
                        <label>
                            <p>Website Url</p>
                            <input value={userDetails.website} type="text" name="website" onChange={handleChange} placeholder={the_placeholder('website')}/>
                        </label>
                    </aside>
                    <footer>
                    <button className={componentStyles.add_button} type="submit">
                        Submit
                    </button>
                    </footer>
                </form>
                </div>
            </div>
        </Layout>
    );
};

export default Edit;
