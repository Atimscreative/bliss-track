import { useEffect } from "react";
import { useNavigate } from "react-router";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the dashboard
    navigate("/");
  }, [navigate]);

  // This will not be shown as we redirect
  return null;
};

export default Index;
