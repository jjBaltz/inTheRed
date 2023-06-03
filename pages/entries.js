/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getSubmittedEntries } from '../api/entriesData';
import EntryCard from '../components/EntryCard';

export default function Entries() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState([]);

  const getSubmitted = () => {
    getSubmittedEntries(user.uid).then(setSubmitted);
  };

  useEffect(() => {
    getSubmitted();
  }, []);

  return (
    <div className="container">
      <div className="flex-start my-4">
        <Link href="/entry/newEntry" passHref>
          <Button variant="primary">Add New Entry</Button>
        </Link>
        <div className="text-center my-4 d-flex flex-wrap">
          {submitted.map((submit) => (
            <EntryCard key={submit.firebaseKey} entryObj={submit} onUpdate={getSubmitted} />
          ))}
        </div>
      </div>
    </div>
  );
}
