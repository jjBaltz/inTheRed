/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getResources } from '../api/resourcesData';
import ResourceCard from '../components/ResourceCard';

export default function Resources() {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);

  const getAllResources = () => {
    getResources(user.uid).then(setResources);
  };

  useEffect(() => {
    getAllResources();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/resource/newResource" passHref>
        <Button variant="primary">Add New Resource</Button>
      </Link>
      <div className="text-center my-4 d-flex flex-wrap">
        {resources.map((resource) => (
          <ResourceCard key={resource.firebaseKey} resourceObj={resource} onUpdate={getAllResources} />
        ))}
      </div>
    </div>
  );
}
