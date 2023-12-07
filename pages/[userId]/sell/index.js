import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios'; // Make sure to import axios if not already done
import styles from '../../../styles/module.css/add_page.module.css';
import componentStyles from '../../../styles/module.css/components.module.css';
import Layout from './Layout';

const grid_name = 'item';
const categories = ['work', 'visiting'];

// Example data for Rwanda (replace with actual data)
const provinces = ['Province1', 'Province2', 'Province3'];
const districts = ['District1', 'District2', 'District3'];
const sectors = ['Sector1', 'Sector2', 'Sector3'];

const Sell = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [item, setItem] = useState({
    picture: { type: 'file', value: null, text: 'Image' }, 
    name: { type: String, value: '', text: 'Item Name' },
    category: { type: 'select', value: '', text: 'Category', options: categories },
    description: { type: String, value: '', text: 'Description' },
    price: { type: 'Integer', value: '', text: 'Price' },
    province: { type: 'select', value: '', text: 'Province', options: provinces },
    district: { type: 'select', value: '', text: 'District', options: districts },
    sector: { type: 'select', value: '', text: 'Sector', options: sectors },
    loc_description: { type: String, value: '', text: 'Location Description' },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'picture') {
      const imageFile = e.target.files[0];
      setItem((prev) => ({
        ...prev,
        picture: { ...prev.picture, value: imageFile },
      }));
    } else {
      setItem((prev) => ({
        ...prev,
        [name]: { ...prev[name], value: value },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missingField = Object.keys(item).find((key) => !item[key].value);

    if (missingField) {
      setError(`Missing ${item[missingField].text}`);
    } else {
      try {
        // Assuming post_url is a defined function
        const the_route = post_url('items');
        const formData = new FormData();

        for (const key in item) {
          if (item[key].type === 'file') {
            formData.append(key, item[key].value);
          } else {
            formData.append(key, JSON.stringify(item[key].value));
          }
        }

        const response = await axios.put(the_route, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          setError('Item updated successfully');
        } else {
          setError('Failed to submit item');
        }
      } catch (error) {
        console.error('Error submitting item:', error);
        setError('Failed to submit item');
      }
    }
  };

  return (
    <Layout page_name='Add item'>
      <div className={styles.add_page}>
        <form onSubmit={handleSubmit} className={styles[grid_name]}>
          {error && <p className={styles.error}>{error}</p>}
          <section className={styles[grid_name]}>
            {Object.keys(item).map((key, index) => (
              <div key={index}>
                <label> {item[key].text}</label>
                <br />
                {item[key].type === 'select' ? (
                  <select value={item[key].value} onChange={handleChange} className={styles[key]} name={key} required>
                    {item[key].options.map((option, the_index) => (
                      <option key={the_index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : item[key].type === 'file' ? (
                  <input
                    type={item[key].type}
                    name={key}
                    onChange={handleChange}
                    accept='image/*'
                    required
                  />
                ) : (
                  <input
                    type={item[key].type}
                    name={key}
                    value={item[key].value}
                    className={styles[key]}
                    onChange={handleChange}
                    placeholder={`${item[key].text} ...`}
                    required
                  />
                )}
              </div>
            ))}
          </section>
          <br />
          <button className={componentStyles.add_button} type='submit'>
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Sell;
