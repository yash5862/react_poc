import React from "react";
import PopupComp from "../Popup/Popup";

interface props {
  contact: IContact;
  id: number;
  selectContact: (contactId: number) => void;
  token: String;
}
const ContactComp = ({ contact, id, selectContact, token }: props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const hideModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="Contact-Children-container">
      <div className="checkbox">
        <input
          type="checkbox"
          id={`checkbox${id}`}
          name=""
          value=""
          checked={contact.check || false}
          onClick={() => selectContact(contact.id)}
        />
        <label htmlFor={`checkbox${id}`}></label>
      </div>
      <div className="Border-container">
        <div className="Profile-Container">
          <img
            src={`https://source.unsplash.com/collection/${id}/200x200`}
            alt="Profile"
          />
        </div>
        <div className="Details-container">
          <span className="Name-text">{contact?.name}</span>
          <span className="Number-text">+{contact?.phoneNumber}</span>
        </div>
      </div>
      <div className='Tag-list-container'>
        {contact?.tags?.map((Tag: any, index: number) => {
          return (
            <div className='Tag-container' key={index}>
              {Tag?.name}
            </div>
          );
        })}
      </div>
      <div
        className="add-Container"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        +
      </div>
      <PopupComp isOpen={isOpen} hideModal={hideModal} />
    </div>
  );
};

export default ContactComp;
