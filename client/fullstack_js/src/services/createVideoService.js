import * as httpRequest from '../utils/httpRequest';

const createVideoService = async (formData) => {
   try {
      const res = await httpRequest.post('/videos/store', formData);
      return res;
   } catch (err) {
      console.error(err);
   }
};

export default createVideoService;
