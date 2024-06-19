import { createContext, Dispatch, SetStateAction, useState } from 'react';
import Sidebar from './components/Sidebar';
import PurchasesTable from './components/PurchasesTable';
import Topbar from './components/Topbar';

interface mainContentContextValue {
  mainContent: JSX.Element | null;
  setMainContent: Dispatch<SetStateAction<JSX.Element | null>>;
}
export const ContentContext = createContext<
  mainContentContextValue | undefined
>(undefined);

interface sideBarContextValue {
  showSideBar: boolean | null;
  setshowSideBar: Dispatch<SetStateAction<JSX.Element | null>>;
}
export const sideBarContext = createContext<sideBarContextValue | undefined>(
  undefined,
);

function App() {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <>
      {/* Static sidebar for desktop */}
      <Sidebar />
      <Topbar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <div className="lg:pl-72">
        {/* Main section */}
        <section className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {
              /* Your content */
              <PurchasesTable />
            }
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
