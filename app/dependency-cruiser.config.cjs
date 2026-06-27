module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      comment: "Circular dependencies are not allowed.",
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: "shared-is-foundation",
      severity: "error",
      comment: "Shared cannot depend on business layers.",
      from: {
        path: "^src/shared",
      },
      to: {
        path: "^src/(entities|features|widgets|processes|app|root)",
      },
    },
    {
      name: "entities-layer",
      severity: "error",
      comment: "Entities may only depend on shared and entities.",
      from: {
        path: "^src/entities",
      },
      to: {
        path: "^src/(features|widgets|processes|app|root)",
      },
    },
    {
      name: "features-layer",
      severity: "error",
      comment: "Features cannot depend on widgets/processes/app/root.",
      from: {
        path: "^src/features",
      },
      to: {
        path: "^src/(widgets|processes|app|root)",
      },
    },
    {
      name: "widgets-layer",
      severity: "error",
      comment: "Widgets cannot depend on processes/app/root.",
      from: {
        path: "^src/widgets",
      },
      to: {
        path: "^src/(processes|app|root)",
      },
    },
  ],

  options: {
    tsConfig: {
      fileName: "tsconfig.json",
    },

    doNotFollow: {
      path: "node_modules",
    },

    exclude: {
      path: ["\\.next", "node_modules", "coverage"],
    },
  },
};
