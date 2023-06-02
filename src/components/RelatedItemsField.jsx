import React from "react";
import useElementsByTypeQuery from "@/hooks/useElementsByType";
import Spinner from "./Spinner";
import { typePage } from "./List";
import useRelateItems from "@/hooks/useCreateRelatedItemMutation";
import useLoginContext from "@/hooks/useLoginContext";

const RelatedItemsField = ({
  title,
  type,
  checkedItems,
  setCheckedItems,
  elementToEdit,
  forType,
}) => {
  const accessKey = useLoginContext((state) => state.accessKey);

  const { mutateAsync: relateItems } = useRelateItems();

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      if (elementToEdit === undefined) {
        setCheckedItems([parseInt(value), ...checkedItems]);
      } else {
        relateItems({
          idToRelate: elementToEdit,
          actualItemType: typePage(forType),
          itemTypeToRelate: type,
          operation: "add",
          itemIdToRelate: value,
          key: accessKey,
        }).then(() => {
          setCheckedItems([parseInt(value), ...checkedItems]);
        });
      }
    } else {
      if (elementToEdit === undefined) {
        setCheckedItems(checkedItems.filter((item) => item != value));
      } else {
        relateItems({
          idToRelate: elementToEdit,
          actualItemType: typePage(forType),
          itemTypeToRelate: type,
          operation: "rem",
          itemIdToRelate: value,
          key: accessKey,
        }).then(() => {
          setCheckedItems(checkedItems.filter((item) => item != value));
        });
      }
    }
  };
  const elementsByType = useElementsByTypeQuery(type);

  return (
    <>
      <label htmlFor="type" className="text-amber-500 text-xl mb-2">
        {title}:{" "}
      </label>
      <div className="flex flex-row space-x-2">
        {elementsByType.isFetching ? (
          <Spinner />
        ) : (
          elementsByType.data[type]?.map((item) => {
            return (
              <React.Fragment key={item[Object.keys(item)].id}>
                <input
                  type="checkbox"
                  value={item[Object.keys(item)].id}
                  checked={checkedItems.includes(item[Object.keys(item)].id)}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor={item[Object.keys(item)].id}
                  className="text-amber-500 text-xl font-bold mb-2"
                >
                  {item[Object.keys(item)].name}
                </label>
              </React.Fragment>
            );
          })
        )}
      </div>
    </>
  );
};

export default RelatedItemsField;
