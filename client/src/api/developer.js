import api from "../utils/axios.instance";

export async function getDevelopers() {
  const { data } = await api.get("/developers");
  return data;
}

export async function getDeveloperTechnologies(name) {
  const { data } = await api.get(
    `/developers/${name}/technologies`
  );

  return data;
}