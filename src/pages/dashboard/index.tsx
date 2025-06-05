import { useEffect, useState } from "react";
import { DailyFood } from "../../api/getStatAndGoal";
import { useStatAndGoal } from "../../hooks/useStatAndGoal";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/getProducts";
import { deleteDailyStatProduct } from "../../api/deleteDailyStatProduct";
import { NavigationBar } from "../../components/navigation-bar/navigation-bar";
import { tgIdContext } from "../../context/tg-context";
import { TotalStatistic } from "../../components/total-statistic/total-statistic";
import { ConsumedProduct } from "../../components/consumed-product/consumed-product";
import "./dash.css"

const Dashboard = () => {
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
    <div className="main-dash">
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
        <>
          {data.statistic.arrayOfProducts &&
            data.statistic.arrayOfProducts.map((product, index) => (
              <ConsumedProduct
                key={index}
                {...product}
                deletionStatus={() => handleRemoveFromConsumedList(index)}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
