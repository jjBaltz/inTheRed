/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleEntry } from '../../api/entriesData';

function ViewEntry() {
  const [entryDetails, setEntryDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleEntry(firebaseKey).then(setEntryDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-4 d-flex flex-wrap">
      <div className="ms-4 details">
        <h3 className="title-text">
          {entryDetails.title}
          {entryDetails.entryObject?.favorite ? ' ☆' : ''}
        </h3>
        <div className="ms-4 input-values">
          <p className="display-f">{entryDetails.food}</p>
          <p className="display-w">{entryDetails.water}</p>
          <p className="display-e">{entryDetails.energy}</p>
          <p className="display-m">{entryDetails.mood}</p>
          <p className="display-s">{entryDetails.social}</p>
        </div>
        <hr />
        <p className="display-text">{entryDetails.description}</p>
      </div>
    </div>
  );
}

export default ViewEntry;
