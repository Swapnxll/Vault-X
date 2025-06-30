import React, { useState } from "react";
import AddPasswordForm from "../components/AddPassword.jsx";
import RetrievePasswordForm from "../components/ShowPassword.jsx";

const VaultActions = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showRetrieveForm, setShowRetrieveForm] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Action buttons */}
      <div className="flex flex-col lg:flex-row gap-6">
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setShowRetrieveForm(false);
          }}
          className="w-full lg:w-1/2 bg-[#764b3a] hover:bg-[#5a372a] text-white px-4 py-10 rounded font-pixel text-2xl"
        >
          Add Password
        </button>
        <button
          onClick={() => {
            setShowRetrieveForm(!showRetrieveForm);
            setShowAddForm(false);
          }}
          className="w-full lg:w-1/2 bg-[#764b3a] hover:bg-[#5a372a] text-white px-4 py-10 rounded font-pixel text-2xl"
        >
          Show Password
        </button>
      </div>

      {/* Conditionally render forms */}
      {showAddForm && <AddPasswordForm />}
      {showRetrieveForm && <RetrievePasswordForm />}
    </div>
  );
};

export default VaultActions;
