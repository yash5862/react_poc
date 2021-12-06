import React from 'react'
import './Sidebar.css'
import TagHandler from '../TagHandler/TagHandler'
import Menu from '../../assets/menu.png'
const Sidebar = () => {
  const includeTagList = ['Greeting1', 'Greeting2', 'Greeting3', 'Greeting4']
  return (
    <div className='col-3 p-4 shadow h-100 bg-light Sidebar_Container'>
      <div className='Sidebar_Header'>
        <img alt='Menu' src={Menu} className='hamburger_menu' />
        <div className='Heading_Font'>Audience</div>
        <div className='Smaller_Font'>100 Contacts</div>
      </div>

      <div>
        <div className='SubHeading_Bold'>Include Tags:</div>
        <TagHandler tagList={includeTagList} />
      </div>

      <div>
        <div className='SubHeading_Bold'>Exclude Tags:</div>
        <TagHandler tagList={includeTagList} />
      </div>

      <div>
        <div className='SubHeading_Bold'>Message Sent:</div>
        <div className='input-group-container'>
          <input placeholder='Max' />
          <input placeholder='Min' />
        </div>
      </div>
      <div>
        <div className='SubHeading_Bold'>Message Received:</div>
        <div className='input-group-container'>
          <input placeholder='Max' />
          <input placeholder='Min' />
        </div>
      </div>

      <div className='btn btn-lg btn-block w-100 SideBar-btn'>Save Filter</div>
    </div>
  )
}

export default Sidebar
