import axios from 'axios';
import apiService from '@/services/apiService';
import coinsMapper, { ICoin } from '@/models/coin/coins';

export default {
  async getCoins(): Promise<ICoin[]> {
    const res = await axios.get(`${apiService.coin.getCoins()}`);

    return res.data.map(coinsMapper.deserialize);
  },
};
