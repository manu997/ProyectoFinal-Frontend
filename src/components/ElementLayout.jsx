import useElementByIdAndType from "@/hooks/useElementByIdAndType";
import useElementsRelated from "@/hooks/useElementsRelated";
import { useCallback, useMemo } from "react";
import Table from "./Table";
import Spinner from "./Spinner";
import { typePage } from "./List";

const ElementLayout = ({ id, type }) => {
  const elementQuery = useElementByIdAndType(id, typePage(type));

  const getElementsRelated = useElementsRelated(id, typePage(type));

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

  return !elementQuery.isSuccess ? (
    <Spinner />
  ) : (
    <div className="flex flex-row justify-around gap-10 mt-10">
      <div className="flex flex-col">
        <div className="text-center text-xl text-amber-500 bg-white rounded-3xl w-fit h-fit">
          <img
            className="max-w-lg h-auto mx-auto rounded-t-3xl"
            src={elementQuery.data[type]?.imageUrl}
            alt={elementQuery.data[type]?.name}
          />
          <h1 className="my-5 text-4xl font-bold mx-10">
            {elementQuery.data[type]?.name}
          </h1>
          <p className="text-2xl font-bold">
            {elementQuery.data[type]?.birthDate}
          </p>
          <p className="text-2xl font-bold pb-5">
            {elementQuery.data[type]?.deathDate}
          </p>
        </div>
        {renderTable()}
      </div>
      <div className="flex flex-col w-3/5 space-y-4">
        <iframe
          style={{ height: "100%" }}
          src={elementQuery.data[type]?.wikiUrl}
        ></iframe>
      </div>
    </div>
  );
};

export default ElementLayout;
