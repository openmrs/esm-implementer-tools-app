import "./set-public-path";

function setupOpenMRS() {
  return {
    lifecycle: () => import("./openmrs-esm-implementer-tools"),
    activate: () => true,
  };
}

export { setupOpenMRS };
