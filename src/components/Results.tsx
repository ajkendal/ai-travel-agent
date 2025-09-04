import styles from '../styles/Results.module.scss';
import { ReturnIcon } from '../assets/weather-icons';

const Results = (props: { returnedData: any; formData: any }) => {
  const {
    weather,
    weather_icon,
    flights,
    flights_url,
    hotel,
    hotel_url,
    image,
    activities,
  } = props.returnedData;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={styles['results-container']}>
      <div className={styles['content-container']}>
        <h4 className={styles['title']}>Your Trip</h4>
        <p className={styles['dates']}>
          {formatDate(props.formData.startDate)} to{' '}
          {formatDate(props.formData.endDate)}
        </p>
        <p className={styles['origin-destination']}>
          {props.formData.origin} → {props.formData.destination}
        </p>

        <img
          src={image?.url}
          alt={image?.revised_prompt}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      <div className={styles['content-container']}>
        <h4 className={styles['title']}>Weather</h4>
        {ReturnIcon(weather_icon)}
        <p className={styles['text']}>{weather}</p>
      </div>

      <div className={styles['content-container']}>
        <h4 className={styles['title']}>Flights</h4>
        <p className={styles['text']}>{flights}</p>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={flights_url}
          className='styled-button'
        >
          Book Flights
        </a>
      </div>

      <div className={styles['content-container']}>
        <h4 className={styles['title']}>Hotel</h4>
        <p className={styles['text']}>{hotel}</p>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={hotel_url}
          className='styled-button'
        >
          Book Hotel
        </a>
      </div>

      <div className={styles['content-container']}>
        <h4 className={styles['title']}>Activities</h4>
        {activities.map(
          (activity: { name: string; description: string }, index: number) => (
            <div key={index} className={styles['activity']}>
              <p className={styles['name']}>{activity.name}:</p>
              <p className={styles['description']}>{activity.description}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Results;
