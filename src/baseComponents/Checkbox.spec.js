import React from "react";
import { shallow, render, mount } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";
import Checkbox from "./Checkbox";

describe("Checkbox", function () {
  it("should render an <div> tag", () => {
    const wrapper = shallow(<Checkbox />);
    expect(wrapper.type()).equal("div");
  });

  it("prop check worked", () => {
    const wrapper = shallow(<Checkbox checked="checked" />)
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).equal(true);
  })
  it('should contain one <input type="checkbox"> node', () => {
    const wrapper = shallow(<Checkbox />);
    expect(wrapper.find('input[type="checkbox"]').length).equal(1);
  });
  it("give disabled props checkIcon color is rgba(0, 0, 0, 0.298039) ", () => {
    const wrapper = render(<Checkbox disabled={true} />)
    let svgIcon = wrapper.find("svg")
    expect(svgIcon.attr("fill")).equal("rgba(0, 0, 0, 0.298039)")
  })
  it("give disabled props checkIcon color isrgba(0, 0, 0, 0.870588)", () => {
    const wrapper = render(<Checkbox disabled={false} />)
    let svgIcon = wrapper.find("svg")
    expect(svgIcon.attr("fill")).equal("rgba(0, 0, 0, 0.870588)")
  })
  it("give disabled props checkIcon color isrgba(0, 0, 0, 0.3)", () => {
    const wrapper = render(<Checkbox disabled={false} checked="checked" checkedColor="rgba(0, 0, 0, 0.3)" />)
    let svgIcon = wrapper.find("svg")
    expect(svgIcon.attr("fill")).equal("rgba(0, 0, 0, 0.3)")
  })
  it("give disabled props checkIcon color isrgba(0, 0, 0, 0.3)", () => {
    const wrapper = render(<Checkbox disabled={true} checked="checked" disabledColor="rgba(0, 0, 0, 0.3)" />)
    let svgIcon = wrapper.find("svg")
    expect(svgIcon.attr("fill")).equal("rgba(0, 0, 0, 0.3)")
  })
  it("give disabled props checkIcon color isrgba(0, 0, 0, 0.3)", () => {
    const wrapper = render(<Checkbox disabled={true} checked="indeterminate" disabledColor="rgba(0, 0, 0, 0.3)" />)
    let svgIcon = wrapper.find("svg")
    expect(svgIcon.attr("fill")).equal("rgba(0, 0, 0, 0.3)")
  })
  it("simulat click", () => {
    const onInputClick = sinon.spy()
    const wrapper = shallow(<Checkbox onClick={onInputClick} />)
    const input = wrapper.find("input")
    input.simulate("click", {
      target: { checked: false },
      stopPropagation: () => { }
    });
    expect(onInputClick).to.have.property("callCount", 1)
  })
  it("changes without problems", function () {
    const onInputChange = sinon.spy();
    const wrapper = shallow(<Checkbox onChange={onInputChange} />);
    wrapper.find('input[type="checkbox"]').simulate("change", {
      target: { checked: true },
      stopPropagation: () => { }
    });
    expect(onInputChange).to.have.property("callCount", 1);
  });

  it("changes with checked", function () {
    const onInputChange = sinon.spy();
    const wrapper = shallow(<Checkbox onChange={onInputChange} checked="checked" />);
    wrapper.find('input[type="checkbox"]').simulate("change", {
      target: { checked: true },
      stopPropagation: () => { }
    });
    expect(onInputChange).to.have.property("callCount", 1);
  });
  it("pass indeterminate,return a svg ", () => {
    const wrapper = render(<Checkbox checked="indeterminate" />)
    const svgChildren = wrapper.children().find("svg").children()
    expect(svgChildren[0].name).equal("defs")
  })
  it("pass indeterminate,return a svg ", () => {
    const wrapper = render(<Checkbox checked="default" />)
    const svgChildren = wrapper.children().find("svg").children()
    expect(svgChildren.length).equal(2)
  })

  it("pass name wlue", () => {
    const wrapper = shallow(<Checkbox name="wlue" />)
    expect(wrapper.find("input").prop("name")).equal("wlue")
  })

});
