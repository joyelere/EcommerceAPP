import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import "./widgetLg.css";
import TimeAgo from "react-timeago";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  const { data } = useFetch("/orders");
  const users = useSelector((state) => state.client.users);

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const user = users?.find((user) => user._id === item.userId);
            return (
              <tr className="widgetLgTr" key={item._id}>
                <td className="widgetLgUser">
                  <span className="widgetLgName">{user?.full_name}</span>
                </td>
                <td className="widgetLgDate">
                  <TimeAgo date={item.createdAt} />
                </td>
                <td className="widgetLgAmount">${item.amount}</td>
                <td className="widgetLgStatus">
                  <Button type={item.status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
