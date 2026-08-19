export function pathToReactFlow(path) {
  if (!path?.segments?.length) {
    return {
      nodes: [],
      edges: [],
    };
  }

  const nodes = [
    {
      id: "0",
      position: { x: 0, y: 100 },
      data: {
        label: path.segments[0].from.name,
      },
    },
  ];

  const edges = [];

  path.segments.forEach((segment, index) => {
    nodes.push({
      id: String(index + 1),
      position: {
        x: (index + 1) * 220,
        y: 100,
      },
      data: {
        label: segment.to.name,
      },
    });

    edges.push({
      id: `edge-${index}`,
      source: String(index),
      target: String(index + 1),
      label: segment.relationship,
    });
  });

  return {
    nodes,
    edges,
  };
}