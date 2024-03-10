import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export default function Home() {
  return (
    <>
      <h1 className="text-2xl text-green-500">Netflix clone</h1>
      <button onClick={() => signOut()} className="w-100 bg-white">
        Sign out
      </button>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  console.log(session);

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
