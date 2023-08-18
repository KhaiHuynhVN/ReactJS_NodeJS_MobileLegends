import * as httpRequest from '../utils/httpRequest';

const showVideoService = async (pathName) => {
   try {
      const res = await httpRequest.get(pathName);
      return res;
   } catch (err) {
      console.error(err);
   }
};

export default showVideoService;
