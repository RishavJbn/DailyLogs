import { useEffect } from "react";
import { getAllLogs } from "../api/dailylogapi.js";

const Home = () => {
  useEffect(() => {
    const test = async () => {
      const data = await getAllLogs();
      console.log("LOGS:", data);
    };
    test();
  }, []);

  return <div>Home</div>;
};

export default Home;
