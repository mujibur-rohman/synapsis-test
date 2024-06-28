import Wrapper from "@/components/element/wrapper";
import FormUser from "@/components/form/form-user";

function FormAddUserPage() {
  return (
    <Wrapper className="py-5 space-y-3">
      <div>
        <span className="text-xl font-medium">Add User</span>
      </div>
      <FormUser />
    </Wrapper>
  );
}

export default FormAddUserPage;
