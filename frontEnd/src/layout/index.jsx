import Signals from "../signals";
import Header from "./header";
import { Outlet } from "react-router-dom";
function MainLayout () {
  return (
    <>
      <div className="space-y-16">
        <header className={"z-[100] break-after-auto"}>
          <Header />
        </header>
        <div className="container mx-auto px-4 sm:mx-auto md:mx-auto lg:mx-auto p-10">
          {/* <Outlet /> */}
          <Signals />
        </div>
      </div>
    </>
  );
}

export default MainLayout;
