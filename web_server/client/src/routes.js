import App from './App/App';
import Base from './Base/Base';

const routes = {
  component: Base,
  childRoutes: [
    {
      path: '/',
      component: App
    },
  ]
}

export default routes;
