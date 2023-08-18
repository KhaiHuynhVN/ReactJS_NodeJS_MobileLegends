import * as httpRequest from '../utils/httpRequest';

const restoreVideoService = async (path) => {
   try {
      const res = await httpRequest.put(path);
      return res;
   } catch (err) {
      console.error(err);
   }
};

export default restoreVideoService;
