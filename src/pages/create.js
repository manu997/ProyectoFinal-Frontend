import Header from "@/components/Header";
import CreateItemForm from "@/components/CreateItemForm";
import React from "react";

const CreatePage = ({ type, id }) => {
  return (
    <>
      <Header />
      <CreateItemForm id={id} type={type} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;

  return {
    props: { id: query.id ?? "", type: query.type ?? "" },
  };
}

export default CreatePage;
