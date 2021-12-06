import React from 'react'
import './TagHandler.css'
import Delete from '../../assets/delete.svg'

interface props {
  tagList: Array<String>
  handleDeleteTag: (tagName: String) => void
}

const TagHandler = ({ tagList, handleDeleteTag }: props) => {

  return (
    <div className='TagHandler-Container'>
      <ul id='tag-list'>
        {tagList && tagList.length ? tagList?.map((item: any, index: number) => {
          return (
            <li key={index}>
              {item?.name} <img src={Delete} className='Delete_icon' alt="contact Img" onClick={() => handleDeleteTag(item.name)} />
            </li>
          )
        }) : <div>...Loding</div>}
      </ul>
    </div>
  )
}

export default TagHandler
