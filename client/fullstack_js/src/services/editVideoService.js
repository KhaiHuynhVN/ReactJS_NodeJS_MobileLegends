import * as httpRequest from '../utils/httpRequest';

const editVideoService = async (path) => {
   try {
      const res = await httpRequest.get(path);
      return res;
   } catch (err) {
      console.error(err);
   }
};

export default editVideoService;
