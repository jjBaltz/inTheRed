/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleResource } from '../../api/resourcesData';

export default function ViewResource() {
  const [resourceDetails, setResourceDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleResource(firebaseKey).then(setResourceDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-black ms-5 details">
        <h5 className="re-text">
          {resourceDetails.title}
          {resourceDetails.resourceObject?.favorite ? ' ☆' : ''}
        </h5>
        <hr />
        <p>{resourceDetails.description || ''}</p>
      </div>
    </div>
  );
}
