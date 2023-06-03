/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getDraftedEntries } from '../api/entriesData';
import DraftCard from '../components/DraftCard';

export default function Drafts() {
  const { user } = useAuth();
  const [drafts, setDrafts] = useState([]);

  const getDrafts = () => {
    getDraftedEntries(user.uid).then(setDrafts);
  };

  useEffect(() => {
    getDrafts();
  }, []);

  return (
    <div className="container">
      <div className="flex-start my-4">
        <Link href="/entry/newEntry" passHref>
          <Button variant="primary">Add New Entry</Button>
        </Link>
        <div className="text-center my-4 d-flex flex-wrap">
          {drafts.map((draft) => (
            <DraftCard key={draft.firebaseKey} draftObj={draft} onUpdate={getDrafts} />
          ))}
        </div>
      </div>
    </div>
  );
}
