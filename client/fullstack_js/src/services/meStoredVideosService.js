import * as httpRequest from '../utils/httpRequest';

const meStoredVideosService = async (query) => {
   try {
      const res = await httpRequest.get('/me/stored/videos', { params: query });
      return res;
   } catch (err) {
      console.error(err);
   }
};

export default meStoredVideosService;
