import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { FiGlobe } from 'react-icons/fi';

import vaccinationsData from '../data/vaccinationsData';

import { Container, Header, Main, List, Footer } from '../styles/page';

interface VaccinationInfo {
  id: string;
  location: string;
  people_vaccinated: string;
}

interface HomeProps {
  vaccionationsList: VaccinationInfo[];
}

const Home: React.FC<HomeProps> = ({ vaccionationsList }) => {
  const [currentLocation, setCurrentLocation] = useState('World');

  const router = useRouter();

  const currentLocationInfo = useMemo(() => {
    return vaccionationsList.find(item => item.location === currentLocation);
  }, [vaccionationsList, currentLocation]);

  const currentDayOfWeek = useMemo(() => {
    return format(new Date(), 'cccc');
  }, []);

  const currentFullDate = useMemo(() => {
    return format(new Date(), 'PP');
  }, []);

  const locationsList = useMemo(() => {
    return vaccionationsList
      .map(item => ({
        id: item.id,
        location: item.location,
      }))
      .sort((a, b) => {
        if (a.location < b.location) {
          return -1;
        }
        if (a.location > b.location) {
          return 1;
        }
        return 0;
      });
  }, [vaccionationsList]);

  const handleLocationChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const location = e.target.value;
      router.push(`/?location=${location}`, undefined, { shallow: true });
    },
    [router],
  );

  useEffect(() => {
    const newLocation = router.query.location;

    if (newLocation) {
      setCurrentLocation(String(newLocation));
    }
  }, [router.query.location]);

  return (
    <Container>
      <Header>
        <strong>{currentDayOfWeek}</strong>
        <p>{currentFullDate}</p>
      </Header>
      <Main>
        <div>
          <section>
            <h1>
              <strong>{currentLocationInfo.people_vaccinated}</strong> people
              vaccinated{' '}
              <span>
                against <span>COVID-19</span>
              </span>{' '}
              in {currentLocationInfo.location}*
            </h1>
            <label htmlFor="select-location">
              <span>
                <FiGlobe /> Change location
              </span>
              <select id="select-location" onChange={handleLocationChange}>
                {locationsList.map(item => (
                  <option key={item.id} value={item.location}>
                    {item.location}
                  </option>
                ))}
              </select>
            </label>
          </section>

          <section>
            <img src="/banner.svg" alt="Mulher sendo vacinada" />
            <span>
              Design By <a href="https://www.freepik.com">Freepik</a>
            </span>
          </section>
        </div>

        <List>
          {vaccionationsList.map(vaccination => (
            <li key={vaccination.id}>
              <strong>{vaccination.location}</strong>
              <span>{vaccination.people_vaccinated}</span>
            </li>
          ))}
        </List>
      </Main>
      <Footer>
        * Source from{' '}
        <a
          href="https://ourworldindata.org/grapher/cumulative-covid-vaccinations?tab=chart&stackMode=absolute&time=2020-12-26..latest&region=World"
          target="_blank"
          rel="noreferrer"
        >
          Our World in Data
        </a>
        . Increase rate relative to change between the last 5 days of reported
        data.
      </Footer>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const vaccionationsList = await vaccinationsData();

  return {
    props: {
      vaccionationsList,
    },
    revalidate: 60,
  };
};

export default Home;