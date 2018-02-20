import ReactDOM from 'react-dom';
import { makeMainRoutes } from './routes';
import './css/main.css'
import './css/minireset.min.css'

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);
