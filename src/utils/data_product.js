const getData = () => {
  return [
    {
      product_id: 1,
      product_name: "Americano",
      product_description: "A light and refreshing black coffee experience.",      
      product_price: 15000,
      product_thumbnail: "./images/coffee.jpg",
      createdAt: "2025-06-14T04:27:34.572Z",
      archived: false,
    },
    {
      product_id: 2,
      product_name: "Cappuccino",
      product_description: "A smooth blend of coffee and frothed milk.",
      product_price: 15000,
      product_thumbnail: "./images/coffee.jpg",
      createdAt: "2025-06-14T04:27:34.572Z",
      archived: false,
    },
    {
      product_id: 3,
      product_name: "Espresso",
      product_description: "A strong and bold coffee to kickstart your day.",
      product_price: 15000,
      product_thumbnail: "./images/coffee.jpg",
      createdAt: "2025-06-14T04:27:34.572Z",
      archived: false,
    },
    {
      product_id: 4,
      product_name: "Iced Coffee",
      product_description: "A sweet mix of coffee and ice in one cup of coffee.",      
      product_price: 15000,
      product_thumbnail: "./images/coffee.jpg",
      createdAt: "2025-06-14T04:27:34.572Z",
      archived: false,
    },
    {
      product_id: 5,
      product_name: "Latte",
      product_description: "A creamy coffee perfect for relaxing moments.",
      product_price: 15000,
      product_thumbnail: "./images/coffee.jpg",
      createdAt: "2025-06-14T04:27:34.572Z",
      archived: false,
    },
    {
      product_id: 6,
      product_name: "Macchiato",
      product_description:
        "A delightful coffee with a hint of rich caramel flavor.",
      product_price: 15000,
      product_thumbnail: "./images/coffee.jpg",
      createdAt: "2025-06-14T04:27:34.572Z",
      archived: false,
    },
    {
      product_id: 7,
      product_name: "Matcha Latte",
      product_description: "A calming blend of matcha green tea and milk.",
      product_price: 15000,
      product_thumbnail: "./images/coffee.jpg",
      createdAt: "2025-06-14T04:27:34.572Z",
      archived: false,
    },
    {
      product_id: 8,
      product_name: "Mocha Latte",
      product_description:
        "A soft latte infused with the nutty aroma of mocha.",
      product_price: 15000,
      product_thumbnail: "./images/coffee.jpg",
      createdAt: "2025-06-14T04:27:34.572Z",
      archived: false,
    },
  ];
};

const showFormattedDate = (createdAt) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(createdAt).toLocaleDateString("en-US", options);
};

export { getData, showFormattedDate };
