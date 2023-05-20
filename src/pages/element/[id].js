import Header from "@/components/Header";
import { typePage } from "@/components/List";
import Spinner from "@/components/Spinner";
import Table from "@/components/Table";
import useElementsRelated from "@/hooks/useElementsRelated";
import React, { useEffect } from "react";
import { useCallback } from "react";
import { useCookies } from "react-cookie";

const Page = ({ element, type }) => {
  const [cookies, setCookies] = useCookies(["userKey"]);

  const getElementsRelated = useElementsRelated(
    element.id,
    typePage(type),
    cookies.userKey
  );

  const renderTable = useCallback(() => {
    if (!getElementsRelated.isFetching) {
      const dataTable = {
        product: {
          "Personas relacionadas": getElementsRelated.data?.persons ?? [],
          "Entidades relacionadas": getElementsRelated.data?.entities ?? [],
        },
        entity: {
          "Personas relacionadas": getElementsRelated.data?.persons ?? [],
          "Productos relacionados": getElementsRelated.data?.products ?? [],
        },
        person: {
          "Entidades relacionadas": getElementsRelated.data?.entities ?? [],
          "Productos relacionados": getElementsRelated.data?.products ?? [],
        },
      };
      return <Table data={dataTable[type]} />;
    } else {
      return (
        <div className="flex flex-row mt-10">
          <p className="text-xl text-center text-amber-500 mr-5">
            Cargando elementos relacionados...
          </p>
          <Spinner />
        </div>
      );
    }
  }, [getElementsRelated.isFetching, type]);

  return (
    <>
      <Header />
      <div className="flex flex-row justify-around gap-10 mt-10">
        <div className="flex flex-col">
          <div className="text-center text-xl text-amber-500 bg-white rounded-3xl w-fit h-fit">
            <img
              className="max-w-lg h-auto mx-auto rounded-t-3xl"
              src={element.imageUrl}
              alt={element.name}
            />
            <h1 className="my-5 text-4xl font-bold mx-10">{element.name}</h1>
            <p className="text-2xl font-bold">{element.birthDate}</p>
            <p className="text-2xl font-bold pb-5">{element.deathDate}</p>
          </div>
          {renderTable()}
        </div>
        <div className="flex flex-col w-3/5 space-y-4">
          <iframe style={{ height: "100%" }} src={element.wikiUrl}></iframe>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;

  return { props: { element: JSON.parse(query.element), type: query.type } };
}

export default Page;
