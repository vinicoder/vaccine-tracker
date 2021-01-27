import csvParse from 'csv-parse/lib/sync';
import { v4 as uuid } from 'uuid';

interface VaccinationInfo {
  id: string;
  location: string;
  total_vaccinations: string;
}

export default async (): Promise<VaccinationInfo[]> => {
  const url =
    'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv';

  const response = await fetch(url);
  const csvData = await response.text();

  const data: VaccinationInfo[] = csvParse(csvData, {
    columns: true,
    encoding: 'utf-8',
  });

  const vaccinations = data
    .filter(item => Number(item.total_vaccinations) > 0)
    .sort((a, b) => {
      const numberA = Number(a.total_vaccinations);
      const numberB = Number(b.total_vaccinations);

      if (numberA < numberB) {
        return 1;
      }
      if (numberA > numberB) {
        return -1;
      }
      return 0;
    })
    .filter(
      (current, index, array) =>
        index === array.findIndex(item => item.location === current.location),
    )
    .map(item => {
      const total_vaccinations = new Intl.NumberFormat().format(
        Number(item.total_vaccinations),
      );

      return { id: uuid(), total_vaccinations, location: item.location };
    });

  return vaccinations;
};
