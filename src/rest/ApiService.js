import {format} from "date-fns";
export const API_SERVER = "http://localhost:9000/";

// export const API_SERVER = "https://api.yotmart.in/";

export const API_KEY = process.env.REACT_APP_API_KEY;
export const BLUEDART_CLIENT_ID = process.env.REACT_APP_BLUEDART_CLIENT_ID;
export const BLUEDART_CLIENT_SECRET =
  process.env.REACT_APP_BLUEDART_CLIENT_SECRET;
export const BLUEDART_TEST = process.env.REACT_APP_BLUEDART_TEST;
export const BLUEDART_PRODCOTION = process.env.REACT_APP_BLUEDART_PRODCOTION;
export const BLUEDART_LOGINID = process.env.REACT_APP_BLUEDART_LOGINID;
export const BLUEDART_LICENCEKEY = process.env.REACT_APP_BLUEDART_LICENCEKEY;
export const BLUEDART_LOGINID_TEST =
  process.env.REACT_APP_BLUEDART_LOGINID_TEST;
export const BLUEDART_LICENCEKEY_TEST =
  process.env.REACT_APP_BLUEDART_LICENCEKEY_TEST;
export const BLUEDART_CUSTOMERID_TEST =
  process.env.REACT_APP_BLUEDART_CUSTOMERID_TEST;
export const BLUEDART_ORIGINAREA_TEST =
  process.env.REACT_APP_BLUEDART_ORIGINAREA_TEST;
console.log(BLUEDART_CUSTOMERID_TEST);
export const getCategories = callBackFunction => {
  console.log(API_KEY, "API");
  const url = `${API_SERVER}categories`;
  fetch(`${API_SERVER}categories/user/${localStorage.getItem("userId")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        //callBackFunction(data);
        //return data;
        console.log("Cate", data);
        return (window.location.href = "/auth/login");
      } else {
        console.log("Cate", data);
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getVariants = (vdata, callBackFunction) => {
  fetch(`${API_SERVER}items/varients/${vdata}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        // callBackFunction(data);
        // return data;
        // console.log("Cate", data);
        return (window.location.href = "/auth/login");
      } else {
        // console.log("Cate", data);
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const deleteVarient = (itemId, varientId, callback) => {
  const body = {
    itemId: itemId,
    varientId: varientId,
  };
  fetch(`${API_SERVER}items/varient/delete/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        // callback(data);
        // return data;
        return (window.location.href = "/auth/login");
      } else {
        // console.log("Cate", data);
        callback(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getSubCategories = callBackFunction => {
  fetch(`${API_SERVER}sub_categories/user/${localStorage.getItem("userId")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        // callBackFunction(data);
        // return data;
        console.log("Cate", data);
        return (window.location.href = "/auth/login");
      } else {
        console.log("Cate", data);
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getWeeklyReports = callBackFunction => {
  var today = new Date();
  var lastdate = new Date(`${today}`);
  lastdate.setDate(lastdate.getDate() - 7);
  var fDate = format(lastdate, "yyyy-MM-dd");
  var sdate = format(today, "yyyy-MM-dd");
  fetch(
    `${API_SERVER}reports/` +
      localStorage.getItem("userId") +
      "?fromDate=" +
      fDate +
      "&toDate=" +
      sdate,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization"),
        //  "API_KEY":API_KEY,
      },
    }
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        // callBackFunction(data);
        // return data;
        return (window.location.href = "/auth/login");
      } else {
        // console.log("Cate", data);
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const getMonthlyReports = callBackFunction => {
  var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  var mdate = new Date(`${date}`);
  mdate.setMonth(mdate.getMonth() - 1);
  var fDate = format(mdate, "yyyy-MM-dd");
  // console.log("date format for monthly", fDate, date);
  fetch(
    `${API_SERVER}reports/` +
      localStorage.getItem("userId") +
      "?fromDate=" +
      fDate +
      "&toDate=" +
      date,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization"),
        //  "API_KEY":API_KEY,
      },
    }
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        // callBackFunction(data);
        // return data;
        return (window.location.href = "/auth/login");
      } else {
        // console.log("Cate", data);
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const getCustomReports = (fromDate, toDate, callBackFunction) => {
  // console.log("api function", fromDate, toDate);
  fetch(
    `${API_SERVER}reports/` +
      localStorage.getItem("userId") +
      "?fromDate=" +
      fromDate +
      "&toDate=" +
      toDate,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization"),
        //  "API_KEY":API_KEY,
      },
    }
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        // callBackFunction(data);
        // return data;
        return (window.location.href = "/auth/login");
      } else {
        // console.log("Cate", data);
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getGraphReports = callBackFunction => {
  fetch(`${API_SERVER}reports/` + localStorage.getItem("userId"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "Authorization":localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        // callBackFunction(data);
        // return data;
        return (window.location.href = "/auth/login");
      } else {
        // console.log("Cate", data);
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getReports = callBackFunction => {
  fetch(`${API_SERVER}reports/` + localStorage.getItem("userId"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "Authorization":localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        // callBackFunction(data);
        // return data;
        return (window.location.href = "/auth/login");
      } else {
        // console.log("Cate", data);
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getItems = callBackFunction => {
  console.log("user", localStorage.getItem("userId"));
  fetch(`${API_SERVER}items/user/${localStorage.getItem("userId")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        // callBackFunction(data);
        // return data;
        console.log(data, "TESTITEM");
        // return (window.location.href = "/auth/login");
      } else {
        // console.log("Cate", data);
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getUsers = callBackFunction => {
  fetch(`${API_SERVER}user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        // callBackFunction(data);
        // return data;
        return (window.location.href = "/auth/login");
      } else {
        // console.log("Cate", data);
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const addHomeScreenItems = (body, callBackFunction) => {
  // console.log("body", body);
  fetch(`${API_SERVER}homeScreenItems`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })

    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        // console.log("Cate", data);
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const addCategories = (body, callBackFunction) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
    body: JSON.stringify(body),
  };
  // console.log("state state", body);
  fetch(`${API_SERVER}categories`, requestOptions)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })

    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        // console.log("Cate", data);
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const addTrendingItems = (body, callBackFunction) => {
  // console.log("body", body.items);
  fetch(`${API_SERVER}homeScreenItems/trendingCollections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
    body: JSON.stringify(body.items),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })

    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        // console.log("Cate", data);
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const addStaticElements = (body, callBackFunction) => {
  // console.log("api body", body);
  fetch(`${API_SERVER}homeScreenItems/staticElements`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })

    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        // console.log("Cate", data);
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const updateOrder = (body, callBackFunction) => {
  fetch(`${API_SERVER}orders/deliveryBoy/changeOrderStatus`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(data => {
      // window.scrollTo({top: 0, behavior: 'smooth'})
      // window.location.href = `${API_SERVER}/myorders`;
      window.location.href = `/myorders`;

      // setShow(false);
    })
    .catch(err => {
      console.log(err);
    });
};

export const addBanners = (body, callBackFunction) => {
  // console.log("body",body);
  fetch(`${API_SERVER}homeScreenItems/banners`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })

    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        // console.log("Cate", data);
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getBannerList = callBackFunction => {
  fetch(`${API_SERVER}homeScreenItems/banners`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "Authorization":localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const getHomeScreenItemsList = callBackFunction => {
  fetch(`${API_SERVER}homeScreenItems`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "Authorization":localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getAllHomeScreenItemsList = callBackFunction => {
  console.log(API_KEY, "API");
  fetch(`${API_SERVER}homeScreenItems`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "Authorization":localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getTrendingCollections = callBackFunction => {
  fetch(`${API_SERVER}homeScreenItems/trendingCollections`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const getStaticElements = callBackFunction => {
  // console.log("API_KEY  ", API_KEY);
  fetch(`${API_SERVER}homeScreenItems/staticElements`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getOrders = callBackFunction => {
  fetch(`${API_SERVER}orders/owner/` + localStorage.getItem("userId"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        //callBackFunction(data);
        return (window.location.href = "/auth/login");
        //return data;
      } else {
        // console.log("Cate", data);
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const chatList = callBackFunction => {
  fetch(`${API_SERVER}chat?userId=` + localStorage.getItem("userId"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "Authorization":localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        // console.log("chatCusomerData", data);
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const messagesList = (chatId, callBackFunction) => {
  fetch(`${API_SERVER}message/` + chatId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "Authorization":localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const sendMessage = (chatId, content, callBackFunction) => {
  const body = {
    sender: localStorage.getItem("userId"),
    chatId: chatId,
    content: content,
  };
  fetch(`${API_SERVER}message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        callBackFunction(data);
        return data;
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const updateShipRocketId = (
  orderId,
  itemId,
  shipRocketId,
  quantity,
  callBackFunction
) => {
  const body = {
    shipRocketId: shipRocketId,
    itemId: itemId,
    orderId: orderId,
    quantity: quantity,
  };
  fetch(`${API_SERVER}orders/${orderId}/updateOrderId`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const editCategory = (body, item_id, callBackFunction) => {
  // alert("hello inside");
  // console.log(item_id);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
    body: JSON.stringify(body),
  };
  fetch(`${API_SERVER}categories/updateCategory/${item_id}`, requestOptions)
    .then(response => response.json())
    .then(data => {
      window.scrollTo({top: 0, behavior: "smooth"});

      window.location.reload();
    })
    .catch(err => {
      console.log(err);
    });
};

export const addVarients = (itemId, varients, callBackFunction) => {
  const body = {
    itemId: itemId,
    varients: varients,
  };
  // console.log("Varient : ", body);
  fetch(`${API_SERVER}items/addVarient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getDiseases = callBackFunction => {
  fetch(`${API_SERVER}nutritionist/disease`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export const getQuestions = callBackFunction => {
  fetch(`${API_SERVER}nutritionist/questions`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getForms = callBackFunction => {
  fetch(`${API_SERVER}nutritionist/form`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const addDiseases = (body, callBackFunction) => {
  fetch(`${API_SERVER}nutritionist/disease`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })

    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const addQuestions = (body, callBackFunction) => {
  fetch(`${API_SERVER}nutritionist/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })

    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const addForms = (body, callBackFunction) => {
  fetch(`${API_SERVER}nutritionist/form`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })

    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const addFormsWithDisease = (body, callBackFunction) => {
  fetch(`${API_SERVER}nutritionist/form-with-diease`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })

    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getFormsWithDiseases = callBackFunction => {
  fetch(`${API_SERVER}nutritionist/form-with-diease`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getCustomerQuesAns = callBackFunction => {
  fetch(`${API_SERVER}nutritionist/answers`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getAllProducts = callBackFunction => {
  fetch(`${API_SERVER}items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        callBackFunction(data);
        return data;
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getSingleFormQuesAns = (answerId, formId, callBackFunction) => {
  fetch(`${API_SERVER}nutritionist/answers/${answerId}/${formId}`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getDietCategories = callBackFunction => {
  fetch(`${API_SERVER}categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        callBackFunction(data);
        return data;
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getDietSubCategoriesOfCategory = (
  categoryId,
  callBackFunction
) => {
  fetch(`${API_SERVER}categories/subcategories?categoryId=${categoryId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        callBackFunction(data);
        return data;
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getDietItemsOfSubCategory = (subCategoryId, callBackFunction) => {
  fetch(`${API_SERVER}sub_categories/items/?subCatId=${subCategoryId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        callBackFunction(data);
        return data;
      } else {
        callBackFunction(data);
        return data;
      }
    });
};

export const getDietItemDetails = (itemId, callBackFunction) => {
  fetch(`${API_SERVER}items/${itemId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      callBackFunction(data);
    })
    .catch(error => {
      console.log(error);
    });
};

export const createDietPlan = (body, callBackFunction) => {
  fetch(`${API_SERVER}nutritionist/diate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })

    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const updateStatus = (answerId, body, callBackFunction) => {
  fetch(`${API_SERVER}nutritionist/answer/update/${answerId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      API_KEY: API_KEY,
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })

    .then(data => {
      if (Number.isInteger(data)) {
        return (window.location.href = "/auth/login");
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getShippingJWTToken = callBackFunction => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      ClientID: BLUEDART_CLIENT_ID,
      clientSecret: BLUEDART_CLIENT_SECRET,
    },
  };

  fetch(`${BLUEDART_TEST}/in/transportation/token/v1/login`, options)
    .then(response => response.json())
    .then(response => {
      callBackFunction(response);
      localStorage.setItem("JWTToken", response.JWTToken);
      console.log(response);
    })
    .catch(err => console.error(err));
};

export const blueDartLocationFinder = (pin, callBackFunction) => {
  const body = {
    ProductCode: "E",
    PackType: "",
    pinCode: "534320",
    profile: {
      LoginID: BLUEDART_LOGINID_TEST,
      Api_type: "S",
      LicenceKey: BLUEDART_LICENCEKEY_TEST,
    },
    SubProductCode: "P",
    Feature: "",
  };
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      JWTToken: localStorage.getItem("JWTToken"),
    },
    body: JSON.stringify(body),
  };

  fetch(
    `${BLUEDART_TEST}/in/transportation/finder/v1/GetServicesforPincodeAndProduct`,
    options
  )
    .then(response => response.json())
    .then(response => {
      console.log(response);
      callBackFunction(response);
    })
    .catch(err => console.error(err));
};

export const generateBDWayBill = callBackFunction => {
  function getCurrentHHMM() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const hhmm = hours + minutes;
    return hhmm;
  }
  const body = {
    Request: {
      Consignee: {
        AvailableDays: "",
        AvailableTiming: "",
        ConsigneeAddress1: "Test Cngee Addr1",
        ConsigneeAddress2: "Test Cngee Addr2",
        ConsigneeAddress3: "Test Cngee Addr3",
        ConsigneeAddressType: "",
        ConsigneeAddressinfo: "",
        ConsigneeAttention: "",
        ConsigneeEmailID: "",
        ConsigneeFullAddress: "",
        ConsigneeGSTNumber: "",
        ConsigneeLatitude: "",
        ConsigneeLongitude: "",
        ConsigneeMaskedContactNumber: "",
        ConsigneeMobile: "9995554441",
        ConsigneeName: "Test Consignee Name",
        ConsigneePincode: "110027",
        ConsigneeTelephone: "",
      },
      Returnadds: {
        ManifestNumber: "",
        ReturnAddress1: "Plot no 1234 Bamnauli",
        ReturnAddress2: "Test RTO Addr2",
        ReturnAddress3: "Test RTO Addr3",
        ReturnAddressinfo: "",
        ReturnContact: "ABCD",
        ReturnEmailID: "testemail@bluedart.com",
        ReturnLatitude: "",
        ReturnLongitude: "",
        ReturnMaskedContactNumber: "",
        ReturnMobile: "9995554337",
        ReturnPincode: "100077",
        ReturnTelephone: "",
      },
      Services: {
        AWBNo: "",
        ActualWeight: "0.50",
        CollectableAmount: 0,
        Commodity: {
          CommodityDetail1: "6512d504d3875c103a101a99",
          CommodityDetail2: "6512d504d3875c103a101a99",
          CommodityDetail3: "6512d504d3875c103a101a99",
        },
        CreditReferenceNo: "abcdefghi",
        CreditReferenceNo2: "",
        CreditReferenceNo3: "",
        CurrencyCode: "",
        DeclaredValue: 1000,
        DeliveryTimeSlot: "",
        Dimensions: [
          {
            Breadth: 10,
            Count: 1,
            Height: 10,
            Length: 10,
          },
        ],
        FavouringName: "",
        ForwardAWBNo: "",
        ForwardLogisticCompName: "",
        InsurancePaidBy: "",
        InvoiceNo: "",
        IsChequeDD: "",
        IsDedicatedDeliveryNetwork: false,
        IsForcePickup: false,
        IsPartialPickup: false,
        IsReversePickup: false,
        ItemCount: 1,
        OTPBasedDelivery: "0",
        OTPCode: "",
        Officecutofftime: "",
        PDFOutputNotRequired: true,
        PackType: "",
        ParcelShopCode: "",
        PayableAt: "",
        PickupDate: `/Date(${Math.floor(new Date().getTime() / 1000.0)}000)/`,
        PickupMode: "",
        PickupTime: getCurrentHHMM(),
        PickupType: "",
        PieceCount: "1",
        PreferredPickupTimeSlot: "",
        ProductCode: "E",
        ProductFeature: "",
        ProductType: 1,
        RegisterPickup: true,
        SpecialInstruction: "",
        SubProductCode: "P",
        TotalCashPaytoCustomer: 0,
        itemdtl: [
          {
            CGSTAmount: 0,
            HSCode: "",
            IGSTAmount: 0,
            IGSTRate: 0,
            Instruction: "",
            InvoiceDate: `/Date(${Math.floor(
              new Date().getTime() / 1000.0
            )}000)/`,
            InvoiceNumber: "121212",
            ItemID: "Test Item ID1",
            ItemName: "Test Item1",
            ItemValue: 35672,
            Itemquantity: 1,
            PlaceofSupply: "Gurgaon",
            ProductDesc1: "Test Item1",
            ProductDesc2: "Test Item1",
            ReturnReason: "",
            SGSTAmount: 0,
            SKUNumber: "",
            SellerGSTNNumber: "Z2222222",
            SellerName: "ABC ENTP",
            TaxableAmount: 0,
            TotalValue: 35672,
            cessAmount: "0.0",
            countryOfOrigin: "IN",
            docType: "INV",
            subSupplyType: 1,
            supplyType: "0",
          },
        ],
        noOfDCGiven: 0,
      },
      Shipper: {
        CustomerAddress1: "A2,unit no 1,2,4 Mumbai-Nasik Highway Village",
        CustomerAddress2: "Vahuli Post-Padgha",
        CustomerAddress3: "GURGAON,HARYANA",
        CustomerAddressinfo: "",
        CustomerCode: BLUEDART_CUSTOMERID_TEST,
        CustomerEmailID: "",
        CustomerGSTNumber: "",
        CustomerLatitude: "",
        CustomerLongitude: "",
        CustomerMaskedContactNumber: "",
        CustomerMobile: "7777777777",
        CustomerName: "Pravin Prakash Sangle",
        CustomerPincode: "600002",
        CustomerTelephone: "7777777777",
        IsToPayCustomer: false,
        OriginArea: BLUEDART_ORIGINAREA_TEST,
        Sender: "ABCD-NAME",
        VendorCode: "125465",
      },
    },
    Profile: {
      LoginID: BLUEDART_LOGINID_TEST,
      LicenceKey: BLUEDART_LICENCEKEY_TEST,
      Api_type: "S",
    },
  };
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      JWTToken: localStorage.getItem("JWTToken"),
    },
    body: JSON.stringify(body),
  };

  fetch(
    `${BLUEDART_TEST}/in/transportation/waybill/v1/GenerateWayBill`,
    options
  )
    .then(response => response.json())
    .then(response => {
      console.log(response);
      callBackFunction(response);
    })
    .catch(err => console.error(err));
};

export const createAccount = (body, myCallback) => {
  fetch(`${API_SERVER}user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .then(data => {
      myCallback(data);
      console.log(data);
      return data.access_token;
    })
    .catch(error => {
      myCallback(error);
      console.log(error);
      return error;
    });
};

export const getAllVendors = callBackFunction => {
  const role = "VENDOR";
  fetch(`${API_SERVER}user?role=${role}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      api_key: API_KEY,
      Authorization: localStorage.getItem("Authorization"),
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        callBackFunction(data);
        return data;
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getAllSuppliers = callBackFunction => {
  const role = "ADMIN";
  fetch(`${API_SERVER}user?role=${role}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      api_key: API_KEY,
      Authorization: localStorage.getItem("Authorization"),
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      if (Number.isInteger(data)) {
        callBackFunction(data);
        console.log(data);
        return data;
      } else {
        callBackFunction(data);
        console.log(data);
        return data;
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const createNewAddress = (state, userId, callBackFunction) => {
  const body = {
    name: state.name,
    contactNumber: state.contactNumber,
    city: state.city,
    pin: state.pin,
    area: state.area,
    district: state.district,
    state: state.state,
    userId: userId,
    houseNumber: state.houseNumber,
    isDefaultAddress: state.isDefaultAddress,
    landMark: state.landMark,
    alternativeMobileNumber: state.alternativeMobileNumber,
  };

  fetch(`${API_SERVER}address`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      callBackFunction(data);
    })
    .catch(error => {
      console.log(error);
    });
};

export const makePhonePe = (addressId, callBack) => {
  let body = {amount: 100, address: addressId};
  fetch(`${API_SERVER}adminPhonePe/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      console.log("DATAAA", data);
      callBack(data);
    })
    .catch(error => {
      callBack(error);
    });
};

export const getUserAddress = (userId, callBackFunction) => {
  fetch(`${API_SERVER}address/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then(data => {
      console.log(data);
      callBackFunction(data);
    })

    .catch(error => {
      console.log(error);
    });
};
