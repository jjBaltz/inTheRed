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
      <div className="folderIcons">
        <Link href="/entries" passHref>
          <Image
            src="../assets/FolderIcon.png"
            width={100}
            height={100}
          />
        </Link>
        <p className="subText">Submitted</p>
        <Link href="/drafts" passHref>
          <Image
            src="../assets/FolderIcon.png"
            width={100}
            height={100}
          />
        </Link>
        <p className="draftText">Drafts</p>
      </div>
    </div>
  );
}

export default Folders;
