import React, { Component } from "react";
import "./styles.css";
import { MdRemove, MdAdd, MdContentCopy, MdVpnKey } from "react-icons/md";
import {FaKey} from "react-icons/fa"
import { IconContext } from "react-icons";

const pswdChars = [
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "abcdefghijklmnopqrstuvwxyz",
  "0123456789",
  "\\ !\"#$%&'()*+,-./:;<=>?@[]^_`{|}~"
];
const minLngth = 6;
const maxLngth = 20;

class App extends Component {
  state = {
    password: "",
    selected: [true, true, true, true],
    length: 10,
    copied: false
  };
  componentDidMount() {
    this.handleBtnClick(undefined);
  }
  handleBtnClick = (e) => {
    if (e) e.preventDefault();
    let len = this.state.length;
    let pswd = "";

    while (len > 0) {
      const i = Math.floor(Math.random() * 4);
      if (!this.state.selected[i]) continue;
      pswd += pswdChars[i].charAt(
        Math.floor(Math.random() * pswdChars[i].length)
      );
      --len;
    }

    this.setState({ password: pswd, copied: false });
  };

  handleSelect = (e) => {
    // e.preventDefault()
    const selected = this.state.selected;
    const index = e.target.value;
    selected[index] = !selected[index];
    if (selected[0] || selected[1] || selected[2] || selected[3]) {
      this.setState({ selected: selected });
      this.handleBtnClick(undefined);
    }
  };
  handleIncrementDecrement = (type) => {
    let length = this.state.length;
    if (type === "increase" && length < maxLngth) length++;
    else if (type === "decrease" && length > minLngth) length--;
    else return;
    this.setState({ length: length });
    this.handleBtnClick(undefined);
  };
  render() {
    const { selected, length, copied } = this.state;
    return (
      <div className="App">
        <div className={'title'}>
          <IconContext.Provider
                  value={{ style: { color: "#1a1a2e" }, size: "2rem" }}
                >
                  <FaKey />
          </IconContext.Provider>
          <span>Password Generator</span>
        </div>
        <div className="output">
          <div
            className={"password"}
            style={{ color: copied ? "green" : "#1b262c" }}
          >
            {this.state.password}
          </div>
          <div
            className={"copy"}
            onClick={() => {
              this.setState({ copied: true });
              navigator.clipboard.writeText(this.state.password).catch((err)=>{
                return                
              });
            }}
          >
            <IconContext.Provider
              value={{
                style: { color: copied ? "green" : "#474a56" },
                size: "1.6rem"
              }}
            >
              <MdContentCopy />
            </IconContext.Provider>
          </div>
        </div>

        <div className={"control-group"}>
          <div className={"inc-dcr"}>
            <div
              className={"inc-dcr_btn"}
              onClick={() => {
                this.handleIncrementDecrement("decrease");
              }}
            >
              <IconContext.Provider
                value={{ style: { color: "#474a56" }, size: "1.6rem" }}
              >
                <MdRemove />
              </IconContext.Provider>
            </div>

            <span className={"inc-dcr_len"}>{length}</span>

            <div
              className={"inc-dcr_btn"}
              onClick={() => {
                this.handleIncrementDecrement("increase");
              }}
            >
              <IconContext.Provider
                value={{ style: { color: "#474a56" }, size: "1.6rem" }}
              >
                <MdAdd />
              </IconContext.Provider>
            </div>
          </div>
          <label className={"control control--checkbox"}>
            Uppercase
            <input
              type="checkbox"
              checked={selected[0]}
              onChange={this.handleSelect}
              value="0"
            />
            <div className="control__indicator"></div>
          </label>
          <label className={"control control--checkbox"}>
            Lowercase
            <input
              type="checkbox"
              checked={selected[1]}
              onChange={this.handleSelect}
              value="1"
            />
            <div className="control__indicator"></div>
          </label>
          <label className={"control control--checkbox"}>
            Numbers
            <input
              type="checkbox"
              checked={selected[2]}
              onChange={this.handleSelect}
              value="2"
            />
            <div className="control__indicator"></div>
          </label>
          <label className={"control control--checkbox"}>
            Symbols
            <input
              type="checkbox"
              checked={selected[3]}
              onChange={this.handleSelect}
              value="3"
            />
            <div className="control__indicator"></div>
          </label>
        </div>
        <button className="btn" onClick={this.handleBtnClick}>
          Generate
        </button>
      </div>
    );
  }
}

export default App;
