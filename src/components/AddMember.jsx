import { useEffect, useState } from 'react';
import { BASE_URL } from '../config';
import { useUser } from '../hooks/useUser';
import axios from 'axios';
import { ListGroup, Placeholder, Badge } from 'react-bootstrap';

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

function AddMember({ teamId, isOpen }) {
  if (isOpen === false) return;

  /**
   * Users local state
   */

  const userSchema = {
    users: [],
    error: '',
    isLoading: false,
  };

  const { user } = useUser();
  const API_URL = BASE_URL + '/member';
  const [members, setMembers] = useState(userSchema);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    setMembers((prevState) => {
      return {
        ...prevState,
        isLoading: true,
        error: '',
      };
    });

    axios
      .get(API_URL, {
        params: {
          teamId: teamId,
          isMember: false,
          page: 1,
          pageCount: 10,
        },

        headers: {
          'access.token': user.accessToken,
        },

        cancelToken: source.token,
      })
      .then((response) => {
        if (response.status === 200) {
          setMembers((prevState) => {
            return {
              ...prevState,
              users: response.data.result?.data?.rows,
            };
          });
        }

        setMembers((prevState) => {
          return {
            ...prevState,
            isLoading: false,
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
              error: 'Server is not responding. Please try again',
            };
          });
        }
      });

    return () => {
      // cancel the subscription
      source.cancel();
    };
  }, [teamId]);

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
        <ListGroup as="ol" numbered className="member-container mt-3">
          {members.users.map((member) => (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
              key={member.id}
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
        </ListGroup>
      )}
    </>
  );
}

export default AddMember;
