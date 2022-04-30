import { useRef } from "react";
import "./App.css";
import Button from "./components/button";
import Table from "./components/Table";

function App() {
  const tableRef = useRef<any>();
  return (
    <div className="App">
      <h1 className="title">TimeZone</h1>
      <Button
        onClick={() => {
          if (tableRef.current) {
            tableRef.current?.addNew();
          }
        }}
      >
        Add Timezone
      </Button>
      <Table tableRef={tableRef} />
    </div>
  );
}

export default App;
