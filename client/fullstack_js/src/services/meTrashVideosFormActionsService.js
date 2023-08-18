import * as httpRequest from '../utils/httpRequest';

const meTrashVideosFormActionsService = async (path, action) => {
   try {
      const res = await httpRequest.get(path, { params: action });
      return res;
   } catch (err) {
      console.error(err);
   }
};

export default meTrashVideosFormActionsService;
