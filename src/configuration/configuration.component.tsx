import React from "react";
import {
  getDevtoolsConfig,
  getAreDevDefaultsOn,
  setAreDevDefaultsOn,
} from "@openmrs/esm-module-config";
import Switch from "./switch.component";
import styles from "./configuration.styles.css";

export default function Configuration(props: ConfigurationProps) {
  const [config, setConfig] = React.useState({});
  const [isDevConfigActive, setIsDevConfigActive] = React.useState(
    getAreDevDefaultsOn()
  );

  React.useEffect(() => {
    getDevtoolsConfig().then((res) => setConfig(res));
  }, []);

  const configString = JSON.stringify(config, null, 2);

  return (
    <div className={styles.panel}>
      <div className={styles.tools}>
        <div className={styles.switch}>
          <Switch
            checked={isDevConfigActive}
            onChange={() => {
              setAreDevDefaultsOn(!isDevConfigActive);
              setIsDevConfigActive(!isDevConfigActive);
            }}
          />
          <div className="omrs-margin-left-12">Dev Config</div>
        </div>
      </div>
      <div>
        <pre>
          <code>{configString}</code>
        </pre>
      </div>
    </div>
  );
}

type ConfigurationProps = {
  setHasAlert(value: boolean): void;
};
