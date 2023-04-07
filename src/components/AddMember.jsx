import { useEffect, useState, useRef } from 'react';
import { BASE_URL } from '../config';
import { useUser } from '../hooks/useUser';
import axios from 'axios';
import { ListGroup, Placeholder, Badge } from 'react-bootstrap';

import Spinner from './Spinner';

let startSearch = undefined;

function AddMember({ teamId, isOpen, setSelectedUserIds }) {
  if (isOpen === false) return;

  /**
   * Users local state
   */

  const userModel = {
    users: [],
    error: '',
    count: 0,
    isLoading: false,
    isFooterLoader: false,
  };

  const userIds = [];

  const { user } = useUser();
  const API_URL = BASE_URL + '/member';
  const LIMIT = 10;

  const [members, setMembers] = useState(userModel);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(0);
  const listRef = useRef(null);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;

    // Check if user has scrolled to the end of the list
    if (scrollTop + clientHeight === scrollHeight && hasMoreData === true) {
      console.log('Scroll to end of list:: Load more data from API server');
      setPage((prevState) => prevState + 1);
    }
  };

  const selectMember = (user) => {
    user.isSelected = !user.isSelected;
    // update selected members
    if (user.isSelected === true) {
      userIds.push(user.id);
    } else {
      const index = userIds.indexOf(user.id);

      if (index !== -1) {
        userIds.splice(index, 1);
      }
    }

    setSelectedUserIds([...userIds]);

    setMembers((prevState) => {
      return {
        ...prevState,
        users: prevState.users,
      };
    });
  };

  const handleSearch = (e) => {
    let query = e.target.value;

    const searchStr = query
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, ' ')
      .trim();

    // reset page
    setSearch(searchStr);
    if (startSearch) clearTimeout(startSearch);

    startSearch = setTimeout(() => {
      console.log(searchStr);

      console.log('We will call API');

      setMembers({ ...userModel });
      setPage(1);
      setIsSearch((prevState) => prevState + 1);
    }, 300);
  };

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    let loadingKey = '';
    console.log('Chanes are captured');

    if (page === 1) {
      loadingKey = 'isLoading';
    } else {
      loadingKey = 'isFooterLoader';
    }

    setMembers((prevState) => {
      return {
        ...prevState,
        [loadingKey]: true,
        error: '',
      };
    });

    axios
      .get(API_URL, {
        params: {
          teamId,
          isMember: false,
          page,
          pageCount: LIMIT,
          search,
        },

        headers: {
          'access.token': user.accessToken,
        },

        cancelToken: source.token,
      })
      .then((response) => {
        if (response.status === 200) {
          response.data.result?.data?.rows.forEach((user) => {
            user.isSelected = false;
          });

          // stop lazy loading if we have reached the end of the response
          setMembers((prevState) => {
            setHasMoreData(
              response.data.result?.data?.count >=
                prevState.users.length + response.data.result?.data?.rows.length
            );
            return {
              ...prevState,
              users: [...prevState.users, ...response.data.result?.data?.rows],
              count: response.data.result?.data?.count,
            };
          });
        }

        setMembers((prevState) => {
          return {
            ...prevState,
            isLoading: false,
            isFooterLoader: false,
            error: '',
          };
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('successfully aborted');
        } else {
          // handle error
          setMembers((prevState) => {
            return {
              ...prevState,
              isLoading: false,
              isFooterLoader: false,
              error: 'Server is not responding. Please try again',
            };
          });
        }
      });

    return () => {
      // cancel the subscription
      source.cancel();
    };
  }, [page, isSearch]);

  return (
    <>
      <input
        type="text"
        name="Search"
        placeholder="Please type user email or name"
        className="w-100 form-control"
        value={search}
        onChange={handleSearch}
      />
      {members.isLoading === true ? (
        <Spinner />
      ) : (
        <ListGroup
          as="ol"
          numbered
          className="member-container mt-3"
          ref={listRef}
          onScroll={handleScroll}
        >
          {members.users.map((member) => (
            <ListGroup.Item
              as="li"
              className={`d-flex justify-content-between align-items-start ${
                member.isSelected ? 'active' : ''
              }`}
              key={member.id}
              onClick={() => selectMember(member)}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{member.name}</div>
                <i> {member.email} </i>
              </div>
              <Badge
                bg={member.role === 'team-member' ? 'primary' : 'secondary'}
                pill
              >
                {member.role === 'team-member' ? 'TM' : 'TL'}
              </Badge>
            </ListGroup.Item>
          ))}
          {members.isFooterLoader && (
            <Placeholder as={ListGroup.Item} animation="glow" className="mb-2">
              <Placeholder xs={12} />
            </Placeholder>
          )}
        </ListGroup>
      )}
    </>
  );
}

export default AddMember;
