import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const UsersLayout = ({
  data,
  areInactives,
  deleteFunction,
  activationFunction,
}) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-gray-400 text-xl">
        <tbody>
          {data?.map((item) => (
            <tr className="border-b bg-gray-800 border-gray-700">
              <th className="px-6 py-4 font-medium text-gray-100 whitespace-nowrap">
                {item.user.username}
              </th>
              <td>{item.user.email}</td>
              <td>{item.user.role}</td>
              <td>
                {areInactives ? (
                  <a
                    type="button"
                    onClick={() => activationFunction(item.user)}
                    className="py-2 px-4 rounded-full bg-amber-500 font-medium cursor-pointer text-black mx-3 text-xl"
                  >
                    Activar
                  </a>
                ) : (
                  <div className="flex flex-row">
                    <TrashIcon
                      className="w-10 p-2 rounded-full bg-amber-500 font-medium cursor-pointer text-black mx-3"
                      onClick={() => deleteFunction(item.user.id)}
                    />
                    <Link
                      className="text-white underline text-3xl"
                      href={{
                        pathname: "/user/[id]",
                        query: {
                          id: item.user.id,
                        },
                      }}
                      as={`/edit/user/${item.user.id}`}
                    >
                      <PencilSquareIcon className="w-10 p-2 rounded-full bg-amber-500 font-medium cursor-pointer text-black" />
                    </Link>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersLayout;
