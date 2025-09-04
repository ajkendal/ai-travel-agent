import { fetchData } from '../utils/ApiCall';
import { usePlacesWidget } from 'react-google-autocomplete';

import { useState } from 'react';
import styles from '../styles/Form.module.scss';

const FormPage = (props: {
  setReturnedData: (data: any) => void;
  setIsLoading: (loading: boolean) => void;
  setLoaded: (loaded: boolean) => void;
  formData: any;
  setFormData: (data: any) => void;
}) => {
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
      props.setFormData({ ...props.formData, origin: place.formatted_address });
    },
  });

  const { ref: refDestination } = usePlacesWidget({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
    options: {
      types: ['(cities)'],
    },
    onPlaceSelected: (place: any) => {
      props.setFormData({
        ...props.formData,
        destination: place.formatted_address,
      });
    },
  });

  const validateForm = () => {
    let isValid = true;

    if (!props.formData.origin) {
      setErrorOrigin(true);
      isValid = false;
    }
    if (!props.formData.destination) {
      setErrorDestination(true);
      isValid = false;
    }
    if (!props.formData.startDate) {
      setErrorDepartureDate(true);
      isValid = false;
    }
    if (!props.formData.endDate) {
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
      const response = await fetchData(props.formData);

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
          value={props.formData.numberOfTravelers}
          onChange={(e) =>
            props.setFormData({
              ...props.formData,
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
          value={props.formData.origin}
          onChange={(e) => {
            props.setFormData({ ...props.formData, origin: e.target.value });
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
          value={props.formData.destination}
          onChange={(e) => {
            props.setFormData({
              ...props.formData,
              destination: e.target.value,
            });
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
            value={props.formData.startDate}
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                startDate: e.target.value,
              });
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
            min={props.formData.startDate || currentDate}
            value={props.formData.endDate}
            onChange={(e) => {
              props.setFormData({ ...props.formData, endDate: e.target.value });
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
          value={props.formData.budget}
          onChange={(e) =>
            props.setFormData({
              ...props.formData,
              budget: Number(e.target.value),
            })
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
