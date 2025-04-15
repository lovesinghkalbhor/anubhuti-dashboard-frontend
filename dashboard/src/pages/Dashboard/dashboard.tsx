import Cards from "../../components/cards";
import AddDonationForm from "../../components/donationForm";
import AddDonationFormKinds from "../../components/donationFormKinds";
import { useState } from "react";
function Dashboard() {
  const [isdonationTypeMoney, setisDonationTypeMoney] = useState(true);
  // const [isdonationListTypeMoney, setisDonationListTypeMoney] = useState(true);
  return (
    <>
      <Cards></Cards>
      <div className="mt-20  ">
        <div className="flex  space-x-16 px-6">
          <button
            className={`${
              isdonationTypeMoney ? " text-blue-600" : "text-black"
            }   font-normal`}
            onClick={() => setisDonationTypeMoney(true)}
          >
            {" "}
            Donation in money
          </button>
          <button
            className={`${
              isdonationTypeMoney ? "  text-black" : "text-blue-600"
            }   font-normal`}
            onClick={() => setisDonationTypeMoney(false)}
          >
            {" "}
            Donation in kinds
          </button>{" "}
        </div>
        <hr className=" border-slate-400 mt-2"></hr>
      </div>
      {isdonationTypeMoney ? (
        <AddDonationForm></AddDonationForm>
      ) : (
        <AddDonationFormKinds></AddDonationFormKinds>
      )}
    </>
  );
}

export default Dashboard;
