
import {render} from 'enzyme';
import { Main }  from './Main.jsx';


describe("<Main />", () => {
  it("Should be component", () => {
    const component = render(<Main dat={{admin: false}} />);
      expect(component.find('.links_form').length).toBe(1);
  })
})
