import Header from "@/components/Header";
import CreateItemForm from "@/components/CreateItemForm";
import React from "react";
import { useRouter } from "next/router";

const CreatePage = () => {
  const router = useRouter();
  const { type, id } = router.query;
  console.log(type)
  return (
    <>
      <Header />
      <CreateItemForm type={type} id={id} />
    </>
  );
};

export default CreatePage;
