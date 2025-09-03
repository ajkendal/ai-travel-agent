import { fetchData } from '../utils/ApiCall';
import { usePlacesWidget } from 'react-google-autocomplete';

import { useState } from 'react';
import styles from '../styles/Form.module.scss';

// Declare google as a global variable for TypeScript
declare const google: any;

const FormPage = (props: {
  setReturnedData: (data: any) => void;
  setIsLoading: (loading: boolean) => void;
  setLoaded: (loaded: boolean) => void;
}) => {
  const [formData, setFormData] = useState({
    numberOfTravelers: 1,
    origin: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: 1000,
  });
  const currentDate = new Date().toISOString().split('T')[0];
  const [errorOrigin, setErrorOrigin] = useState(false);
  const [errorDestination, setErrorDestination] = useState(false);
  const [errorDepartureDate, setErrorDepartureDate] = useState(false);
  const [errorReturnDate, setErrorReturnDate] = useState(false);

  const { ref: refOrigin } = usePlacesWidget({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
    options: {
      types: ['(cities)'],
    },
    onPlaceSelected: (place: any) => {
      setFormData({ ...formData, origin: place.formatted_address });
    },
  });

  const { ref: refDestination } = usePlacesWidget({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
    options: {
      types: ['(cities)'],
    },
    onPlaceSelected: (place: any) => {
      setFormData({ ...formData, destination: place.formatted_address });
    },
  });

  const validateForm = () => {
    let isValid = true;

    if (!formData.origin) {
      setErrorOrigin(true);
      isValid = false;
    }
    if (!formData.destination) {
      setErrorDestination(true);
      isValid = false;
    }
    if (!formData.startDate) {
      setErrorDepartureDate(true);
      isValid = false;
    }
    if (!formData.endDate) {
      setErrorReturnDate(true);
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      submittedData();
    }
  };

  const submittedData = async () => {
    props.setIsLoading(true);
    try {
      const response = await fetchData(formData);

      props.setReturnedData(response);
      props.setLoaded(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      props.setIsLoading(false);
    }
  };

  return (
    <form className={styles['form-container']} onSubmit={handleSubmit}>
      <div className={styles['input-container']}>
        <label htmlFor='noTravelers'>Number of Travelers:</label>
        <input
          id='noTravelers'
          min='1'
          max='10'
          type='number'
          value={formData.numberOfTravelers}
          onChange={(e) =>
            setFormData({
              ...formData,
              numberOfTravelers: Number(e.target.value),
            })
          }
        />
      </div>

      <div className={styles['input-container']}>
        <label htmlFor='origin'>Flying from:</label>
        <input
          className={`${errorOrigin ? styles['error'] : ''}`}
          ref={refOrigin}
          id='origin'
          type='text'
          placeholder='New York, NY'
          value={formData.origin}
          onChange={(e) => {
            setFormData({ ...formData, origin: e.target.value });
            setErrorOrigin(false);
          }}
        />
      </div>

      <div className={styles['input-container']}>
        <label htmlFor='destination'>Flying to:</label>
        <input
          className={`${errorDestination ? styles['error'] : ''}`}
          ref={refDestination}
          id='destination'
          type='text'
          placeholder='Paris, France'
          value={formData.destination}
          onChange={(e) => {
            setFormData({ ...formData, destination: e.target.value });
            setErrorDestination(false);
          }}
        />
      </div>

      <div
        className={`${styles['input-container']} ${styles['date-input-container']}`}
      >
        <div className={styles['departure-date']}>
          <label htmlFor='departureDate'>From Date:</label>
          <input
            className={`${errorDepartureDate ? styles['error'] : ''}`}
            type='date'
            id='departureDate'
            min={currentDate}
            value={formData.startDate}
            onChange={(e) => {
              setFormData({ ...formData, startDate: e.target.value });
              setErrorDepartureDate(false);
            }}
          />
        </div>
        <p>To</p>
        <div className={styles['return-date']}>
          <label htmlFor='returnDate'>To Date:</label>
          <input
            className={`${errorReturnDate ? styles['error'] : ''}`}
            type='date'
            id='returnDate'
            min={formData.startDate || currentDate}
            value={formData.endDate}
            onChange={(e) => {
              setFormData({ ...formData, endDate: e.target.value });
              setErrorReturnDate(false);
            }}
          />
        </div>
      </div>

      <div className={`${styles['money-input']} ${styles['input-container']}`}>
        <label htmlFor='budget'>Budget $:</label>
        <input
          id='budget'
          min='100'
          step={10}
          type='number'
          value={formData.budget}
          onChange={(e) =>
            setFormData({ ...formData, budget: Number(e.target.value) })
          }
        />
      </div>

      <button type='submit' className='styled-button'>
        Plan my Trip!
      </button>
    </form>
  );
};

export default FormPage;
