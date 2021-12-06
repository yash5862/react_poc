import React, { useEffect, useState } from 'react'
import search from '../../assets/search.svg'
import ContactComp from '../ContactComp/ContactComp'
import InfiniteScroll from 'react-infinite-scroll-component'
import Sidebar from '../SideBar/Sidebar'
import axios from 'axios'
import './ContactList.css'


const ContactList = () => {
  const [token, setToken]: any = useState()
  const [contactData, setContactData]: any = useState({ contacts: [] });
  const [selectAll, setSelectAll]: any = useState(false)

  useEffect(() => {
    getToken()
  }, [])

  const getToken = async () => {
    try {
      await axios
        .post(`https://api-teams.chatdaddy.tech/token`, {
          refreshToken: '059c420e-7424-431f-b23b-af0ecabfe7b8',
          teamId: 'a001994b-918b-4939-8518-3377732e4e88'
        })
        .then(
          response => {
            const result: any = response
            if (result.status === 200) {
              setToken(result.data.access_token)
              const token = result.data.access_token
              getContacts(token)
            }
          },
          error => {
            console.log('error', error)
          }
        )
    } catch (e) {
      console.log('error', e)
    }
  }

  const getContacts = async (data: any) => {
    if (data) {
      try {
        await axios
          .get(`https://api-im.chatdaddy.tech/contacts`, {
            headers: {
              authorization: `Bearer ${data}`
              // 'Content-Type': 'application/json'
            }
          })
          .then(
            response => {
              const result = response
              if (result.status === 200) {
                const newData = result.data.contacts
                const checkArray: any = newData.map((item: any) => {
                  return { ...item, check: selectAll }
                });
                setContactData({ contacts: checkArray, nextPage: result.data.nextPage })
              }
            },
            error => {
              console.log('error', error)
            }
          )
      } catch (e) {
        console.log('error', e)
      }
    }
  }

  const searchContact = async (data: any) => {
    if (token && data) {
      try {
        await axios
          .get(`https://api-im.chatdaddy.tech/contacts?q=${data}`, {
            headers: {
              authorization: `Bearer ${token}`
            }
          })
          .then(
            response => {
              const result = response
              if (result.status === 200) {
                const newData = result.data.contacts
                const checkArray: any = newData.map((item: any) => {
                  return { ...item, check: selectAll }
                })
                setContactData({ contacts: checkArray, nextPage: result.data.nextPage })
              }
            },
            error => {
              console.log('error', error)
            }
          )
      } catch (e) {
        console.log('error', e)
      }
    }
  }

  const callSearchData = debounce(searchContact, 500)
  const handleSearchData = (e: any) => {
    if (e.target.value) {
      callSearchData(e.target.value)
    } else {
      getContacts(token)
    }
  }

  function debounce<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number
  ): (...args: Params) => void {
    let timer: NodeJS.Timeout
    return (...args: Params) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func(...args)
      }, timeout)
    }
  }

  //this is on react infinite scroll function all set for infinite scroll
  const getPaginationData = async () => {

    if (token && contactData.nextPage) {
      try {
        await axios
          .get(
            `https://api-im.chatdaddy.tech/contacts?page=${contactData.nextPage}`,
            {
              headers: {
                authorization: `Bearer ${token}`
              }
            }
          )
          .then(
            response => {
              const result = response
              if (result.status === 200) {
                const newData = result.data.contacts
                const checkArray: any = newData.map((item: any) => {
                  return { ...item, check: selectAll }
                })
                setContactData({
                  contacts: [...contactData.contacts, ...checkArray],
                  nextPage: result.data.nextPage
                })
              }
            },
            error => {
              console.log('error', error)
            }
          )
      } catch (e) {
        console.log('error', e)
      }
    }
  }

  const handleSelectAllContacts = () => {
    setSelectAll(!selectAll)
    let copyData = [...contactData.contacts]
    copyData = copyData.map((item: any) => {
      return { ...item, check: !selectAll }
    });
    setContactData({ contacts: copyData, nextPage: contactData.nextPage });
  }

  const selectContact = (contactId: number) => {
    let copyData = [...contactData.contacts]
    copyData = copyData.map((item: any) => {
      if (item.id === contactId) {
        item.check = !item.check
      }
      return item;
    });
    setContactData({ contacts: copyData, nextPage: contactData.nextPage });
  }

  return (
    <div className='row main-container-div'>
      <Sidebar token={token} />
      <div className='col-9 contact-list-container p-4'>
        <div>
          <div className='d-flex align-items-center justify-content-between'>
            <div className='Heading_Font'>
              All Contact({contactData?.contacts?.length})
            </div>
            <div className='Add-icon'>+</div>
          </div>
          <div className='Search-Container'>
            <input
              placeholder='Search Contacts'
              onChange={e => handleSearchData(e)}
            />
            <img src={search} alt='Search' />
          </div>
          <div className='Select-all-container'>
            <div className='checkbox'>
              <input
                type='checkbox'
                id='checkboxAllSelect'
                name=''
                value={selectAll}
                onClick={handleSelectAllContacts}
              />
              <label htmlFor='checkboxAllSelect'></label>
            </div>
            <span className='SubHeading_Regular'>Select All</span>
            <div className='btn btn-lg btn-block'>Export All</div>
          </div>
          <div
            className='Contact-list-sub-container'
            id='scrollableDiv'
            style={{ height: '75vh', overflow: 'auto' }}
          >
            <InfiniteScroll
              dataLength={contactData.contacts.length || 20} //This is important field to render the next data
              next={getPaginationData}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              scrollableTarget='scrollableDiv'
            >
              {contactData.contacts.map((contact: IContact) => {
                return (
                  <ContactComp
                    contact={contact}
                    key={contact.id}
                    id={contact.id}
                    selectContact={selectContact}
                  />
                )
              })}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactList
