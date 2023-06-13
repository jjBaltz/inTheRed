import React from 'react';
import Link from 'next/link';
import { Button, Image } from 'react-bootstrap';

function Folders() {
  return (
    <div className="foldersPage">
      <div className="firstButton">
        <Link href="/entry/newEntry" passHref>
          <Button id="folder-newEntry">New Entry</Button>
        </Link>
      </div>
      <div className="folders">
        <div className="submitted">
          <Link href="/entries" passHref>
            <Image
              src="../assets/FolderIcon.png"
              width={100}
              height={100}
            />
          </Link>
          <p>Submitted</p>
        </div>
        <div className="drafts">
          <Link href="/drafts" passHref>
            <Image
              src="../assets/FolderIcon.png"
              width={100}
              height={100}
            />
          </Link>
          <p>Drafts</p>
        </div>
      </div>
    </div>
  );
}

export default Folders;
