import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";
import Checkbox from "./Checkbox";

describe("Checkbox", function() {
  it("should render an <div> tag", () => {
    const wrapper = shallow(<Checkbox />);
    expect(wrapper.type()).equal("div");
  });

  it('should contain one <input type="checkbox"> node', () => {
    const wrapper = shallow(<Checkbox />);
    expect(wrapper.find('input[type="checkbox"]').length).equal(1);
  });

  it("changes without problems", function() {
    const onInputChange = sinon.spy();
    const wrapper = shallow(<Checkbox onChange={onInputChange} />);
    wrapper.find('input[type="checkbox"]').simulate("change", {
      target: { checked: true },
      stopPropagation: () => {}
    });
    expect(onInputChange).to.have.property("callCount", 1);
  });
});
