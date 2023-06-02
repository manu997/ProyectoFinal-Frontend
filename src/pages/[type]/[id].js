import ElementLayout from "@/components/ElementLayout";
import Header from "@/components/Header";
import React from "react";

const Page = ({ id, type }) => {
  return (
    <>
      <Header />
      <ElementLayout id={id} type={type} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;

  return { props: { id: query.id, type: query.type } };
}

export default Page;
