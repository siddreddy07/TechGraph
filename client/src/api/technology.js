import api from "../utils/axios.instance";

export async function findTechnologyPath(from, to) {
  const { data } = await api.get("/technologies/path", {
    params: { from, to },
  });
  return data;
}


export async function getProjectsByTechnology(name) {
  const { data } = await api.get(
    `/technologies/${name}/projects`
  );

  return data;
}

export async function getRelatedTechnologies(name) {
  const { data } = await api.get(
    `/technologies/${name}/related`
  );

  return data;
}
