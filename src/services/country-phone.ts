import axios from 'axios';
import { CountryInformation } from '@/services/country-phone-types';

export const getFullList = async (): Promise<Array<CountryInformation>> => {
  const { data } = await axios.get('/country_dial_info.json');

  return data;
};
