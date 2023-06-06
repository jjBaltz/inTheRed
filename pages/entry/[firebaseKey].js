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
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-black ms-5 details">
        <h5>
          {entryDetails.title}
          {/* {entryDetails.entryObject?.favorite ? ' ☆' : ''} */}
        </h5>
        <p className="card-text">{entryDetails.food}</p>
        <p className="card-text">{entryDetails.water}</p>
        <p className="card-text">{entryDetails.energy}</p>
        <p className="card-text">{entryDetails.mood}</p>
        <p className="card-text">{entryDetails.social}</p>
        <p className="card-text">{entryDetails.description}</p>
        <hr />
      </div>
    </div>
  );
}

export default ViewEntry;
