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
    getSubmittedEntries(user.uid).then((returnedEntries) => {
      const newest = returnedEntries.slice(-4);
      setEntries(newest);
    });
  };

  useEffect(() => {
    getLatest();
  }, []);

  return (
    <div className="index">
      <User userObj={user} />
      <div className="index-buttons">
        <Link href="/entry/newEntry" passHref>
          <Button className="index-entry">New Entry</Button>
        </Link>
        <Link href="/folders" passHref>
          <Button className="index-folders">Folders</Button>
        </Link>
      </div>
      <div className="d-flex flex-wrap" id="latest">
        {entries.map((entry) => (
          <EntryCard key={entry.firebaseKey} entryObj={entry} onUpdate={getLatest} />
        ))}
      </div>
      {/* <SkillChart /> */}
    </div>
  );
}

export default Home;
