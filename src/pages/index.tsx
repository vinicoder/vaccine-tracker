import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import { FiGithub, FiGlobe, FiCode } from 'react-icons/fi';

import vaccinationsData from '../data/vaccinationsData';

import { Container, Header, Main, Section, List, Footer } from '../styles/page';

interface VaccinationInfo {
  id: string;
  location: string;
  total_vaccinations: string;
}

interface HomeProps {
  vaccionationsList: VaccinationInfo[];
}

const Home: React.FC<HomeProps> = ({ vaccionationsList }) => {
  const [currentLocation, setCurrentLocation] = useState('World');

  const router = useRouter();

  const currentLocationInfo = useMemo(() => {
    const currentInfo = vaccionationsList.find(
      item => item.location === currentLocation,
    );

    if (currentInfo) {
      const location =
        currentInfo.location === 'World'
          ? 'worldwide'
          : `in ${currentInfo.location}`;

      return {
        ...currentInfo,
        location,
      };
    }

    return {} as VaccinationInfo;
  }, [vaccionationsList, currentLocation]);

  const currentDayOfWeek = useMemo(() => {
    return format(new Date(), 'cccc');
  }, []);

  const currentFullDate = useMemo(() => {
    return format(new Date(), 'PP');
  }, []);

  const lastUpdateDate = useMemo(() => {
    return format(new Date(), 'Pp');
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
      router.push(`/?location=${encodeURIComponent(location)}`, undefined, {
        shallow: true,
      });
    },
    [router],
  );

  useEffect(() => {
    const newLocation = router.query.location;

    const locationExists =
      vaccionationsList.findIndex(item => item.location === newLocation) >= 0;

    if (newLocation && locationExists) {
      setCurrentLocation(String(newLocation));
    }
  }, [router.query.location, vaccionationsList]);

  return (
    <>
      <Head>
        <title>Vaccine Tracker</title>
      </Head>
      <Container>
        <Header>
          <div>
            <strong>{currentDayOfWeek}</strong>
            <p>{currentFullDate}</p>
          </div>
          <div>
            <strong>Last update</strong>
            <p>{lastUpdateDate}</p>
          </div>
        </Header>
        <Main>
          <div>
            <Section>
              <h1>
                <strong>{currentLocationInfo.total_vaccinations}</strong> people
                vaccinated{' '}
                <span>
                  against <span>COVID-19</span>
                </span>{' '}
                {currentLocationInfo.location}*
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
            </Section>

            <Section>
              <img src="/banner.svg" alt="Mulher sendo vacinada" />
              <span>
                Design By{' '}
                <a
                  href="https://www.freepik.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Freepik
                </a>
              </span>
            </Section>
          </div>

          <List>
            {vaccionationsList.map(vaccination => (
              <li key={vaccination.id}>
                <Link
                  href={`/?location=${encodeURIComponent(
                    vaccination.location,
                  )}`}
                  shallow
                  passHref
                >
                  <a>
                    <strong>{vaccination.location}</strong>
                    <span>{vaccination.total_vaccinations}</span>
                  </a>
                </Link>
              </li>
            ))}
          </List>
        </Main>
        <Footer>
          <div>
            * Source from{' '}
            <a
              href="https://ourworldindata.org/grapher/cumulative-covid-vaccinations?tab=chart&stackMode=absolute&time=2020-12-26..latest&region=World"
              target="_blank"
              rel="noreferrer"
            >
              <strong>Our World in Data</strong>
            </a>
            . Increase rate relative to change between the last 5 days of
            reported data.
          </div>
          <div>
            <a
              href="https://github.com/vinicoder"
              target="_blank"
              rel="noreferrer"
            >
              <FiCode />
              <span>
                {' '}
                Developed by <strong>vinicoder</strong>
              </span>
            </a>
          </div>
          <div>
            <a
              href="https://github.com/vinicoder/vaccine-tracker"
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub />{' '}
              <span>
                <strong>Contribute</strong> on Github
              </span>
            </a>
          </div>
        </Footer>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const vaccionationsList = await vaccinationsData();

  const minutesToRevalidate = 5;
  const revalidate = minutesToRevalidate * 60;

  return {
    props: {
      vaccionationsList,
    },
    revalidate,
  };
};

export default Home;
