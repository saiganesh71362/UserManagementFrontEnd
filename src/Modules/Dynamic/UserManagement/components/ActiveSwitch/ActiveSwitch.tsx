import React, { useEffect } from "react";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
import { UserManagementService } from "../../Services/UserManagmentService";
import { useParams, useNavigate } from "react-router-dom";

interface IUser {
  email?: string;
  // other properties...
}

const ActiveSwitch: React.FC = () => {
  const { userId } = useParams();
  const { status } = useParams();
  const id = Number(userId);
  const navigate = useNavigate();

  // Assuming email is passed as a prop or accessible through context
  const email = ""; // Placeholder, replace with actual value

  useEffect(() => {
    let updatedStatus: string;
    if (status == null) {
      updatedStatus = "Y";
    } else if (status == "Y") {
      updatedStatus = "N";
    } else {
      updatedStatus = "Y";
    }
    const userObject: Partial<IUser> = { activeSwitch: updatedStatus };
    if (email) {
      userObject.email = email;
    }

    UserManagementService.updateUser(id, userObject)
      .then((response) => {
        if (response.data) {
          navigate("/viewAccounts");
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, status, navigate, email]); // Added email to the dependency array

  return (
    <>
      <NavbarMain />
    </>
  );
};

export default ActiveSwitch;
