import axios from 'axios';
import { ICountryInformation } from '@/types/country-phone-types';

export const getFullList = async (): Promise<ICountryInformation[]> => {
  const { data } = await axios.get('/country_dial_info.json');
  return data;
};

export const getEuropeanList = async (): Promise<ICountryInformation[]> => {
  const { data } = await axios.get('/country_dial_info.json');
  return data.filter(({ isoCode }: ICountryInformation) => {
    return (
      EU.includes(isoCode) ||
      EFTA.includes(isoCode) ||
      EUCandidate.includes(isoCode) ||
      potentialEUCandidates.includes(isoCode) ||
      ENPEast.includes(isoCode) ||
      ENPSouth.includes(isoCode)
    );
  });
};

/**
 * Source: https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Glossary:Country_codes
 * ! BUT HERE are the wrong codes of some countries: United kingdom and Greece!
 * Brought them in accordance with https://en.wikipedia.org/wiki/ISO_3166-2
 */

const EU = [
  'RU',
  'GB',
  'BE',
  'GR',
  'LT',
  'PT',
  'BG',
  'ES',
  'LU',
  'RO',
  'CZ',
  'FR',
  'HU',
  'SI',
  'DK',
  'HR',
  'MT',
  'SK',
  'DE',
  'IT',
  'NL',
  'FI',
  'EE',
  'CY',
  'AT',
  'SE',
  'IE',
  'LV',
  'PL',
];
const EFTA = ['IS', 'LI', 'NO', 'CH'];
const EUCandidate = ['ME', 'MK', 'AL', 'RS', 'TR'];
const potentialEUCandidates = ['BA'];
const ENPEast = ['AM', 'BY', 'GE', 'AZ', 'MD', 'UA'];
const ENPSouth = ['DZ', 'EG', 'IL', 'JO', 'PS'];
