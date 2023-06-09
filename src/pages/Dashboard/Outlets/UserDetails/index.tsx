import { Link, useParams } from "react-router-dom";
import backArrow from "../../../../assets/svg/backArrow.svg";
import "./index.scss";
import useUserDetail from "../../../../setup/hooks/useUserDetail";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const { userDetail, error } = useUserDetail(id || "");
  console.log(userDetail);

  if (error) {
    return (
      <section className="userDetails">
        <div className="userDetails-content">
          <h1>{error.message}</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="userDetails">
      <div className="userDetails-content">
        <div className="back-button">
          <Link to=".." relative="path">
            <img src={backArrow} alt="back arrow" />
            Back to Users
          </Link>
        </div>
        <div className="header">
          <h1>User Details</h1>
          <div className="buttons">
            <button>Blacklist user</button>
            <button>Activate user</button>
          </div>
        </div>
        <div className="user-info">
          {userDetail && userDetail.profile && (
            <div className="basic-info">
              <div>
                <div className="avatar">
                  <img src={userDetail.profile.avatar} alt="Avatar" />
                </div>
                <div className="name">
                  <h1>
                    {userDetail.profile.firstName} {userDetail.profile.lastName}
                  </h1>
                  <p>{userDetail.accountNumber}</p>
                </div>
              </div>
              <div></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
