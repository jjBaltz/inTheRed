import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteEntry } from '../api/entriesData';

function EntryCard({ entryObj, onUpdate }) {
  const deleteThisEntry = () => {
    if (window.confirm(`Delete ${entryObj.title}?`)) {
      deleteEntry(entryObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{entryObj.title}</Card.Title>
        <p className="card-text">{entryObj.food}</p>
        <p className="card-text">{entryObj.water}</p>
        <p className="card-text">{entryObj.energy}</p>
        <p className="card-text">{entryObj.mood}</p>
        <p className="card-text">{entryObj.social}</p>
        <p className="card-text">{entryObj.description}</p>
        <Link href={`/entry/${entryObj.firebaseKey}`} passHref>
          <Button variant="success" className="m-2">
            <i className="bi bi-arrow-up-right-square" />
          </Button>
        </Link>
        <Button variant="danger" onClick={deleteThisEntry} className="m-2">
          <i className="bi bi-trash" />
        </Button>
      </Card.Body>
    </Card>
  );
}

EntryCard.propTypes = {
  entryObj: PropTypes.shape({
    title: PropTypes.string,
    food: PropTypes.number,
    water: PropTypes.number,
    energy: PropTypes.number,
    mood: PropTypes.number,
    social: PropTypes.number,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EntryCard;
