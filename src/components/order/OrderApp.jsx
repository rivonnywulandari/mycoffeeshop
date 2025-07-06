import React from "react";
import OrderList from "./OrderList";
import OrderInput from "./OrderInput";
import { getData as getDummyOrders } from "../../utils/data_order";

class OrderApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      orderBeingEdited: null,
      searchQuery: "",
    };

    this.loadOrders = this.loadOrders.bind(this);
    this.handleNewOrder = this.handleNewOrder.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  componentDidMount() {
    sessionStorage.removeItem("cart");
    this.initializeOrders();
  }

  initializeOrders() {
    const existingOrders = JSON.parse(sessionStorage.getItem("orders")) || [];

    if (existingOrders.length === 0) {
      const dummyOrders = getDummyOrders();
      sessionStorage.setItem("orders", JSON.stringify(dummyOrders));
    }

    this.loadOrders();
  }

  loadOrders() {
    const sessionOrders = JSON.parse(sessionStorage.getItem("orders")) || [];
    this.setState({ orders: sessionOrders });
  }

  handleNewOrder() {
    this.setState({ orderBeingEdited: null }, this.loadOrders);
  }

  handleDelete(id) {
    const updatedOrders = this.state.orders.filter((order) => order.id !== id);
    sessionStorage.setItem("orders", JSON.stringify(updatedOrders));
    this.setState({ orders: updatedOrders });
  }

  handleEdit(id) {
    const orders = JSON.parse(sessionStorage.getItem("orders")) || [];
    const selectedOrder = orders.find((order) => order.id === id);
    if (selectedOrder) {
      this.setState({ orderBeingEdited: selectedOrder });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  onSearchHandler(event) {
    this.setState({ searchQuery: event.target.value });
  }

  render() {
    const { orders, orderBeingEdited, searchQuery } = this.state;

    const filteredOrders = orders.filter((order) =>
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeOrders = filteredOrders.filter((order) => !order.updated);
    const year = new Date().getFullYear();

    return (
      <div id="root">
        <div className="order-app-header">
          <img src="images/logo.jpg" alt="logo" />
          <h2>MyCoffeeShop</h2>

          <div className="order-search">
            <input
              type="text"
              placeholder="Search orders..."
              value={this.state.searchQuery}
              onChange={this.onSearchHandler}
            />
          </div>
        </div>

        <div className="order-app-body">
          <OrderInput
            onOrderPlaced={this.handleNewOrder}
            initialData={orderBeingEdited}
          />

          <h2>Order List</h2>
          <OrderList
            orders={activeOrders}
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
          />
        </div>
        <footer>
          <p className="footer">&copy; {year} Rivonny</p>
        </footer>
      </div>
    );
  }
}

export default OrderApp;
