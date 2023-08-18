import * as httpRequest from '../utils/httpRequest';

const updateVideoService = async (path, formData) => {
   try {
      const res = await httpRequest.patch(path, formData);
      return res;
   } catch (err) {
      console.error(err);
   }
};

export default updateVideoService;
