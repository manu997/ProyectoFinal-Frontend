import Header from "@/components/Header";
import Table from "@/components/Table";
import React from "react";
import { useCallback } from "react";

const Page = ({ element, type }) => {
  const renderTable = useCallback(() => {
    let dataTable = {};

    if (type === "product") {
      dataTable = {
        ...dataTable,
        "Personas relacionadas": element.persons ?? [],
        "Entidades relacionadas": element.entities ?? [],
      };
    } else if (type === "entity") {
      dataTable = {
        ...dataTable,
        "Personas relacionadas": element.persons ?? [],
        "Productos relacionados": element.products ?? [],
      };
    } else {
      dataTable = {
        ...dataTable,
        "Entidades relacionadas": element.entities ?? [],
        "Productos relacionados": element.products ?? [],
      };
    }
    return <Table data={dataTable} />;
  }, []);

  console.log(element)

  return (
    <>
      <Header />
      <div className="flex flex-row justify-evenly mt-5">
        <div className="text-center text-xl text-amber-500 mt-7">
          <h1 className="mb-3 font-bold">{element.name}</h1>
          <p>{element.birthDate}</p>
          <p>{element.deathDate}</p>
          <img
            className="mt-5 max-w-lg h-auto mx-auto"
            src={element.imageUrl}
            alt={element.name}
          />
        </div>
        <div className="flex flex-col w-3/5 space-y-4">
          {renderTable()}
          <iframe
            className=""
            style={{ height: "50vh" }}
            src={element.wikiUrl}
          ></iframe>
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
