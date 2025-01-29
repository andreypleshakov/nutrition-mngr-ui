import { useEffect, useState } from "react";
import "./App.css";
// import { NameBar } from "./components/name-bar/name-bar";
import { NavigationBar } from "./components/navigation-bar/navigation-bar";
import { TotalStatistic } from "./components/total-statistic/total-statistic";
import {
  BasicNutrients,
  DailyFood,
  getStatAndGoal,
} from "./api/getStatAndGoal";
import { getProducts, Products } from "./api/getProducts";
import { ConsumedProduct } from "./components/consumed-product/consumed-product";
import { tgIdContext } from "./context";

export function convertDateToTime(date: string): string {
  const convertedDate = new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return convertedDate;
}

export const App = () => {
  const tg = window.Telegram.WebApp;
  const tgId = 380114112;

  const [dailyStat, setdailyStat] = useState<DailyFood | null>(null);
  const [goal, setGoal] = useState<BasicNutrients | null>(null);
  const [date, setDate] = useState<string>();
  const [consumedList, setConsumedList] = useState<DailyFood[]>();
  const [barHeight, setBarHeight] = useState<BasicNutrients | null>(null);
  const [productsList, setProductsList] = useState<Products[]>();

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    tg.ready();

    const fetchData = async () => {
      const { statistic, goal, barPercentage } = await getStatAndGoal(tgId);
      const listOfProducts = await getProducts(tgId);
      setdailyStat(statistic.totals);
      setDate(statistic.totals.dateOfConsumption);
      setConsumedList(statistic.arrayOfProducts);
      setGoal(goal);
      setBarHeight(barPercentage);
      setProductsList(listOfProducts);
    };

    fetchData();
  }, [tg]);

  async function deleteDailyStatProduct(tgId: number, id: string) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url = `http://localhost:3001/statistic/${tgId}/${id}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error deleting daily statistic:", error);
      throw error;
    }
  }

  const handleRemoveFromConsumedList = (index: number) => {
    const newConsumedList = consumedList!.filter((_, i) => i !== index);
    setConsumedList(newConsumedList);

    const documentToDelete = consumedList!.find((_, i) => i === index);

    deleteDailyStatProduct(tgId, documentToDelete!.id!).catch((err) =>
      alert(`Error: ${err.message}`)
    );
  };

  const handlerOpenModal = () => {
    if (!openModal) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  };

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
    : "No date available";

  return (
    <div className="App">
      {/* <NameBar /> */}
      <NavigationBar date={formattedDate} />

      <tgIdContext.Provider value={tgId}>
        {dailyStat && goal && barHeight && (
          <TotalStatistic
            dailyStat={dailyStat}
            goal={goal}
            barPercentage={barHeight}
            onClick={handlerOpenModal}
            modalStatus={openModal}
            productsList={productsList!}
          />
        )}
      </tgIdContext.Provider>

      {consumedList &&
        consumedList.map((product, index) => (
          <ConsumedProduct
            key={index}
            {...product}
            deletionStatus={() => handleRemoveFromConsumedList(index)}
          />
        ))}
    </div>
  );
};
