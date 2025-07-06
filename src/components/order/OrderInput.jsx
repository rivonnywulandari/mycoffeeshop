import React from "react";
import { getData as getProductList } from "../../utils/data_product";

class OrderInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customer_name: "",
      quantityMap: {},
      editOrder: null,
    };

    this.products = getProductList();

    this.handleCustomerNameChange = this.handleCustomerNameChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
    this.handleEditOrder = this.handleEditOrder.bind(this);
  }

  handleCustomerNameChange = (e) => {
    this.setState({ customer_name: e.target.value });
  };

  handleQuantityChange(e, productId) {
    const value = parseInt(e.target.value) || 0;
    this.setState((prevState) => ({
      quantityMap: {
        ...prevState.quantityMap,
        [productId]: value,
      },
    }));
  }

  handleAddToCart = (product) => {
    const { customer_name } = this.state;
    if (!customer_name.trim()) {
      alert("Please enter customer name.");
      return;
    }

    const quantity = this.state.quantityMap[product.product_id] || 1;

    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex(
      (p) => p.product_id === product.product_id
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        product_id: product.product_id,
        product_name: product.product_name,
        product_price: product.product_price,
        quantity,
        product_thumbnail: product.product_thumbnail,
      });
    }

    // if (existingIndex !== -1) {
    //   const existingQty = cart[existingIndex].quantity || 0;
    //   cart[existingIndex].quantity = existingQty + quantity;
    // } else {
    //   cart.push({
    //     product_id: product.product_id,
    //     product_name: product.product_name,
    //     product_price: product.product_price,
    //     quantity,
    //     product_thumbnail: product.product_thumbnail,
    //   });
    // }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ quantityMap: {} });
  };

  handlePlaceOrder = () => {
    const { customer_name, editOrder } = this.state;
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    if (!customer_name.trim()) {
      alert("Please enter customer name.");
      return;
    }

    if (cart.length === 0) {
      alert("Order cart is empty.");
      return;
    }

    let orders = JSON.parse(sessionStorage.getItem("orders")) || [];

    if (editOrder) {
      orders = orders.map((o) =>
        o.id === editOrder.id
          ? {
              ...o,
              customer_name,
              products: cart,
              edited: true,
            }
          : o
      );
    } else {
      const newOrder = {
        id: +new Date(),
        customer_name,
        createdAt: new Date().toISOString(),
        edited: false,
        products: cart,
      };
      orders.push(newOrder);
    }

    sessionStorage.setItem("orders", JSON.stringify(orders));
    sessionStorage.removeItem("cart");

    this.setState({
      customer_name: "",
      quantityMap: {},
      editOrder: null,
    });

    alert(editOrder ? "Okay, order updated!" : "Thank you, order placed!");

    if (this.props.onOrderPlaced) {
      this.props.onOrderPlaced();
    }
  };

  handleEditOrder = (order) => {
    sessionStorage.setItem("cart", JSON.stringify(order.products));
    this.setState({
      customer_name: order.customer_name,
      editOrder: order,
    });
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.initialData &&
      this.props.initialData !== prevProps.initialData
    ) {
      const { customer_name, products } = this.props.initialData;
      const quantityMap = {};

      this.setState({
        customer_name,
        quantityMap,
        editOrder: this.props.initialData,
      });

      sessionStorage.setItem("cart", JSON.stringify(products));
    }
  }

  render() {
    const { customer_name, quantityMap } = this.state;

    return (
      <div className="order-input">
        <div className="menu-input">
          <div className="menu-grid">
            {this.products.map((product) => (
              <div key={product.product_id} className="menu-product-card">
                <div className="menu-product-card-body">
                  <div className="menu-product-card-body-div">
                    <img
                      src={product.product_thumbnail}
                      alt={product.product_name}
                      className="menu-product-thumbnail"
                    />
                  </div>
                  <div className="menu-product-description">
                    <h4>{product.product_name}</h4>
                    <p className="menu-product-description-description">
                      {product.product_description}
                    </p>
                    <p className="menu-product-description-price">
                      Rp{product.product_price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="menu-product-quantity">
                  <input
                    type="number"
                    name={`quantity-${product.product_id}`}
                    min="1"
                    placeholder="Quantity"
                    value={this.state.quantityMap[product.product_id] || ""}
                    onChange={(e) =>
                      this.handleQuantityChange(e, product.product_id)
                    }
                    className="menu-product-quantity-input"
                  />

                  <button
                    className="menu-product-quantity-add-button"
                    onClick={() => this.handleAddToCart(product)}
                  >
                    {" "}
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="customer-input">
          <h3>Customer Name</h3>
          <input
            type="text"
            placeholder="Customer Name"
            value={this.state.customer_name}
            onChange={this.handleCustomerNameChange}
            className="customer-input-name"
          />

          <h4>Order Cart</h4>
          {this.renderCart()}

          <button className="save-order-button" onClick={this.handlePlaceOrder}>
            Save Order
          </button>
        </div>
      </div>
    );
  }

  renderCart() {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    if (cart.length === 0) return <p>No items added.</p>;

    const totalPrice = cart.reduce(
      (sum, item) => sum + item.product_price * item.quantity,
      0
    );

    return (
      <div>
        {cart.map((item) => (
          <div key={item.product_id} className="customer-cart">
            <img src={item.product_thumbnail} alt={item.product_name} />

            <div className="customer-cart-description">
              <h4>{item.product_name}</h4>
              <p>Price: Rp{item.product_price.toLocaleString()}</p>
              <p>
                Subtotal: Rp
                {(item.product_price * item.quantity).toLocaleString()}
              </p>

              <div className="customer-cart-quantity">
                <button
                  className="increment-cart-button"
                  onClick={() => {
                    const newQty = item.quantity > 1 ? item.quantity - 1 : 1;
                    const newCart = cart.map((c) =>
                      c.product_id === item.product_id
                        ? { ...c, quantity: newQty }
                        : c
                    );
                    sessionStorage.setItem("cart", JSON.stringify(newCart));
                    this.forceUpdate();
                  }}
                >
                  −
                </button>

                <p>{item.quantity}</p>

                <button
                  className="decrement-cart-button"
                  onClick={() => {
                    const newQty = item.quantity + 1;
                    const newCart = cart.map((c) =>
                      c.product_id === item.product_id
                        ? { ...c, quantity: newQty }
                        : c
                    );
                    sessionStorage.setItem("cart", JSON.stringify(newCart));
                    this.forceUpdate();
                  }}
                >
                  +
                </button>

                <button
                  className="delete-cart-button"
                  onClick={() => {
                    const newCart = cart.filter(
                      (c) => c.product_id !== item.product_id
                    );
                    sessionStorage.setItem("cart", JSON.stringify(newCart));
                    this.forceUpdate();
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}

        <h4 className="customer-cart-grand-total">
          Grand Total: Rp{totalPrice.toLocaleString()}
        </h4>
      </div>
    );
  }
}

export default OrderInput;
