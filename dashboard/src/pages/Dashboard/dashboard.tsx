import Cards from "../../components/cards";
import Donations from "../Donations/donations";
import AddDonationForm from "../../components/donationForm";
function Dashboard() {
  return (
    <>
      <Cards></Cards>
      <AddDonationForm></AddDonationForm>
      <div className="h-screen">
        <Donations></Donations>;
      </div>
    </>
  );
}

export default Dashboard;
