import axios from 'axios';
import { CityInformation } from '@/services/country-phone-types';

export const getFullList = async (): Promise<Array<CityInformation>> => {
  const { data } = await axios.get('/country_dial_info.json');

  return data;
};
