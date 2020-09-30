import React, { useCallback } from "react";
import {
  getDevtoolsConfig,
  getAreDevDefaultsOn,
  setAreDevDefaultsOn,
  clearTemporaryConfig,
} from "@openmrs/esm-module-config";
import Switch from "./switch.component";
import styles from "./configuration.styles.css";
import ConfigTree from "./config-tree.component";
import {
  getIsUIEditorEnabled,
  setIsUIEditorEnabled,
} from "@openmrs/esm-extension-manager";

export default function Configuration(props: ConfigurationProps) {
  const [config, setConfig] = React.useState({});
  const [isDevConfigActive, setIsDevConfigActive] = React.useState(
    getAreDevDefaultsOn()
  );
  const [isUIEditorActive, setIsUIEditorActive] = React.useState(
    getIsUIEditorEnabled()
  );

  const updateConfig = () => {
    getDevtoolsConfig().then((res) => {
      console.log(res);
      setConfig(res);
    });
  };

  React.useEffect(updateConfig, []);

  return (
    <div className={styles.panel}>
      <div className={styles.tools}>
        <div className={styles.switch}>
          <Switch
            key={"devConfigSwitch"}
            checked={isDevConfigActive}
            onChange={() => {
              setAreDevDefaultsOn(!isDevConfigActive);
              setIsDevConfigActive(!isDevConfigActive);
            }}
          />
          <div className="omrs-margin-left-12">Dev Config</div>
          <Switch
            key={"uiEditorSwitch"}
            checked={isUIEditorActive}
            onChange={() => {
              setIsUIEditorActive(!isUIEditorActive);
              setIsUIEditorEnabled(!isUIEditorActive);
            }}
          />
          <div className="omrs-margin-left-12">UI Editor</div>
        </div>
        <button
          onClick={() => {
            clearTemporaryConfig();
            updateConfig();
          }}
        >
          Clear Temporary Config
        </button>
      </div>
      <div className={styles.configContent}>
        <ConfigTree config={config} />
      </div>
    </div>
  );
}

type ConfigurationProps = {
  setHasAlert(value: boolean): void;
};
