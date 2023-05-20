import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const UsersLayout = ({ data, areInactives, deleteFunction, registerFunction }) => {
  return data.map((item) => (
    <div className="flex flex-row mb-5">
      <div className="flex flex-row justify-around gap-10 bg-amber-500 rounded-xl items-center px-7 text-xl w-full text-center">
        <p>{item.user.username}</p>
        <p>{item.user.email}</p>
        <p>{item.user.role}</p>
      </div>
      {areInactives ? (
        <a
          type="button"
          onClick={() => registerFunction(item.user)}
          className="py-2 px-4 rounded-full bg-amber-500 font-medium cursor-pointer text-black mx-3 text-xl"
        >
          Activar
        </a>
      ) : (
        <>
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
        </>
      )}
    </div>
  ));
};

export default UsersLayout;
