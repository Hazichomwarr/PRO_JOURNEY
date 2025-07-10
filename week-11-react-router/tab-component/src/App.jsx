import "./App.css";
import { Tabs } from "./components/Tabs";
import { TabPanel } from "./components/TabPanel";

function App() {
  return (
    <main className="p-8">
      <Tabs>
        <TabPanel label="About">I'm a full-stack developer.</TabPanel>
        <TabPanel label="Projects">I've built 5 apps so far.</TabPanel>
        <TabPanel label="Contact">Reach me at: me@example.com</TabPanel>
      </Tabs>
    </main>
  );
}

export default App;
