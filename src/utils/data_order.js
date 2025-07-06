const getData = () => {
  return [
    {
      id: 1,
      customer_name: "Mahalini",
      createdAt: "2025-05-15T04:27:34.572Z",
      products: [
        {
          product_id: 3,
          product_name: "Espresso",
          product_price: 15000,
          quantity: 1,
          product_thumbnail: './images/coffee.jpg',
        },
        {
          product_id: 2,
          product_name: "Cappucino",
          product_price: 15000,
          quantity: 2,
          product_thumbnail: './images/coffee.jpg',
        },
        
      ]
    },
    {
      id: 2,
      customer_name: "Lyodra",
      createdAt: "2025-06-14T04:27:34.572Z",
      products: [
        {
          product_id: 5,
          product_name: "Latte",
          product_price: 15000,
          quantity: 1,
          product_thumbnail: './images/coffee.jpg',
        },
        {
          product_id: 3,
          product_name: "Espresso",
          product_price: 15000,
          quantity: 1,
          product_thumbnail: './images/coffee.jpg',
        },
        
      ]
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
