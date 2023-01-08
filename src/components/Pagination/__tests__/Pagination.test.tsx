import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ReactPaginate from 'react-paginate';

import Pagination from '../Pagination';

describe('Pagination', () => {
  it('should render correctly', () => {
    const component = shallow(<Pagination onPageChange={jest.fn()} />);
    const tree = renderer.create(component);
    expect(tree).toMatchSnapshot();
    expect(component.find(ReactPaginate)).toHaveLength(1);
  });

  it('should call the onPageChange when changing the page', () => {
    const onPageChange = jest.fn();
    const component = shallow(<Pagination onPageChange={onPageChange} />);

    component.find(ReactPaginate).props().onPageChange('test');

    expect(onPageChange).toHaveBeenCalledWith('test');
  });
});
