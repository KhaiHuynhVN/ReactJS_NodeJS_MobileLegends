import * as httpRequest from '../utils/httpRequest';

const allVideoService = async (startIndex, perPage) => {
   try {
      const res = await httpRequest.get('/home', { params: { startIndex, perPage } });
      return res;
   } catch (err) {
      console.error(err);
   }
};

export default allVideoService;
