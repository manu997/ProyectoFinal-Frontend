import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import RelatedItemsField from "./RelatedItemsField";
import { typePage } from "./List";
import { useRouter } from "next/router";
import useElementByIdAndType from "@/hooks/useElementByIdAndType";
import useEditElement from "@/hooks/editElementMutation";
import useCreateElement from "@/hooks/createElementMutation";
import React from "react";
import useRelateItems from "@/hooks/createRelatedItemMutation";
import { toast } from "react-toastify";
import useLoginContext from "@/hooks/useLoginContext";

const IMAGE_SRC_PATTERN = /^(https?:\/\/|\.{0,2}\/).+$/;

const CreateItemForm = ({ type, id }) => {
  const router = useRouter();

  const accessKey = useLoginContext((state) => state.accessKey);

  const [elementType, setElementType] = useState("entity");
  const [personsRelated, setPersonsRelated] = useState([]);
  const [entitiesRelated, setEntitiesRelated] = useState([]);
  const [element, setElement] = useState({
    name: "",
    birthDate: "",
    deathDate: "",
    imageUrl: "",
    wikiUrl: "",
  });
  const [operation, setOperation] = useState("POST");

  const isValidImageSrc = IMAGE_SRC_PATTERN.test(element.imageUrl);

  const query = useElementByIdAndType(accessKey, id, typePage(type));

  const updateField = useCallback((field, data) =>
    setElement((e) => ({ ...e, [field]: data }))
  );

  useEffect(() => {
    if (!!id) {
      // Si vienen datos para editar, entra al if
      if (!query.isFetching && query.status == "success") {
        setElement({
          name: query.data[type].name,
          birthDate: query.data[type].birthDate ?? "",
          deathDate: query.data[type].deathDate ?? "",
          wikiUrl: query.data[type].wikiUrl ?? "",
          imageUrl: query.data[type].imageUrl ?? "",
        });
        setElementType(type);
        setPersonsRelated(query.data[type].persons ?? []);
        setEntitiesRelated(query.data[type].entities ?? []);
        setOperation("PUT");
      }
    }
  }, [query.isFetching, id]);

  const create = useCreateElement();
  const edit = useEditElement();
  const relateItems = useRelateItems();

  const createElement = async () => {
    const mutation =
      operation === "POST"
        ? create.mutateAsync({
            element: element,
            type: elementType,
            key: accessKey,
          })
        : edit.mutateAsync({
            id: query.data[type].id,
            etag: query.data.etag,
            element: element,
            type: elementType,
            key: accessKey,
          });
    try {
      const res = await mutation;
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
              key: accessKey,
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
                key: accessKey,
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
    } catch (err) {
      console.error(err);
      toast.error("Ha ocurrido un error", {
        position: toast.POSITION.TOP_CENTER,
      });
      router.push("/home");
    }
  };

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
        {elementType === "entity" && (
          <RelatedItemsField
            forType={type}
            type="persons"
            title="Personas relacionadas"
            checkedItems={personsRelated}
            setCheckedItems={setPersonsRelated}
            elementToEdit={id}
          />
        )}
        {elementType === "product" && (
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
        )}
        <label htmlFor="name" className="text-amber-500 text-xl mb-2">
          Nombre:{" "}
        </label>
        <input
          defaultValue={element.name}
          type="text"
          placeholder="Nombre..."
          className="rounded-full pl-5 mb-3 py-2 text-xl"
          onChange={(e) => updateField("name", e.target.value)}
        />
        <label htmlFor="location" className="text-amber-500 text-xl mb-2">
          Fecha de nacimiento:{" "}
        </label>
        <input
          defaultValue={element.birthDate}
          type="date"
          className="rounded-full pl-5 mb-3 p-2 text-xl"
          onChange={(e) => updateField("birthDate", e.target.value)}
        />
        <label htmlFor="date" className="text-amber-500 text-xl mb-2">
          Fecha de fallecimiento:{" "}
        </label>
        <input
          defaultValue={element.deathDate}
          type="date"
          className="rounded-full pl-5 mb-3 p-2 text-xl"
          onChange={(e) => updateField("deathDate", e.target.value)}
        />
        <label htmlFor="url" className="text-amber-500 text-xl mb-2">
          URL:{" "}
        </label>
        <input
          defaultValue={element.wikiUrl}
          type="text"
          placeholder="URL..."
          className="rounded-full pl-5 mb-3 py-2 text-xl"
          onChange={(e) => updateField("wikiUrl", e.target.value)}
        />
        <label htmlFor="image" className="text-amber-500 text-xl mb-2">
          Imagen:{" "}
        </label>
        <input
          defaultValue={element.imageUrl}
          type="text"
          placeholder="URL de la imagen..."
          className="rounded-full pl-5 mb-3 py-2 text-xl"
          onBlur={(e) => updateField("imageUrl", e.target.value)}
        />
        {isValidImageSrc && (
          <Image
            alt={element.name}
            width={120}
            height={120}
            src={element.imageUrl}
          />
        )}
        <button
          className="rounded-full py-2 mt-5 bg-amber-500 font-medium text-xl text-center cursor-pointer"
          type="button"
          onClick={createElement}
        >
          {type !== "" ? "Editar" : "Crear"} elemento
        </button>
      </form>
    </>
  );
};

export default CreateItemForm;
