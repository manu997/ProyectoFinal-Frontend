import React from "react";
import useElementsByType from "@/hooks/useElementsByType";
import Spinner from "./Spinner";
import { typePage } from "./List";
import useRelateItems from "@/hooks/createRelatedItemMutation";
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

  const { mutateAsync } = useRelateItems();

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      if (elementToEdit == "") {
        setCheckedItems([parseInt(value), ...checkedItems]);
      } else {
        mutateAsync({
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
      if (elementToEdit == "") {
        setCheckedItems(checkedItems.filter((item) => item != value));
      } else {
        mutateAsync({
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
  const elementsByType = useElementsByType(accessKey, type);

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
