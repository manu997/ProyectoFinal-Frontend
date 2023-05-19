import Header from "@/components/Header";
import Profile from "@/components/Profile";
import React from "react";

const Page = ({ id }) => {
  return (
    <>
      <Header />
      <Profile userId={id} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;

  return { props: { id: query.id } };
}

export default Page;
