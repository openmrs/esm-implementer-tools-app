import "./set-public-path";

function setupOpenMRS() {
  return {
    lifecycle: () => import("./openmrs-esm-implementer-tools"),
    activate: () => true,
  };
}

const importTranslation = () => Promise.resolve();

export { setupOpenMRS, importTranslation };
