(() => {
  const selectedOrder = [
    "library-evaluation",
    "signal-aftershock",
    "vita",
    "pedalbalance-echo",
  ];

  function partitionProjects(projects) {
    const byId = new Map(projects.map((project) => [project.id, project]));
    const selected = selectedOrder.map((id) => byId.get(id)).filter(Boolean);
    const selectedIds = new Set(selectedOrder);
    const archive = projects.filter((project) => !selectedIds.has(project.id));
    return { selected, archive };
  }

  function projectSharePath(project) {
    return `projects/${encodeURIComponent(project.id)}.html`;
  }

  function projectDescription(project) {
    return project.caseFacts?.evidence || project.summary || project.meaning || "";
  }

  window.PortfolioModel = {
    selectedOrder,
    partitionProjects,
    projectSharePath,
    projectDescription,
  };
})();
