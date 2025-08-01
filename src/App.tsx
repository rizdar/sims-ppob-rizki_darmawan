import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import TopUpPage from "./pages/TopUpPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import * as Constant from "./constant/Constant";
import { Provider } from "react-redux";
import store from "./store";
import RootLayoutPage from "./pages/RootLayoutPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import BayarPage from "./pages/BayarPage";

const router = createBrowserRouter([
  {
    path: Constant.HOMEPAGE,
    element: <RootLayoutPage />,

    children: [
      { index: true, element: <HomePage /> },
      {
        path: Constant.TOPUPPAGE,
        element: <TopUpPage />,
      },
      {
        path: Constant.TRANSACTIONPAGE,
        element: <TransactionHistoryPage />,
      },
      {
        path: Constant.PROFILEPAGE,
        element: <ProfilePage />,
      },
      {
        path: Constant.BAYARPAGE,
        element: <BayarPage />,
      },
    ],
  },
  {
    path: Constant.LOGINPAGE,
    element: <LoginPage />,
  },
  {
    path: Constant.REGISTERPAGE,
    element: <RegistrationPage />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
