import Image from "next/image";
import Link from "next/link";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import React from "react";
import Spinner from "./Spinner";
import useElementsByTypeQuery, {
  ELEMENTS_BY_TYPE_QUERY_KEY,
} from "@/hooks/useElementsByType";
import useDeleteElementMutation from "@/hooks/useDeleteByIdAndType";
import { useUserContext } from "@/hooks/useLoginContext";

export const typePage = (type) => {
  const typeMapping = {
    product: "products",
    entity: "entities",
    person: "persons",
    user: "users",
  };
  return typeMapping[type];
};

const List = ({ type }) => {
  const userLogged = useUserContext();
  const elements = useElementsByTypeQuery(typePage(type));
  const { mutateAsync: deleteElement } = useDeleteElementMutation([
    ELEMENTS_BY_TYPE_QUERY_KEY,
  ]);

  const handleDeleteElement = (id) => deleteElement({ id, type });

  return (
    <div className="flex flex-col space-y-7 w-1/4">
      {elements.isFetching ? (
        <Spinner />
      ) : (
        elements.data[typePage(type)]?.map((element) => {
          return (
            <React.Fragment key={element[type].id}>
              <div className="flex flex-row space-x-3 items-center justify-between">
                <div className="flex flex-row space-x-3">
                  <Image
                    alt={element[type].name}
                    height={40}
                    width={40}
                    src={element[type].imageUrl || ""}
                  />
                  <Link
                    className="text-white underline text-3xl"
                    href={`/${type}/${element[type].id}`}
                  >
                    {element[type].name}
                  </Link>
                </div>
                {userLogged.role == "WRITER" && (
                  <div className="flex flex-col space-y-3">
                    <TrashIcon
                      className="w-10 p-2 rounded-full bg-amber-500 font-medium cursor-pointer text-black"
                      onClick={() => handleDeleteElement(element[type].id)}
                    />
                    <Link
                      className="text-white underline text-3xl"
                      href={{
                        pathname: "/create",
                        query: {
                          type,
                          id: element[type].id,
                        },
                      }}
                      as={`/edit?${element[type].name}`}
                    >
                      <PencilSquareIcon className="w-10 p-2 rounded-full bg-amber-500 font-medium cursor-pointer text-black" />
                    </Link>
                  </div>
                )}
              </div>
              <hr className="border-amber-500" />
            </React.Fragment>
          );
        })
      )}
    </div>
  );
};

export default List;
