import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import TagHandler from "../TagHandler/TagHandler";
import Menu from "../../assets/menu.png";
import axios from "axios";
const Sidebar = ({ token, ContactCount }: any) => {
  const [tageData, setTageData]: any = useState([]);

  useEffect(() => {
    getTagData(token);
  }, [token]);

  const getTagData = async (token: String) => {
    if (token) {
      try {
        await axios
          .get(`https://api-im.chatdaddy.tech/tags`, {
            headers: {
              authorization: `Bearer ${token}`,
              // 'Content-Type': 'application/json'
            },
          })
          .then(
            (response) => {
              const result = response;
              if (result.status === 200) {
                setTageData(result.data.tags);
              }
            },
            (error) => {
              console.log("error", error);
            }
          );
      } catch (e) {
        console.log("error", e);
      }
    }
  };

  const handleDeleteTag = async (tagName: String) => {
    if (token) {
      const copyData = tageData;
      const filterTagData = copyData.filter(
        (item: any) => item.name !== tagName
      );
      setTageData(filterTagData);
      try {
        await axios
          .delete(`https://api-im.chatdaddy.tech/tags?name=${tagName}`, {
            headers: {
              authorization: `Bearer ${token}`,
              // 'Content-Type': 'application/json'
            },
          })
          .then(
            (response) => {
              const result = response;
              if (result.status === 200) {
              }
            },
            (error) => {
              console.log("error", error);
            }
          );
      } catch (e) {
        console.log("error", e);
      }
    }
  };

  const handleMessageSent = (e: any) => { };

  return (
    <div className="col-3 p-4 shadow h-100 bg-light Sidebar_Container">
      <div className="Sidebar_Header">
        <img alt="Menu" src={Menu} className="hamburger_menu" />
        <div className="Heading_Font">Audience</div>
        <div className="Smaller_Font">{ContactCount} Contacts</div>
      </div>

      <div>
        <div className="SubHeading_Bold">Include Tags:</div>
        <TagHandler tagList={tageData} handleDeleteTag={handleDeleteTag} />
      </div>

      <div>
        <div className="SubHeading_Bold">Exclude Tags:</div>
        <TagHandler tagList={tageData} handleDeleteTag={handleDeleteTag} />
      </div>

      <div>
        <div className="SubHeading_Bold">Message Sent:</div>
        <div className="input-group-container">
          <input
            placeholder="Max"
            type="number"
            name="maxMessagesSent"
            onChange={handleMessageSent}
          />
          <input
            placeholder="Min"
            type="number"
            name="minMessagesSent"
            onChange={handleMessageSent}
          />
        </div>
      </div>
      <div>
        <div className="SubHeading_Bold">Message Received:</div>
        <div className="input-group-container">
          <input placeholder="Max" type="number" />
          <input placeholder="Min" type="number" />
        </div>
      </div>

      <div className="btn btn-lg btn-block w-100 SideBar-btn">Save Filter</div>
    </div>
  );
};

export default Sidebar;
