import Donations from "../Donations/donations";
import { useState } from "react";
import DonationsKind from "../Donations/donationsKind";
function DonationList() {
  const [isdonationListTypeMoney, setisDonationListTypeMoney] = useState(true);
  return (
    <>
      <div className="h-screen">
        <div className="mt-20  ">
          <div className="flex  space-x-16 px-6">
            <button
              className={`${
                isdonationListTypeMoney ? " text-blue-600" : "text-black"
              }   font-normal`}
              onClick={() => setisDonationListTypeMoney(true)}
            >
              {" "}
              Donation in money
            </button>
            <button
              className={`${
                isdonationListTypeMoney ? "  text-black" : "text-blue-600"
              }   font-normal`}
              onClick={() => setisDonationListTypeMoney(false)}
            >
              {" "}
              Donation in kinds
            </button>{" "}
          </div>
          <hr className=" border-slate-400 mt-2"></hr>
        </div>
        {/* <Donations></Donations>; */}
        {isdonationListTypeMoney ? (
          <Donations></Donations>
        ) : (
          <DonationsKind></DonationsKind>
        )}
      </div>
    </>
  );
}

export default DonationList;
