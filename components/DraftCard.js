import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteEntry } from '../api/entriesData';

function DraftCard({ draftObj, onUpdate }) {
  const deleteThisEntry = () => {
    if (window.confirm(`Delete ${draftObj.title}?`)) {
      deleteEntry(draftObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{draftObj.title}</Card.Title>
        <p className="card-text">{draftObj.food}</p>
        <p className="card-text">{draftObj.water}</p>
        <p className="card-text">{draftObj.energy}</p>
        <p className="card-text">{draftObj.mood}</p>
        <p className="card-text">{draftObj.social}</p>
        <p className="card-text">{draftObj.description}</p>
        <Link href={`/entry/${draftObj.firebaseKey}`} passHref>
          <Button variant="success" className="m-2">
            <i className="bi bi-arrow-up-right-square" />
          </Button>
        </Link>
        <Link href={`/entry/edit/${draftObj.firebaseKey}`} passHref>
          <Button variant="info">
            <i className="bi bi-pencil-square" />
          </Button>
        </Link>
        <Button variant="danger" onClick={deleteThisEntry} className="m-2">
          <i className="bi bi-trash" />
        </Button>
      </Card.Body>
    </Card>
  );
}

DraftCard.propTypes = {
  draftObj: PropTypes.shape({
    title: PropTypes.string,
    food: PropTypes.number,
    water: PropTypes.number,
    energy: PropTypes.number,
    mood: PropTypes.number,
    social: PropTypes.number,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
    isSubmitted: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default DraftCard;
