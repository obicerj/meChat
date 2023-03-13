import { useEffect } from "react";
import ReactDOM from "react-dom";

function Modal({ onClose, children, actionBar }) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    }
  }, []);

  return ReactDOM.createPortal(
    <div className="flex justify-center items-center h-screen">
      <div onClick={onClose} className="fixed inset-0 bg-gray-800/80 z-20"></div>
      <div className="fixed inset-400 bg-slate-300 rounded-2xl px-8 py-4 z-20">
        <div className="flex flex-col justify-between h-full">
          {children}
        </div>
        <div className="flex justify-end mt-6 mb-3">
          {actionBar}
        </div>
      </div>
    </div>,
    document.querySelector('.modal-container')
  );
}

export default Modal;