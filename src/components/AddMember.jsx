import { useEffect, useState, useRef } from 'react';
import { BASE_URL } from '../config';
import { useUser } from '../hooks/useUser';
import axios from 'axios';
import { ListGroup, Placeholder, Badge } from 'react-bootstrap';

// TODO - Add dynamic search with updated pagination

const userIds = [];

const Spinner = function () {
  return (
    <ListGroup className="member-container mt-3" title="Please wait...">
      <Placeholder as={ListGroup.Item} animation="glow" className="mb-2">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as={ListGroup.Item} animation="glow" className="mb-2">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as={ListGroup.Item} animation="glow">
        <Placeholder xs={12} />
      </Placeholder>
    </ListGroup>
  );
};

function AddMember({ teamId, isOpen, setSelectedUserIds }) {
  if (isOpen === false) return;

  /**
   * Users local state
   */

  const userSchema = {
    users: [],
    error: '',
    count: 0,
    isLoading: false,
    isFooterLoader: false,
  };

  const { user } = useUser();
  const API_URL = BASE_URL + '/member';
  const LIMIT = 10;

  const [members, setMembers] = useState(userSchema);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const listRef = useRef(null);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;

    console.log(hasMoreData);
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

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    let loadingKey = '';

    if (page == 1) {
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
          teamId: teamId,
          isMember: false,
          page: page,
          pageCount: LIMIT,
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
  }, [page]);

  return (
    <>
      <input
        type="text"
        placeholder="Please type user email or name"
        className="w-100 form-control"
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
