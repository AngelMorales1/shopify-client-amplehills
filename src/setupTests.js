import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.URL = {
  ...global.URL,
  createObjectURL: () => {}
};

global.localStorage = {
  ...global.localStorage,
  getItem: () => {},
  removeItem: () => {},
  setItem: () => {}
};

configure({ adapter: new Adapter() });
