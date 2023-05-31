import React from 'react';
import Link from 'next/link';
import { Button, Image } from 'react-bootstrap';

function Folders() {
  return (
    <>
      <Link href="/entry/newEntry" passHref>
        <Button variant="primary">New Entry</Button>
      </Link>
      <Link href="/entries" passHref>
        <Image
          src="../assets/FolderIcon.png"
          width={100}
          height={100}
        />
      </Link>
      Submitted
      <Link href="/drafts" passHref>
        <Image
          src="../assets/FolderIcon.png"
          width={100}
          height={100}
        />
      </Link>
      Drafts
    </>
  );
}

export default Folders;
