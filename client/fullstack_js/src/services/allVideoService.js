import * as httpRequest from '../utils/httpRequest';

const allVideoService = async (perGetData) => {
   try {
      const res = await httpRequest.get('/home', { params: perGetData });
      return res;
   } catch (err) {
      console.error(err);
   }
};

export default allVideoService;
