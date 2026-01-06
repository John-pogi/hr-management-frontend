import PageMeta from "../../components/common/PageMeta";
import Layout from "./Layout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Sign in"
        description="This page handle user authentications."
      />
      <Layout>
        <SignInForm />
      </Layout>
    </>
  );
}
