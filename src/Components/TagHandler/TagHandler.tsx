import React from "react";
import "./TagHandler.css";
import Delete from "../../assets/delete.svg";
import "./TagHandler.css";
interface props {
  tagList: Array<String>;
}

const TagHandler = ({ tagList }: props) => {
  return (
    <div className="TagHandler-Container">
      <ul id="tag-list">
        {tagList?.map((value, index) => {
          return (
            <li key={index}>
              {value}{" "}
              <img src={Delete} className="Delete_icon" alt="contact Img" />
              <div className="checkbox">
                <input type="checkbox" id={`checkboxTagSelection${index}`} name="" />
                <label htmlFor={`checkboxTagSelection${index}`}></label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TagHandler;
