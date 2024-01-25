import React, {useEffect, useState} from "react";
import {
  Header,
  Sidebar,
  NutritionSideBar,
  SuperAdminSideBar,
  VendorSideBar,
} from "./components/admin";
import {useLocation} from "react-router-dom";
import {Switch, Route, Link, Redirect} from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import ProtectedRoute from "./js/RouteProtector";
import {LoginComponent} from "./pages/LoginComponent";
import ForgotPassword from "./pages/ForgotPassword";
import CreateCategory from "./pages/CreateCategory";
import Loader from "./components/modals/Loader/Loader";
import Categories from "./pages/Categories/CategoriesPage";
import SubCategories from "./pages/SubCategories/SubCategoriesPage";
import HomeScreenItems from "./pages/HomeScreenItems/HomeScreenItems";
import AllHomeScreenItems from "./pages/HomeScreenItems/AllHomeScreenItems";
import TrendingItems from "./pages/HomeScreenItems/TrendingItems";
import StaticElements from "./pages/HomeScreenItems/StaticElements";
import WeeklyReports from "./pages/Reports/WeeklyReports";
import MonthlyReports from "./pages/Reports/MonthlyReports";
import CustomReports from "./pages/Reports/CustomReports";
import Products from "./pages/Products/Products";
import ChatBox from "./pages/Messages/ChatBox";
// import CategoryListPage from "./pages/CategoryList";
import SubCategoryListingPage from "./pages/SubCategoryListingPage";
import CreateSubCategory from "./pages/CreateSubCategory";
import Dashboard from "./pages/Dashboard/Dashboard";
// import OwnersOrdersList from "./pages/OwnersOrders";
// import AddProduct from "./pages/AddProduct";
import MyOrders from "./pages/Orders/MyOrders";
import Banners from "./pages/Banners/Banners";
import ShipRocket from "./pages/shipment/Shiprocket";
import NutrionistDashboard from "./components/nutrionist/dashboard/NutrionistDashboard";
import {Diffrentiator} from "./components/Diffrentiator";
import Disease from "./pages/Disease/Disease";
import Questions from "./pages/Questions/Questions";
import Forms from "./pages/Forms/Forms";
import UserStatistics from "./pages/UserStatistics/UserStatistics";
import MapFormsWithDisease from "./pages/MapFormsWithDisease/MapFormsWithDisease";
import CustomerQuesAns from "./pages/CustomerQuesAns/CustomerQuesAns";
import SignUpComponent from "./pages/SignUpComponent";
import SuperAdminDashboard from "./components/SuperAdmin/SuperAdminDashboard";
import Vendors from "./pages/Vendors/Vendors";
import Suppliers from "./pages/Suppliers/Suppliers";
import VendorDashboard from "./components/Vendors/VendorsDashborad";
function App() {
  let location = useLocation().pathname;

  let locationSplit = location.split("/");
  let locationParent = locationSplit[1];
  let WithoutRouter = ["auth", "error"];
  let WithUserRouter = ["user"];
  const role = localStorage.getItem("role");
  const [isLoggedIn, setIsLoggedIn] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(JSON.parse(data));
  }, [isLoggedIn]);

  const myStyle = {
    backgroundColor: "#0b0e8e",
    minHeight: "100%",
    marginTop: "0px",
    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "white",
  };
  return (
    <div className="App">
      <>
        {!WithoutRouter.includes(locationParent) ? (
          role === "ADMIN" ? (
            <>
              <Header />
              <Sidebar />
            </>
          ) : role === "NUTRITIONIST" ? (
            <>
              <Header />
              <NutritionSideBar />
            </>
          ) : role === "SUPERADMIN" ? (
            <>
              <Header />
              <SuperAdminSideBar />
            </>
          ) : role === "VENDOR" ? (
            <>
              <Header />
              <VendorSideBar />
            </>
          ) : (
            ""
          )
        ) : (
          ""
        )}

        <Switch>
          <ProtectedRoute path="/" exact component={Diffrentiator} />
          <ProtectedRoute path="/admin" exact component={Dashboard} />
          <ProtectedRoute
            path="/superadmin"
            exact
            component={SuperAdminDashboard}
          />
          <ProtectedRoute path="/createvendor" exact component={Vendors} />

          <ProtectedRoute path="/vendor" exact component={VendorDashboard} />
          <ProtectedRoute path="/createsuppliers" exact component={Suppliers} />
          <ProtectedRoute
            path="/productsList"
            exact
            component={ProductListPage}
          />
          <ProtectedRoute
            path="/create_category"
            exact
            component={CreateCategory}
          />
          <ProtectedRoute path="/banner" exact component={Banners} />
          <ProtectedRoute
            path="/homescreenitems"
            exact
            component={HomeScreenItems}
          />
          <ProtectedRoute
            path="/allhomescreenitems"
            exact
            component={AllHomeScreenItems}
          />
          <ProtectedRoute
            path="/trendingitems"
            exact
            component={TrendingItems}
          />
          <ProtectedRoute
            path="/staticelements"
            exact
            component={StaticElements}
          />
          <ProtectedRoute path="/categories" exact component={Categories} />
          <ProtectedRoute
            path="/subcategories"
            exact
            component={SubCategories}
          />
          {/* <ProtectedRoute path="/chatbox" exact component={ ChatBox } /> */}
          <ProtectedRoute
            path="/weeklyreports"
            exact
            component={WeeklyReports}
          />
          <ProtectedRoute
            path="/monthlyreports"
            exact
            component={MonthlyReports}
          />
          <ProtectedRoute
            path="/customreports"
            exact
            component={CustomReports}
          />
          <ProtectedRoute path="/products" exact component={Products} />
          <ProtectedRoute
            path="/create_subCategories"
            exact
            component={CreateSubCategory}
          />
          <ProtectedRoute
            path="/subCategoriess"
            exact
            component={SubCategoryListingPage}
          />
          <ProtectedRoute path="/myorders" exact component={MyOrders} />
          <ProtectedRoute path="/shipment" exact component={ShipRocket} />
          <Route path="/auth/signup" component={SignUpComponent} />
          <Route path="/auth/login" component={LoginComponent} />
          <Route path="/auth/forgotPassword" component={ForgotPassword} />
          <ProtectedRoute
            path="/nutritionist"
            exact
            component={NutrionistDashboard}
          />
          <ProtectedRoute
            path="/nutritionist/disease"
            exact
            component={Disease}
          />
          <ProtectedRoute
            path="/nutritionist/questions"
            exact
            component={Questions}
          />
          <ProtectedRoute path="/nutritionist/forms" exact component={Forms} />
          <ProtectedRoute
            path="/nutritionist/mapformswithdisease"
            exact
            component={MapFormsWithDisease}
          />
          <ProtectedRoute
            path="/nutritionist/customerquesans"
            exact
            component={CustomerQuesAns}
          />
          <ProtectedRoute
            path="/nutritionist/userstatistics"
            exact
            component={UserStatistics}
          />

          {/* <ProtectedRoute path="/user" component={ UserDashboard } /> */}
          <Route path="*">
            {/* <div
              className="d-flex justify-content-center text-center"
              style={myStyle}
            >
              <div
                className="text-info "
                style={{fontSize: "62px", paddingTop: "100px"}}
              >
                404
                <br />
                Page not Found
              </div>
            </div> */}
            <Redirect to="/" />
          </Route>
        </Switch>
      </>
    </div>
  );
}

export default App;
