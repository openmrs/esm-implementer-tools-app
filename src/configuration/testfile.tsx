import React from "react";

import EditableValue from "./editable-value.component";

function isOrdinaryObject(value: any): boolean {
  return typeof value === "object" && !Array.isArray(value);
}
