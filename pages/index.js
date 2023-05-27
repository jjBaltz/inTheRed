/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getSubmittedEntries } from '../api/entriesData';
import User from '../components/User';
import EntryCard from '../components/EntryCard';
// import SkillChart from '../components/SkillChart';

function Home() {
  const [entries, setEntries] = useState([]);
  const { user } = useAuth();

  const getLatest = () => {
    getSubmittedEntries(user.uid).then(setEntries).slice(-4);
  };

  useEffect(() => {
    getLatest();
  }, []);

  return (
    <>
      <User userObj={user} />
      <Link href="/entries/newEntry" passHref>
        <Button variant="primary">New Entry</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {entries.map((entry) => (
          <EntryCard key={entry.firebaseKey} entryObj={entry} onUpdate={getLatest} />
        ))}
      </div>
      {/* <SkillChart /> */}
    </>
  );
}

export default Home;
