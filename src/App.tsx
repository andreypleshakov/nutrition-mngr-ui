import { useEffect, useState } from "react";
import "./App.css";
// import { NameBar } from "./components/name-bar/name-bar";
import { NavigationBar } from "./components/navigation-bar/navigation-bar";
import { TotalStatistic } from "./components/total-statistic/total-statistic";
import { DailyFood } from "./api/getStatAndGoal";
import { getProducts } from "./api/getProducts";
import { ConsumedProduct } from "./components/consumed-product/consumed-product";
import { tgIdContext } from "./context/tg-context";
import { useStatAndGoal } from "./hooks/useStatAndGoal";
import { useQuery } from "@tanstack/react-query";
import { deleteDailyStatProduct } from "./api/deleteDailyStatProduct";

export const App = () => {
  const tg = window.Telegram.WebApp;
  const tgId = 380114112;

  const [consumedList, setConsumedList] = useState<DailyFood[]>();
  const [openModal, setOpenModal] = useState(false);

  const { data } = useStatAndGoal(tgId);

  const query = useQuery({
    queryKey: ["productsList", tgId],
    queryFn: () => getProducts(tgId),
  });

  useEffect(() => {
    tg.ready();
  }, [tg]);

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

  const date = data?.statistic.totals.dateOfConsumption;

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
        {data && query.data && (
          <TotalStatistic
            dailyStat={data.statistic.totals}
            goal={data.goal}
            barPercentage={data.barPercentage}
            onClick={handlerOpenModal}
            modalStatus={openModal}
            productsList={query.data}
          />
        )}
      </tgIdContext.Provider>

      {data && (
        <div className="test-cons-prod">
          {data.statistic.arrayOfProducts &&
            data.statistic.arrayOfProducts.map((product, index) => (
              <ConsumedProduct
                key={index}
                {...product}
                deletionStatus={() => handleRemoveFromConsumedList(index)}
              />
            ))}
        </div>
      )}
    </div>
  );
};
