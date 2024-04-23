import { useDispatch, useSelector } from "react-redux";
import "./transactionList.css";
import { DataGrid } from "@material-ui/data-grid";
import { getUsers, getOrders, deleteOrder } from "../../redux/apiCalls";
import { useEffect } from "react";
import TimeAgo from "react-timeago";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function TransactionList() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const users = useSelector((state) => state.client.users);

  useEffect(() => {
    getUsers(dispatch);
    getOrders(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteOrder(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "userId",
      headerName: "Full Name",
      width: 250,
      renderCell: (params) => {
        const user = users.find((user) => user._id === params.row.userId);
        return <div className="productListItem">{user.full_name}</div>;
      },
    },

    {
      field: "createdAt",
      headerName: "Date",
      width: 160,
      renderCell: (params) => <TimeAgo date={params.row.createdAt} />,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 160,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/transaction/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        pageSize={13}
        getRowId={(row) => row._id}
        checkboxSelection
        rowsPerPageOptions={[13, 26, 39]}
      />
    </div>
  );
}
