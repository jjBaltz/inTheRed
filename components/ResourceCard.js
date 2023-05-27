import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteResource } from '../api/resourcesData';

function ResourceCard({ resourceObj, onUpdate }) {
  const deleteThisResource = () => {
    if (window.confirm(`Delete ${resourceObj.title}?`)) {
      deleteResource(resourceObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{resourceObj.title}</Card.Title>
        <p className="card-text bold">{resourceObj.favorite && <span>Favorite<br /></span> } {resourceObj.description}</p>
        <Link href={`/resource/${resourceObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            <i className="bi bi-arrow-up-right-square" />
          </Button>
        </Link>
        <Link href={`/resource/edit/${resourceObj.firebaseKey}`} passHref>
          <Button variant="info">
            <i className="bi bi-pencil-square" />
          </Button>
        </Link>
        <Button variant="danger" onClick={deleteThisResource} className="m-2">
          <i className="bi bi-trash" />
        </Button>
      </Card.Body>
    </Card>
  );
}

ResourceCard.propTypes = {
  resourceObj: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ResourceCard;
