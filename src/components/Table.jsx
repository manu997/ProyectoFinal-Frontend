import React from "react";

const Table = ({data}) => {
  return (
    <table className="table-auto border-collapse border border-amber-500 mt-10 text-amber-500">
      <tbody>
        {Object.keys(data).map((title) => {
          return (
            <tr className="h-20" key={title}>
              <td className="border border-amber-500 font-bold w-1/3 px-3">{title}</td>
              <td className="border border-amber-500 px-3 font-bold">
                {data[title].map((item) => {
                  return <span className="rounded-full p-2 mx-1 bg-amber-500 text-black">{item}</span>
                })}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
