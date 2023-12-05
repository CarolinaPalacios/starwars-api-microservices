import catchedAsync from '../utils/catchedAsync'
import getDocumentList from './getDocumentList'
import getDocumentById from './getDocumentById'
import insertDocument from './insertDocument'
import updateDocument from './updateDocument'
import softDocumentDelete from './softDocumentDelete'
import deleteDocument from './deleteDocument'

export default {
  getDocumentList: catchedAsync(getDocumentList),
  getDocumentById: catchedAsync(getDocumentById),
  insertDocument: catchedAsync(insertDocument),
  updateDocument: catchedAsync(updateDocument),
  softDocumentDelete: catchedAsync(softDocumentDelete),
  deleteDocument: catchedAsync(deleteDocument),
}
