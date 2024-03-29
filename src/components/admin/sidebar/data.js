export const Data = {
  menus: [
    {
      header: true,
      name: "Dashboard",
    },
    {
      dropdown: false,
      name: "Dashboard",
      icon: "fas fa-fire",
      url: "/",
    },
    {
      header: true,
      name: "Catalogs",
    },
    {
      dropdown: true,

      name: "Products",
      icon: "fas fa-columns",
      children: [
        {
          name: "Products",
          url: "/products",
        },
      ],
    },
    {
      dropdown: true,
      name: "Subcategories",
      icon: "fas fa-th-large",
      children: [
        {
          name: "Sub categories",
          url: "/subCategories",
        },
      ],
    },
    {
      dropdown: true,
      name: "Categories",
      icon: "fas fa-th",
      children: [
        {
          name: "Categories",
          url: "/categories",
        },
      ],
    },

    {
      header: true,
      name: "Order Requests",
    },
    {
      dropdown: true,
      name: "Orders",
      icon: "fas fa-th-large",
      children: [
        {
          name: "Check for Orders",
          url: "/myorders",
        },
      ],
    },
    {
      header: true,
      name: "Others",
    },
    {
      dropdown: true,
      name: "Home Screen Items",
      icon: "fas fa-th",
      children: [
        //     // {
        //     //   name: "Banners",
        //     //   url: "/banner",
        //     // },
        //     // {
        //     //   name: "Trending Items",
        //     //   url: "/trendingItems",
        //     // },
        {
          name: "Static Elements",
          url: "/staticelements",
        },
        //     // {
        //     //   name: "Other Home Screen Items",
        //     //   url: "/homescreenitems",
        //     // },
        {
          name: "All Home Screen Items",
          url: "/allhomescreenitems",
        },
      ],
    },
    {
      header: true,
      name: "Analytics",
    },
    {
      dropdown: true,
      name: "Reports",
      icon: "fa fa-book fa-fw",
      children: [
        {
          name: "Weekly Report",
          url: "/weeklyreports",
        },
        {
          name: "Monthly Report",
          url: "/monthlyreports",
        },
        {
          name: "Custom Report",
          url: "/customreports",
        },
      ],
    },
    {
      header: true,
      name: "Others",
    },
    {
      dropdown: false,
      name: "Ship Rocket",
      icon: "fas fa-fire",
      url: "/shipment",
    },
  ],
};
