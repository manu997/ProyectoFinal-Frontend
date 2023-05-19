import { useQuery } from "@tanstack/react-query";

const getElements = async (key) => {
  const products = await fetch(`http://127.0.0.1:8000/api/v1/products`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Authorization": key,
    },
  }).then((data) => data.json());

  const persons = await fetch(`http://127.0.0.1:8000/api/v1/persons`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Authorization": key,
    },
  }).then((data) => data.json());

  const entities = await fetch(`http://127.0.0.1:8000/api/v1/entities`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Authorization": key,
    },
  }).then((data) => data.json());

  const data = { ...products, ...persons, ...entities };

  return data;
};

export default function useElements(key) {
  return useQuery(["elements"], () => getElements(key));
}
