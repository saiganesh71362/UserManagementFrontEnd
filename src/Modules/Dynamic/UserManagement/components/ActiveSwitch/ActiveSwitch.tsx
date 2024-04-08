import React, { useEffect, useState } from "react";
import NavbarMain from "../../../../Utils/NavbarMain/NavbarMain";
import { UserManagementService } from "../../Services/UserManagmentService";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IState {
  error: string;
  loader: boolean;
}

const ActiveSwitch: React.FC = () => {
  const [state, setState] = useState<IState>({
    error: "",
    loader: false,
  });

  // const { loader, error } = state;

  const { userId } = useParams();
  const { currentStatus } = useParams();
  const toggleActiveStatus = (currentStatus: string | undefined) => {
    return currentStatus === "Active" ? "In-Active" : "Active";
  };

  const navigate = useNavigate();

  useEffect(() => {
    const newStatus = toggleActiveStatus(currentStatus);
    const cid = Number(userId);
    setState({
      ...state,
      loader: true,
    });
    currentStatus === "Active"
      ? toast.error("Your Account is De-Active")
      : toast.success("Your Account is Active");
    newStatus &&
      UserManagementService.statusChange(cid, newStatus)
        .then((response) => {
          if (response && response.data) {
            setState({
              ...state,
              loader: false,
            });
            navigate("/viewAccounts");
          }
        })
        .catch((error) => {
          setState({
            ...state,
            error: error.message,
            loader: false,
          });
        });
  }, []);

  return (
    <>
      <NavbarMain></NavbarMain>
      {/* {loader == true && <Loader />}
      {error.length > 0 ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <h1>Active Switch</h1>
        </>
      )} */}
    </>
  );
};

export default ActiveSwitch;
