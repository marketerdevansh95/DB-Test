import Sidebar from "@/dashboardComponent/Sidebar";
import "../../../styles/bootstrap.min.css";
import "../../../styles/globals.css";
import "../../../styles/dashboard.css";
import "react-toastify/dist/ReactToastify.css";
import DashboardHeader from "@/dashboardComponent/DashboardHeader";

export default function AdminLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>
          <div className="container-fluid">
            <DashboardHeader />
            <div className="row body-wrapper">
              <div className="col-2 sidebar-wrapper">
                <Sidebar />
              </div>
              <div className="col-10">{children}</div>
            </div>
          </div>
        </body>
      </html>
    </>
  );
}
