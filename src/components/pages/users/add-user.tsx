import Wrapper from "@/components/element/wrapper";
import FormUser from "@/components/form/form-user";
import { Suspense } from "react";

function FormAddUserPage() {
  return (
    <Wrapper className="py-5 space-y-3">
      <div>
        <span className="text-xl font-medium">Add User</span>
      </div>
      <Suspense>
        <FormUser />
      </Suspense>
    </Wrapper>
  );
}

export default FormAddUserPage;
