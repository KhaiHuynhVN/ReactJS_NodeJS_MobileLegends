import * as httpRequest from '../utils/httpRequest';

const permanentlyDestroyVideoService = async (path) => {
   try {
      const res = await httpRequest.put(path);
      return res;
   } catch (err) {
      console.error(err);
   }
};

export default permanentlyDestroyVideoService;
