"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _enzyme = require("enzyme");

var _chai = require("chai");

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _Checkbox = require("./Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Checkbox", function () {
  it("should render an <div> tag", function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Checkbox2.default, null));
    (0, _chai.expect)(wrapper.type()).equal("div");
  });

  it('should contain one <input type="checkbox"> node', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Checkbox2.default, null));
    (0, _chai.expect)(wrapper.find('input[type="checkbox"]').length).equal(1);
  });

  it("changes without problems", function () {
    var onInputChange = _sinon2.default.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Checkbox2.default, { onChange: onInputChange }));
    wrapper.find('input[type="checkbox"]').simulate("change", {
      target: { checked: true },
      stopPropagation: function stopPropagation() {}
    });
    (0, _chai.expect)(onInputChange).to.have.property("callCount", 1);
  });
});