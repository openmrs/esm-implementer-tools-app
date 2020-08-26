import React, { useState, useEffect } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import "@reach/tabs/styles.css";
import styles from "./popup.styles.css";
import Configuration from "../configuration/configuration.component";
import BackendModule from "../backend-dependencies/backend-dependecies.component";

export default function Popup(props: DevToolsPopupProps) {
  const [configHasAlert, setConfigHasAlert] = useState(false);
  const [backendHasAlert, setBackendHasAlert] = useState(false);

  useEffect(() => {
    props.setHasAlert(configHasAlert || backendHasAlert);
  }, [backendHasAlert, configHasAlert]);

  return (
    <div className={styles.popup}>
      <Tabs className={styles.tabs}>
        <TabList className={styles.tabList}>
          <Tab>Configuration</Tab>
          <Tab>Backend Modules</Tab>
        </TabList>
        <TabPanels className={styles.tabPanels}>
          <TabPanel>
            <React.Suspense fallback="">
              <Configuration setHasAlert={setConfigHasAlert} />
            </React.Suspense>
          </TabPanel>
          <TabPanel>
            <BackendModule setHasAlert={setBackendHasAlert} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div className={styles.farRight}>
        <button onClick={props.close} className="omrs-unstyled">
          {"\u24e7"}
        </button>
      </div>
    </div>
  );
}

type DevToolsPopupProps = {
  close(): void;
  setHasAlert(value: boolean): void;
};
