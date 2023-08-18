// Pages
import * as pages from '~/page';
// Layouts
import { DefaultLayout } from '~/layouts';
// routes config
import config from '~/config';

const publicRoutes = [
   { path: config.home, component: pages.Home, layout: DefaultLayout },
   { path: config.createVideo, component: pages.CreateVideo, layout: DefaultLayout },
   { path: config.showVideo, component: pages.ShowVideo, layout: DefaultLayout },
   { path: config.meStoredVideo, component: pages.MeStoredVideos, layout: DefaultLayout },
   { path: config.editVideo, component: pages.EditVideo, layout: DefaultLayout },
   { path: config.meTrashVideo, component: pages.MeTrashVideos, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
