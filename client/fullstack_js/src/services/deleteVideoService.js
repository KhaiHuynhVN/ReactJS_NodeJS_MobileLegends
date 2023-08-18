import * as httpRequest from '../utils/httpRequest';

const deleteVideoService = async (path) => {
   try {
      const res = await httpRequest.deleteAPI(path);
      return res;
   } catch (err) {
      console.error(err);
   }
};

export default deleteVideoService;
