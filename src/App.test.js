import { shallow } from 'enzyme';

import App from './App';

describe('App', () => {
  it('initial test', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
    expect(component.find('a')).toHaveLength(1);
  });
});
