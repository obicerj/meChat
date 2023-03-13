import { useDispatch } from "react-redux";
import Modal from "../../components/Modal";
import useAddContact from "../../utils/hooks/useAddContact";
import { changeConvo } from "../conversation/convoSlice";

const AddContactModal = ({
  currentUser,
  recipient,
  setShowModal
}) => {
  
  const dispatch = useDispatch();
  const addContact = useAddContact();

  const addContactHandler = async () => {
    try {
      if(!currentUser || !recipient) return;

      await addContact(currentUser, recipient);

      setShowModal(false);

      dispatch(changeConvo({ recipient }));
    } catch (err) {
      throw err.message;
    }
  };
  
  const handleClose = () => {
    setShowModal(false);
  };

  const modalAction = (
    <div className="flex gap-2">
      <button 
        className="bg-red-600 text-white py-1 px-4 rounded"
        onClick={handleClose}>Cancel</button>
      <button 
        className="bg-blue-700 text-white py-1 px-4 rounded"
        onClick={addContactHandler}>Add</button>
    </div>
  );


  return (
      <Modal 
        onClose={handleClose}
        actionBar={modalAction}
      >
      <p className="text-lg">Start conversation with <span className="font-semibold">{recipient.displayName}</span>?</p>  
      </Modal>
  );
};

export default AddContactModal;
