const createCombinedID = (currentUserID, recipientID) => {
  return currentUserID > recipientID
  ? currentUserID + recipientID
  : recipientID + currentUserID;
};

export default createCombinedID;