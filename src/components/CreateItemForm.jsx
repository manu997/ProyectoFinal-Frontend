import { useMemo, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import RelatedItemsField from "./RelatedItemsField";
import { typePage } from "./List";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import useElementByIdAndType from "@/hooks/useElementByIdAndType";
import useEditElement from "@/hooks/editElementMutation";
import useCreateElement from "@/hooks/createElementMutation";
import React from "react";
import useRelateItems from "@/hooks/createRelatedItemMutation";
import { toast } from "react-toastify";

const CreateItemForm = ({ type, id }) => {
  const router = useRouter();

  const [cookies] = useCookies(["userKey"]);

  const [elementType, setElementType] = useState("entity");
  const [img, setImg] = useState("");
  const [personsRelated, setPersonsRelated] = useState([]);
  const [entitiesRelated, setEntitiesRelated] = useState([]);
  const [productsRelated, setProductsRelated] = useState([]);
  const [element, setElement] = useState({
    name: "",
    birthDate: "",
    deathDate: "",
    imageUrl: "",
    wikiUrl: "",
  });
  const [operation, setOperation] = useState("POST");

  const query = useElementByIdAndType(cookies.userKey, id, typePage(type));

  useEffect(() => {
    if (!!id) {
      // Si vienen datos para editar, entra al if
      if (!query.isFetching && query.status == "success") {
        element.name = query.data[type].name;
        element.birthDate = query.data[type].birthDate ?? "";
        element.deathDate = query.data[type].deathDate ?? "";
        element.wikiUrl = query.data[type].wikiUrl ?? "";
        setImg(query.data[type].imageUrl ?? "");
        setElementType(type);
        setPersonsRelated(query.data[type].persons ?? []);
        setEntitiesRelated(query.data[type].entities ?? []);
        setProductsRelated(query.data[type].products ?? []);
        setOperation("PUT");
      }
    }
  }, [query.isFetching, id]);

  const create = useCreateElement();
  const edit = useEditElement();
  const relateItems = useRelateItems();

  const createElement = () => {
    element.imageUrl = img;
    const mutation =
      operation === "POST"
        ? create.mutateAsync({
            element: element,
            type: elementType,
            key: cookies.userKey,
          })
        : edit.mutateAsync({
            id: query.data[type].id,
            etag: query.data.etag,
            element: element,
            type: elementType,
            key: cookies.userKey,
          });
    mutation
      .then(async (res) => {
        if (operation === "POST") {
          // Entra al if cuando se crea un nuevo elemento, no cuando se edita
          const resJson = await res.json();
          if (elementType !== "person") {
            personsRelated.map((item) => {
              relateItems.mutateAsync({
                idToRelate: resJson[elementType].id,
                actualItemType: typePage(elementType),
                itemTypeToRelate: "persons",
                itemIdToRelate: item,
                operation: "add",
                key: cookies.userKey,
              });
            });
            if (elementType == "product") {
              entitiesRelated.map((item) => {
                relateItems.mutateAsync({
                  idToRelate: resJson[elementType].id,
                  actualItemType: typePage(elementType),
                  itemTypeToRelate: "entities",
                  itemIdToRelate: item,
                  operation: "add",
                  key: cookies.userKey,
                });
              });
            }
          }
          toast.success("¡Elemento creado!", {
            position: toast.POSITION.TOP_CENTER,
          });
          router.push("/home");
        } else {
          toast.success("¡Elemento editado!", {
            position: toast.POSITION.TOP_CENTER,
          });
          router.push("/home");
        }
      })
      .catch(() => {
        toast.error("Ha ocurrido un error", {
          position: toast.POSITION.TOP_CENTER,
        });
        router.push("/home");
      });
  };

  const renderRelatedItems = useCallback(() => {
    if (elementType == "entity") {
      return (
        <RelatedItemsField
          forType={type}
          type="persons"
          title="Personas relacionadas"
          checkedItems={personsRelated}
          setCheckedItems={setPersonsRelated}
          elementToEdit={id}
        />
      );
    } else if (elementType == "product") {
      return (
        <>
          <RelatedItemsField
            forType={type}
            type="persons"
            title="Personas relacionadas"
            checkedItems={personsRelated}
            setCheckedItems={setPersonsRelated}
            elementToEdit={id}
          />
          <RelatedItemsField
            forType={type}
            type="entities"
            title="Entidades relacionadas"
            checkedItems={entitiesRelated}
            setCheckedItems={setEntitiesRelated}
            elementToEdit={id}
          />
        </>
      );
    }
  }, [elementType, entitiesRelated, personsRelated]);

  const renderImg = useCallback(() => {
    const imageSrcPattern = /^(https?:\/\/|\.{0,2}\/).+$/;
    const isValidImageSrc = imageSrcPattern.test(img);
    isValidImageSrc && (
      <Image alt={element.name} width={120} height={120} src={img} />
    );
  }, [img]);

  return (
    <>
      <form className="flex flex-col w-2/5 mx-auto py-10">
        <h1 className="text-4xl text-amber-500 pb-7">
          {type !== "" ? "Editar" : "Nuevo"} elemento
        </h1>
        {type === "" && (
          <>
            <label htmlFor="type" className="text-amber-500 text-xl mb-2">
              Tipo de elemento:{" "}
            </label>
            <select
              onChange={(e) => setElementType(e.target.value)}
              className="rounded-xl pl-5 mb-3 py-2 text-xl"
              value={elementType}
            >
              <option value="entity" className="text-xl">
                Entidad
              </option>
              <option value="product" className="text-xl">
                Producto
              </option>
              <option value="person" className="text-xl">
                Persona
              </option>
            </select>
          </>
        )}
        {renderRelatedItems()}
        <label htmlFor="name" className="text-amber-500 text-xl mb-2">
          Nombre:{" "}
        </label>
        <input
          defaultValue={element.name}
          type="text"
          placeholder="Nombre..."
          className="rounded-full pl-5 mb-3 py-2 text-xl"
          onChange={(e) => (element.name = e.target.value)}
        />
        <label htmlFor="location" className="text-amber-500 text-xl mb-2">
          Fecha de nacimiento:{" "}
        </label>
        <input
          defaultValue={element.birthDate}
          type="date"
          className="rounded-full pl-5 mb-3 p-2 text-xl"
          onChange={(e) => (element.birthDate = e.target.value)}
        />
        <label htmlFor="date" className="text-amber-500 text-xl mb-2">
          Fecha de fallecimiento:{" "}
        </label>
        <input
          defaultValue={element.deathDate}
          type="date"
          className="rounded-full pl-5 mb-3 p-2 text-xl"
          onChange={(e) => (element.deathDate = e.target.value)}
        />
        <label htmlFor="url" className="text-amber-500 text-xl mb-2">
          URL:{" "}
        </label>
        <input
          defaultValue={element.wikiUrl}
          type="text"
          placeholder="URL..."
          className="rounded-full pl-5 mb-3 py-2 text-xl"
          onChange={(e) => (element.wikiUrl = e.target.value)}
        />
        <label htmlFor="image" className="text-amber-500 text-xl mb-2">
          Imagen:{" "}
        </label>
        <input
          defaultValue={element.imageUrl ?? ""}
          type="text"
          placeholder="URL de la imagen..."
          className="rounded-full pl-5 mb-3 py-2 text-xl"
          onBlur={(e) => setImg(e.target.value)}
        />
        {renderImg()}
        <a
          className="rounded-full py-2 mt-5 bg-amber-500 font-medium text-xl text-center cursor-pointer"
          onClick={createElement}
          type="button"
        >
          {type !== "" ? "Editar" : "Crear"} elemento
        </a>
      </form>
    </>
  );
};

export default CreateItemForm;
