import userCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const Profile = () => {
  const { data: user } = userCurrentUser();
  const router = useRouter();
  console.log(user);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching ?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div
            onClick={() => {
              router.push("/");
            }}
          >
            <div className="group flex-row w-44 mx-auto">
              <div
                className="
                      w-44
                      h-44
                      rounded-md
                      flex
                      items-center
                      justify-center
                      border-2
                      border-transparent
                      group-hover:border-white
                      group-hover:cursor-pointer
                      overflow-hidden
                      "
              >
                <img src="/images/default-blue.png" alt="profile" />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                Name:{user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
export default Profile;
