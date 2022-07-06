import axios from 'axios';

import apiService from './apiService';

export default {
  async checkLiberSaveEmail(email: string) {
    const res = await axios.post(apiService.checkLiberSaveEmail(), { email });

    return res.data;
  },
};
