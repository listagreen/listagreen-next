import { GetServerSideProps } from "next";
import { LogIn } from "../components/LogIn";
import { SignIn } from "../components/SIgnIn";
import { parseCookies } from "nookies";

export default function Home() {
  return (
    <>
      <LogIn />
      <SignIn />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  if (cookies["listagreen.token"]) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
