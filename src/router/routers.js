import Login from '../component/Login';
import MainContent from '../component/MainContent';
import NotFound from '../component/NotFound';
import Home from '../component/Home';
import MainContentHome from '../component/content/MainContentHome';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/content/*',
        exact: true,
        component: MainContent,
    },
    {
        path: '/404',
        exact: true,
        component: NotFound,
    },
    {
        path: '/login',
        exact: true,
        component: Login,
    },
];

const contentRouters = [
    {
        path: '/content/',
        exact: true,
        component: MainContentHome,
    },
];
export {routes, contentRouters};
