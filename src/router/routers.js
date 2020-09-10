import Login from '../component/Login';
import MainContent from '../component/MainContent';
import NotFound from '../component/NotFound';
import Home from '../component/Home';
import MainContentHome from '../component/content/MainContentHome';
import WechatSetting from '../component/content/WechatSetting';
import MerchantSetting from '../component/content/MerchantSetting';

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
    {
        path: '/content/wechat',
        exact: true,
        component: WechatSetting,
    },
    {
        path: '/content/merchant',
        exact: true,
        component: MerchantSetting,
    },
];
export {routes, contentRouters};
