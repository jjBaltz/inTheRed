import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleEntry } from '../../../api/entriesData';
import EntryForm from '../../../components/forms/newEntryForm';

export default function EditEntry() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleEntry(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<EntryForm obj={editItem} />);
}
