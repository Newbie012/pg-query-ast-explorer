import Header from "./Header";
import SplitterPanel from "./SplitterPanel";

function App() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex-1">
        <SplitterPanel />
      </div>
    </div>
  );
}

export default App;
