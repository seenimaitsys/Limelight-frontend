import moment from "moment";

const ReviewerStatus = ({ reviewer }) => {
  // Determine if the user has logged in or not
  if (reviewer.lastseen === 0) {
    return (
      <div className="d-flex gap-2 p-2 align-items-center">
        <div
          className="font-Poppins p-0 text-truncate"
          style={{
            fontSize: "15px",
            fontWeight: "500",
            width: "150px",
          }}
        >
          {reviewer.email.split("@")[0]}
        </div>
        <div className="font-Poppins fw-bold p-0" style={{ fontSize: "15px" }}>
          -
        </div>
        <div
          className="font-Poppins text-truncate"
          style={{
            fontSize: "12px",
            maxWidth: "165px",
            fontWeight: "300",
          }}
        >
          Not logged in yet
        </div>
      </div>
    );
  }

  // Determine if the user is active or inactive
  const isActive =
    moment().diff(moment.unix(reviewer.lastseen), "minutes") < 10;

  return (
    <div className="d-flex gap-2 p-2 align-items-center">
      <div
        className="font-Poppins p-0 text-truncate"
        style={{
          fontSize: "15px",
          fontWeight: "500",
          width: "150px",
        }}
      >
        {reviewer.email.split("@")[0]}
      </div>
      <div className="font-Poppins fw-bold p-0" style={{ fontSize: "15px" }}>
        -
      </div>
      <div
        className="font-Poppins text-truncate"
        style={{
          fontSize: "12px",
          maxWidth: "165px",
          fontWeight: "300",
        }}
      >
        {isActive ? (
          <div className="d-flex align-items-center gap-2 shadow ">
            <div className="d-flex align-items-center">Active</div>
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "rgba(66, 255, 0, 1)",
                borderRadius: "50px",
              }}
            ></div>
          </div>
        ) : (
          moment.unix(reviewer.lastseen).fromNow()
        )}
      </div>
    </div>
  );
};

export default ReviewerStatus;
