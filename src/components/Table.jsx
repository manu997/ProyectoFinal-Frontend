import React from "react";

const Table = ({ data }) => {
  return (
    <table className="table-auto border-collapse mt-10 text-amber-500 bg-white">
      <tbody>
        {Object.keys(data).map((title) => {
          return (
            <tr className="h-20 border-b-2 border-default" key={title}>
              <td className="font-bold w-1/3 px-3 text-xl bg-amber-500 text-default">
                {title}
              </td>
              <td className="px-3 font-bold">
                {data[title].map((item) => {
                  const type = Object.keys(item)[0]
                  return (
                    <span className="rounded-full p-2 mx-1 bg-amber-500 text-black text-xl">
                      {item[type].name}
                    </span>
                  );
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
