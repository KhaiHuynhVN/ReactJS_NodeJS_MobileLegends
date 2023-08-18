import * as httpRequest from '../utils/httpRequest';

const meTrashVideosService = async (query) => {
   try {
      const res = await httpRequest.get('/me/trash/videos', { params: query });
      return res;
   } catch (err) {
      console.error(err);
   }
};

export default meTrashVideosService;
