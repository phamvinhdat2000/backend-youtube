import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

import { Navbar, Loader } from "./components";
import Footer from "./components/Footer";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Admin } from "./components/Admin";
const Feed = lazy(() => import("./components/Feed"));
const VideoDetail = lazy(() => import("./components/VideoDetail"));
const ChannelDetail = lazy(() => import("./components/ChannelDetail"));
const InfoUser = lazy(() => import("./components/InfoUser"));
const Login = lazy(() => import("./components/Login"));
const SignUp = lazy(() => import("./components/SignUp"));
const SearchFeed = lazy(() => import("./components/SearchFeed"));
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Box sx={{ backgroundColor: "#000" }}>
        <Navbar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route exact path="/" element={<Feed />} />
            <Route
              exact
              path="/listVideoType/:videoTypeId"
              element={<Feed />}
            />
            <Route path="/video/:id/:videoTypeId" element={<VideoDetail />} />
            <Route path="/channel/:id" element={<ChannelDetail />} />
            <Route path="/info/:id" element={<InfoUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/search/:searchTerm" element={<SearchFeed />} />
            <Route path="/admin/video-manager" element={<Admin />} />
          </Routes>
        </Suspense>
        <Footer />
      </Box>
    </BrowserRouter>
  </Provider>
);

export default App;
