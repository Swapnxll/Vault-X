import React, { useState } from "react";
import AddPasswordForm from "../components/AddPassword.jsx";
import RetrievePasswordForm from "../components/ShowPassword.jsx";

const VaultActions = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showRetrieveForm, setShowRetrieveForm] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto">
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setShowRetrieveForm(false);
          }}
          className="flex-1 bg-[#764b3a] hover:bg-[#5a372a] text-white px-4 py-3 rounded font-article text-lg sm:text-xl"
        >
          Add Password
        </button>
        <button
          onClick={() => {
            setShowRetrieveForm(!showRetrieveForm);
            setShowAddForm(false);
          }}
          className="flex-1 bg-[#764b3a] hover:bg-[#5a372a] text-white px-4 py-3 rounded font-article text-lg sm:text-xl"
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
