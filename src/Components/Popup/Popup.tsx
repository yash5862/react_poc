import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./Popup.css";
import Delete from "../../assets/delete_White.svg";
const Popup = ({ isOpen, hideModal }: any) => {
  const [keywords, setKeywords]: any = useState("");
  const [allKeyWords, setAllKeyWords]: any = useState([]);

  const keyWordAddHandler = () => {
    if (keywords) {
      setAllKeyWords([...allKeyWords, keywords]);
      setKeywords("");
    }
  };

  const removeKeywordHandler = (value: any) => {
    var index = allKeyWords.indexOf(value);
    if (index !== -1) {
      allKeyWords.splice(index, 1);
      setAllKeyWords([...allKeyWords]);
    }
  };
  return (
    <>
      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Enter Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="keywords-input-Container">
            <input
              type="text"
              placeholder="Enter Keyword here"
              onChange={(e) => setKeywords(e.target.value)}
              //   onKeyDown={keypreessEvent}
              value={keywords}
              className="Popup_Input"
            />

            <div className="add-Container-model" onClick={keyWordAddHandler}>
              +
            </div>
          </div>
          <div className="Tags-list-container">
            {allKeyWords.map((value: any, index: number) => {
              return (
                <div
                  key={"keyword" + index}
                  onClick={() => removeKeywordHandler(value)}
                >
                  {value} <img src={Delete} alt="Delete" />
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={hideModal}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Popup;
