import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleResource } from '../../../api/resourcesData';
import ResourceForm from '../../../components/forms/newResourceForm';

export default function EditResource() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleResource(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<ResourceForm obj={editItem} />);
}
