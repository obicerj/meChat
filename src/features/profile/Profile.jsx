import Avatar from "../../components/Avatar";
import { FiMail, FiMapPin } from "react-icons/fi";
import { useSelector } from "react-redux";
import { getUserState } from "../auth/userSlice";

const Profile = () => {
  const {user} = useSelector(getUserState);

  return (
    <div>
      <div className="flex flex-col sticky top-0 bg-slate-900 z-10">
        <div className="flex flex-col justify-between px-2 py-2 mx-2 mt-2">
          <h2 className="text-2xl text-gray-300">Profile</h2>
        </div>
      </div>
      <div className="flex flex-row gap-8 mt-4 mb-6 mx-4">
        <Avatar
          isOnline={false}
          imgURL={"https://picsum.photos/200"}
          size="extra-large"
          className=""
        />
        <div className="text-gray-200">
          <h1 className="text-lg font-semibold mt-2">{user?.displayName}</h1>
          <p className="text-gray-400">{user?.bio}</p>
        </div>
      </div>
      <div className="mx-6">
        <hr className="border-slate-700" />
        <ul className="flex flex-col gap-2 text-gray-200 mt-4">
          <li className="flex flex-row items-center gap-2"><FiMail /><span>{user?.email}</span></li>
          <li className="flex flex-row items-center gap-2"><FiMapPin /><span>{user?.location}</span></li>
        </ul>
        <button className="bg-blue-500 text-white w-full rounded-lg py-2 my-4">
          Edit
        </button>
      </div>
    </div>
  );
};

export default Profile;
