import { async } from "@firebase/util";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../../components/Modal";

const ProfileEdit = ({
  setShowModal,
  currentUser,
}) => {
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [bio, setBio] = useState(currentUser.bio);
  const [location, setLocation] = useState(currentUser.location);

  const dispatch = useDispatch();

  const handleChangeInfo = async (e) => {
    try {
      e.preventDefault();
    } catch (err) {
      console.log(err.message)
    }
  }

  const modalAction = (
    <div className="contents">
      <button
      className="w-full bg-blue-700 text-white py-1 px-4 rounded"
      >Save</button>
    </div>
  )

  const handleClose = () => {
    setShowModal(false);
  }
  return (
    <Modal onClose={handleClose} actionBar={modalAction}>
      <form className="flex flex-col gap-3.5 mt-2">
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold">Name</label>
          <input
            type="text"
            className="rounded px-2 py-1.5 outline-none"
            label="Display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-semibold">Location</label>
          <input
            type="text"
            className="rounded px-2 py-1.5 outline-none"
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-semibold">Bio</label>
          <textarea
            type="text"
            className="rounded px-2 py-1.5 outline-none"
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ProfileEdit;
