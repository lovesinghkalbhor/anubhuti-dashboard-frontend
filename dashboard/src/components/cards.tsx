import { useState } from "react";
import AddDonationForm from "./donationForm";
import { useSelector } from "react-redux";
import { RootState } from "../reduxState/store";

function Cards() {
  const user = useSelector((state: RootState) => state.user);

  const [showForm, setshowForm] = useState(false);
  return (
    <>
      <div className="grid grid-cols-12 lg:h-56 h-fit gap-5">
        <div className="lg:col-span-7 col-span-12 rounded-3xl shadow-mainShadow bg-primaryColor text-white p-8">
          <h3 className="font-semibold text-2xl mb-5">
            Welcome to Anubhuti {user.name}
          </h3>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            iusto perferendis, corrupti vel suscipit fugit iure! Sit facere
            repellendus, at sed qui fugiat porro facilis. Facere quaerat eius
            obcaecati adipisci?
          </p>
        </div>
        <div className="lg:col-span-5 col-span-12 rounded-3xl shadow-mainShadow bg-white p-8">
          <div className="flex h-full">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h3 className="font-medium text-lg opacity-80">
                  Total Donation
                </h3>
                <h2 className="font-medium text-[2rem] text-blue-500">
                  <span>&#8377;</span> 532.34
                </h2>
              </div>
              <button
                className="normal-button-bg-secondary"
                onClick={() => setshowForm(true)}
              >
                New Donation
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
