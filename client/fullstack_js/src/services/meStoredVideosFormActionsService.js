import * as httpRequest from '../utils/httpRequest';

const meStoredVideosFormActionsService = async (path, action) => {
   try {
      const res = await httpRequest.get(path, { params: action });
      return res;
   } catch (err) {
      console.error(err);
   }
};

export default meStoredVideosFormActionsService;
