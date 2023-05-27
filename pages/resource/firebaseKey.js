/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewResourceDetails } from '../../api/mergedData';

export default function ViewResource() {
  const [resourceDetails, setResourceDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewResourceDetails(firebaseKey).then(setResourceDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-black ms-5 details">
        <h5>
          {resourceDetails.title}
          {resourceDetails.resourceObject?.favorite ? ' ♡' : ''}
        </h5>
        <p>{resourceDetails.description || ''}</p>
        <hr />
      </div>
    </div>
  );
}
