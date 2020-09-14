import React, { useState, useEffect } from "react";
import { setTemporaryConfigValue } from "@openmrs/esm-module-config";
import styles from "./editable-value.styles.css";
import ValueEditor from "./value-editor";

interface EditableValueProps {
  path: string[];
  value: string | number | Array<any> | null;
}

export default function EditableValue({ path, value }: EditableValueProps) {
  const [valueString, setValueString] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const closeEditor = () => {
    setEditing(false);
    setError(null);
  };

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
        >
          {valueString ?? JSON.stringify(value)}
        </button>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
