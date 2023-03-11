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

  const modalAction = (
    <>
      <button onClick={addContactHandler}>Add user</button>
    </>
  )

  return (
      <Modal 
        actionBar={modalAction}
      >
      <p>Test Modal</p>  
      </Modal>
  );
};

export default AddContactModal;
