import api from "../utils/axios.instance";


export async function getDeveloperTechnologies(name) {
  const data = await api.get(
    `/developers/${name}/technologies`
  );

  return data;
}
