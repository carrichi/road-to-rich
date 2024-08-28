import { createContext, Dispatch, SetStateAction, useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/dashboard';

interface mainContentContextValue {
  mainContent: JSX.Element | null;
  setMainContent: Dispatch<SetStateAction<JSX.Element>>;
}
export const ContentContext = createContext<
  mainContentContextValue | undefined
>(undefined);

interface sideBarContextValue {
  showSideBar: boolean | null;
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
}
export const SideBarContext = createContext<sideBarContextValue | undefined>(
  undefined,
);

function App() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [mainContent, setMainContent] = useState(<Dashboard />);

  return (
    <>
      <ContentContext.Provider value={{ mainContent, setMainContent }}>
        <SideBarContext.Provider value={{ showSideBar, setShowSideBar }}>
          <Topbar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
          <Sidebar />
          <div className="lg:pl-60">
            {/* Main section */}
            <section className="py-10">
              <div className="px-4 sm:px-6 lg:px-8">{mainContent}</div>
            </section>
          </div>
        </SideBarContext.Provider>
      </ContentContext.Provider>
    </>
  );
}

export default App;
