import Link from "next/link";
import React from "react";


const NewElementButton = () => {
  return (
    <Link
      className="rounded-full px-5 bg-amber-500 font-medium text-lg"
      href={{
        pathname: "/create",
        query: {
          type: "",
          data: {},
        },
      }}
      as={"/create"}
    >
      Crear elemento
    </Link>
  );
};

export default NewElementButton;
