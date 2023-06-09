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

    if (draftObj.firebaseKey) setFormInput(draftObj);
  }, [draftObj, user]);

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
    } else if (draftObj.firebaseKey) {
      updateEntry({ ...formInput, isSubmitted: true })
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
    <Form onSubmit={[handleSubmitEntry, handleSubmitDraft]} style={{ width: '75%' }}>
      <div className="entry-form d-flex align-items-center justify-content-center">
        <h2 className="text-black mt-5">{entryObj.firebaseKey ? 'Update' : 'Create'} Entry</h2>
        <Button type="submit" id="create-draft" onClick={handleSubmitDraft}>{draftObj.firebaseKey ? 'Update' : 'Save As'} Draft</Button>

        <div className="RangeSliders">
          <FloatingLabel>
            <input
              id="range1"
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

          <div className="foodTip" title="On a scale of starving to full, what is your hunger level?">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-square" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
          </div>

          <FloatingLabel>
            <input
              id="range2"
              type="range"
              min={0}
              max={100}
              value={formInput.water}
              name="water"
              onChange={(e) => {
                setFormInput((prevState) => ({
                  ...prevState,
                  water: e.target.value,
                }));
              }}
            />
          </FloatingLabel>

          <div className="waterTip" title="On a scale of parched to sated, what is your hydration level?">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-square" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
          </div>

          <FloatingLabel>
            <input
              id="range3"
              type="range"
              min={0}
              max={100}
              value={formInput.energy}
              name="energy"
              onChange={(e) => {
                setFormInput((prevState) => ({
                  ...prevState,
                  energy: e.target.value,
                }));
              }}
            />
          </FloatingLabel>
          <div className="energyTip" title="On a scale of fatigued to energized, what is your energy level?">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-square" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
          </div>

          <FloatingLabel>
            <input
              id="range4"
              type="range"
              min={0}
              max={100}
              value={formInput.mood}
              name="mood"
              onChange={(e) => {
                setFormInput((prevState) => ({
                  ...prevState,
                  mood: e.target.value,
                }));
              }}
            />
          </FloatingLabel>
          <div className="moodTip" title="On a scale of negative to positive, how is your mood?">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-square" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
          </div>

          <FloatingLabel>
            <input
              id="range5"
              type="range"
              min={0}
              max={100}
              value={formInput.social}
              name="social"
              onChange={(e) => {
                setFormInput((prevState) => ({
                  ...prevState,
                  social: e.target.value,
                }));
              }}
            />
          </FloatingLabel>
          <div className="socialTip" title="On a scale of reclusive to socialable, what is your social output?">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-square" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
          </div>
        </div>

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
          className="text-black mb-3"
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
        <Button type="submit" id="create-entry" onClick={handleSubmitEntry}>{entryObj.firebaseKey ? 'Update' : 'Create'} Entry</Button>
      </div>
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
