import { PropTypes } from 'prop-types';
import Card from 'react-bootstrap/Card';

export default function User({ userObj }) {
  return (
    <div className="user-card">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={userObj.photoURL} />
        <Card.Body>
          <Card.Title>{userObj.displayName}</Card.Title>
          <Card.Text>
            {userObj.email}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

User.propTypes = {
  userObj: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};
