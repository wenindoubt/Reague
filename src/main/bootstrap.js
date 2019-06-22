import Bottle from 'bottlejs';
import ConstantBootstrap from './constants/bootstrap';
import ServiceBootstrap from './services/bootstrap';
import RepositoryBootstrap from './repositories/bootstrap';

const bottle = new Bottle();

// bootstrap
ConstantBootstrap.load(bottle);
RepositoryBootstrap.load(bottle);
ServiceBootstrap.load(bottle);

// ingested by handler
export default bottle;