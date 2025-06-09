import { useNavigate } from "react-router-dom";
import Header from "./common/Header";
import Balance from "./Home/Balance";
import Services from "./Home/Services";
const UserDashboard = () => {
  const navigate = useNavigate();

  const handleServiceClick = (id) => {
    switch(id) {
      case "airtime":
        navigate("/airtime");
        break;
      case "dollar-cards":
        navigate("/atm-cards");
        break;
      case "send-money":
        navigate("/transfer");
        break;
      case "investment":
        navigate("/investments");
        break;
      default:
        console.log(`Service ${id} clicked`);
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header />
      <Balance />
      <Services handleServiceClick={handleServiceClick} />
    </div>
  );
};

export default UserDashboard;
