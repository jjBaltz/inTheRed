import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getResources, updateResource, createResource } from '../../api/resourcesData';

const initialState = {
  title: '',
  description: '',
  favorite: false,
};

function ResourceForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getResources(user.uid).then(setFormInput);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateResource(formInput)
        .then(() => router.push('/resources'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createResource(payload).then(() => {
        router.push('/resources');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: '75%' }}>
      <div className="entry-form d-flex align-items-center justify-content-center">
        <h2 className="text-black mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Resource</h2>

        {/* TITLE INPUT  */}
        <FloatingLabel controlId="floatingInput1" label="Resource Title" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Resource Title"
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
            style={{ height: '100px' }}
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
        <Button type="submit" className="newRe">{obj.firebaseKey ? 'Update' : 'Create'} Resource</Button>
      </div>
    </Form>
  );
}

ResourceForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

ResourceForm.defaultProps = {
  obj: initialState,
};

export default ResourceForm;
