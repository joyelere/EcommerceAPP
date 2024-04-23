import { useEffect, useMemo, useState } from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [revenuesPerc, setRevenuesPerc] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [ordersPerc, setOrdersPerc] = useState(0);

  const MONTHS = useMemo(
    () => [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest("/orders/income");
        const data = res.data;

        // Calculate total sales
        const total = data.reduce((acc, curr) => acc + curr.total, 0);
        setTotalSales(total);

        // Calculate total orders
        const orders = data.reduce((acc, curr) => acc + curr.totalOrders, 0);
        setTotalOrders(orders);

        // Calculate percentage difference between current and previous month orders
        if (data.length >= 2) {
          const previousMonthRevenues = data[0].total;
          const currentMonthRevenues = data[1].total;
          setRevenuesPerc(
            ((currentMonthRevenues - previousMonthRevenues) /
              previousMonthRevenues) *
              100
          );

          const previousMonthOrders = data[0].totalOrders;
          const currentMonthOrders = data[1].totalOrders;
          setOrdersPerc(
            ((currentMonthOrders - previousMonthOrders) / previousMonthOrders) *
              100
          );
        }

        setIncome(data);
      } catch (error) {
        console.error("Error fetching income data:", error);
      }
    };
    getIncome();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(revenuesPerc)}
            {revenuesPerc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon " />
            )}
          </span>
        </div>
        <span className="featuredSub">
          Compared to {MONTHS[income[0]?._id - 1]}
        </span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${totalSales}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(revenuesPerc)}
            {revenuesPerc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon " />
            )}
          </span>
        </div>
        <span className="featuredSub">
          Compared to {MONTHS[income[0]?._id - 1]}
        </span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Orders</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{totalOrders}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(ordersPerc)}
            {ordersPerc > 0 ? (
              <ArrowUpward className="featuredIcon" />
            ) : (
              <ArrowDownward className="featuredIcon negative" />
            )}
          </span>
        </div>
        <span className="featuredSub">
          Compared to {MONTHS[income[0]?._id - 1]}
        </span>
      </div>
    </div>
  );
}
