import { Route, Routes } from "react-router";
import "./App.css";
import { Layout } from "./components/Layout";
import { LayoutAdmin } from "./components/LayoutAdmin";
import AbsensiKaryawan from "./pages/AbsensiKaryawan/page";
import ManajemenKaryawan from "./pages/ManajemenKaryawan/page";
import Home from "./pages/Home/page";
import Login from "./pages/Login/page";
import DetailAbsensiKaryawan from "./pages/DetailAbsensiKaryawan/page";
import PrivateRoute from "./middleware/PrivateRoute";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="/home"
            element={
              <Layout>
                <Home />{" "}
              </Layout>
            }
          />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route
            path="/admin/manajemen-karyawan"
            element={
              <LayoutAdmin>
                <ManajemenKaryawan />
              </LayoutAdmin>
            }
          />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route
            path="/admin/absensi-karyawan"
            element={
              <LayoutAdmin>
                <AbsensiKaryawan />
              </LayoutAdmin>
            }
          />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route
            path="/admin/absensi-karyawan/:userId"
            element={
              <LayoutAdmin>
                <DetailAbsensiKaryawan />
              </LayoutAdmin>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
