import { useQuery } from "@tanstack/react-query";

const getElementsRelated = async (id, type, key) => {
  const possibleTypesRelated = {
    products: {
      type1: "persons",
      type2: "entities",
    },
    entities: {
      type1: "persons",
      type2: "products",
    },
    persons: {
      type1: "products",
      type2: "entities",
    },
  };

  const queryFirstType = await fetch(
    `${process.env.NEXT_PUBLIC_PHP_BACKEND}/api/v1/${type}/${id}/${possibleTypesRelated[type].type1}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: key,
        Accept: "application/json",
      },
    }
  )
    .then(async (data) => {
      const datafirstType = await data.json();
      return datafirstType;
    })
    .catch(() => {
      console.log(
        `${type}/${id}/${possibleTypesRelated[type].type1} not fetched.`
      );
    });

  const querySecondType = await fetch(
    `${process.env.NEXT_PUBLIC_PHP_BACKEND}/api/v1/${type}/${id}/${possibleTypesRelated[type].type2}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: key,
        Accept: "application/json",
      },
    }
  )
    .then(async (data) => {
      const dataSecondType = await data.json();
      return dataSecondType;
    })
    .catch(() => {
      console.log(
        `${type}/${id}/${possibleTypesRelated[type].type2} not fetched.`
      );
    });

  return { ...queryFirstType, ...querySecondType };
};

export default function useElementsRelated(id, type, key) {
  return useQuery(["getElementsRelated"], () =>
    getElementsRelated(id, type, key)
  );
}
