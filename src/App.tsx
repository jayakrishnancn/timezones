import "./App.css";
import Button from "./components/button";
import Table from "./components/Table";

function App() {
  return (
    <div className="App">
      <h1 className="title">TimeZone</h1>
      <Button>Add Timezone</Button>
      <Table />
    </div>
  );
}

export default App;
