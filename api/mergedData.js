import { getSingleResource } from './resourcesData';
import { getSingleEntry } from './entriesData';

const viewEntryDetails = (entryFirebaseKey) => new Promise((resolve, reject) => {
  getSingleEntry(entryFirebaseKey)
    .then((entryObject) => {
      resolve({ entryObject });
    }).catch((error) => reject(error));
});

const viewResourceDetails = (resourceFirebaseKey) => new Promise((resolve, reject) => {
  getSingleResource(resourceFirebaseKey)
    .then((resourceObject) => {
      resolve({ resourceObject });
    }).catch((error) => reject(error));
});

export { viewEntryDetails, viewResourceDetails };
