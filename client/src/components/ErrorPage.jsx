import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="errorpagecontainer">
        <div className="sectionError">
          <h1 className="error">404</h1>
          <div className="page">
            Ooops!!! The page you are looking for is not found
          </div>
          <p
            className="back-home"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </p>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
