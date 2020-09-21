import React, { useState, useEffect, useRef } from "react";
import { setTemporaryConfigValue } from "@openmrs/esm-module-config";
import styles from "./editable-value.styles.css";
import ValueEditor from "./value-editor";
import { useGlobalState } from "../global-state";
import { isEqual } from "lodash";

interface EditableValueProps {
  path: string[];
  value: string | number | Array<any> | null;
}

export default function EditableValue({ path, value }: EditableValueProps) {
  const [valueString, setValueString] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [configPathBeingEdited, setConfigPathBeingEdited] = useGlobalState(
    "configPathBeingEdited"
  );
  const activeConfigPath = useRef<HTMLButtonElement>(null);

  const closeEditor = () => {
    setEditing(false);
    setError(null);
  };

  const focusOnConfigPathBeingEdited = () => {
    if (activeConfigPath && activeConfigPath.current) {
      setEditing(true);
      activeConfigPath.current.focus();
    }
  };

  useEffect(() => {
    if (isEqual(configPathBeingEdited, path)) {
      focusOnConfigPathBeingEdited();
    }
  }, [configPathBeingEdited]);

  return (
    <div style={{ display: "flex" }}>
      {editing ? (
        <ValueEditor
          valueString={valueString ?? JSON.stringify(value)}
          handleClose={closeEditor}
          handleSave={(val) => {
            try {
              const result = JSON.parse(val);
              setTemporaryConfigValue(path, result);
              setValueString(val);
              closeEditor();
            } catch (e) {
              console.warn(e);
              setError("That's not formatted quite right. Try again.");
            }
          }}
        />
      ) : (
        <button
          className={styles.secretButton}
          onClick={() => setEditing(true)}
          ref={activeConfigPath}
        >
          {valueString ?? JSON.stringify(value)}
        </button>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
