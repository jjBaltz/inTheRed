import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import {
  getDraftedEntries, updateEntry, createEntry,
} from '../../api/entriesData';

const initialState = {
  title: '',
  food: 0,
  water: 0,
  energy: 0,
  mood: 0,
  social: 0,
  description: '',
  isSubmitted: false,
};

function EntryForm({ entryObj, draftObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getDraftedEntries(user.uid);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitEntry = (e) => {
    e.preventDefault();
    if (entryObj.firebaseKey) {
      updateEntry(formInput)
        .then(() => router.push('/entries'));
    } else {
      const payload = { ...formInput, uid: user.uid, isSubmitted: true };
      createEntry(payload).then(() => {
        router.push('/entries');
      });
    }
  };

  const handleSubmitDraft = (e) => {
    e.preventDefault();
    if (draftObj.firebaseKey) {
      updateEntry(formInput)
        .then(() => router.push('/drafts'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createEntry(payload).then(() => {
        router.push('/drafts');
      });
    }
  };

  return (
    <Form onSubmit={[handleSubmitEntry, handleSubmitDraft]}>
      <h2 className="text-white mt-5">{entryObj.firebaseKey ? 'Update' : 'Create'} Entry</h2>

      <FloatingLabel id="range1" className="RangeSlider">
        <input
          className="RangeSlider"
          type="range"
          min={0}
          max={100}
          value={formInput.food}
          name="food"
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              food: e.target.value,
            }));
          }}
        />
      </FloatingLabel>

      <FloatingLabel id="range2">
        <input
          className="RangeSlider"
          type="range"
          min={0}
          max={100}
          value={formInput.water}
          name="water"
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              food: e.target.value,
            }));
          }}
        />
      </FloatingLabel>

      <FloatingLabel id="range3">
        <input
          className="RangeSlider"
          type="range"
          min={0}
          max={100}
          value={formInput.energy}
          name="energy"
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              food: e.target.value,
            }));
          }}
        />
      </FloatingLabel>

      <FloatingLabel id="range4">
        <input
          className="RangeSlider"
          type="range"
          min={0}
          max={100}
          value={formInput.mood}
          name="mood"
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              food: e.target.value,
            }));
          }}
        />
      </FloatingLabel>

      <FloatingLabel id="range5">
        <input
          className="RangeSlider"
          type="range"
          min={0}
          max={100}
          value={formInput.social}
          name="social"
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              food: e.target.value,
            }));
          }}
        />
      </FloatingLabel>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Entry Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Entry Title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: '300px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit" onClick={handleSubmitEntry}>{entryObj.firebaseKey ? 'Update' : 'Create'} Entry</Button>
      <Button type="submit" onClick={handleSubmitDraft}>{draftObj.firebaseKey ? 'Update' : 'Create'} Draft</Button>
    </Form>
  );
}

EntryForm.propTypes = {
  entryObj: PropTypes.shape({
    food: PropTypes.number,
    water: PropTypes.number,
    energy: PropTypes.number,
    mood: PropTypes.number,
    social: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
    isSubmitted: PropTypes.bool.isRequired,
  }),
  draftObj: PropTypes.shape({
    food: PropTypes.number,
    water: PropTypes.number,
    energy: PropTypes.number,
    mood: PropTypes.number,
    social: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
    isSubmitted: PropTypes.bool.isRequired,
  }),
};

EntryForm.defaultProps = {
  entryObj: initialState,
  draftObj: initialState,
};

export default EntryForm;
