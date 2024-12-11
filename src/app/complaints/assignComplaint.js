import { assignComplaintTo, markComplaintAsDone } from "@/Services/api";

export default function AssignComplaint(props) {
  const { data, index, maintainer } = props;
  const complaintDate = new Date(data.createDate.toMillis());
  // console.log( data );

  const assignComplaint = (e) => {
    e.preventDefault();
    // console.log(data.id);
    if (!maintainer.name) {
      alert("Add your name in your profile!");
    } else if (!maintainer.phone) {
      alert("Add your phone number first!");
    } else
      assignComplaintTo(data.id, maintainer)
        .then((res) => {
          alert("Complaint assigned to you successfully!");
        })
        .catch((err) => {
          alert("Something went wrong");
          console.error(err);
        });
    // console.log(data);
  };

  const markAsDone = (e) => {
    e.preventDefault();
    // console.log(data.id);
    if (data.assignedTo === maintainer.name)
      markComplaintAsDone(data.id, maintainer)
        .then((res) => {
          alert("Complaint marked as resolved!");
        })
        .catch((err) => {
          alert("Something went wrong");
          console.error(err);
        });
    else alert("Complaint is not assigned to you");
    // console.log(data);
  };

  const archiveComplaint = (e) => {
    e.preventDefault();
      markComplaintAsDone(data.id, maintainer)
        .then((res) => {
          alert("Complaint marked as resolved!");
        })
        .catch((err) => {
          alert("Something went wrong");
          console.error(err);
        });
    // console.log(data);
  };
  return (
    <div className="col-10 col-md-3 shadow-sm card p-3 mx-2">
      <div className="fw-bold">Complaint Number: {index + 1}</div>
      <div className="">Complaint Id: {data.id}</div>
      <div className="">Name: {data.userName}</div>
      <div className="">Phone: {data.userPhone}</div>
      <div className="">Email: {data.userEmail}</div>
      {data.assignedTo ? (
        <div className="text-success">
          Assigned To: {data.assignedTo + ", " + data.assignedToNumber}
        </div>
      ) : (
        <div className="text-danger">Maintainer not assigned</div>
      )}
      <div className="">Category of Complaint: {data.category}</div>
      <div className="">
        Registration date: {complaintDate.toLocaleDateString()}
      </div>
      <div className="">
        Registration Time: {complaintDate.toLocaleTimeString()}
      </div>
      <div
        className={
          data.status === "Complaint Resolved" ? "text-success" : "text-danger"
        }
      >
        Status: {data.status}
      </div>
      <hr />
      <div className="d-flex">
        {data.assignedTo ? null : (
          <button className="btn btn-info me-2" onClick={assignComplaint}>
            Assign Me
          </button>
        )}
        <button
          className="btn btn-info me-2"
          onClick={markAsDone}
          disabled={!data.assignedTo || data.status === "Complaint Resolved"}
        >
          Mark as Done
        </button>
        {data.status === "Complaint Resolved" ? (
          <button
            className="btn btn-secondary me-2"
            onClick={archiveComplaint}
            disabled={!data.assignedTo || data.status === "Complaint Resolved"}
          >
            Archive
          </button>
        ) : null}
      </div>
    </div>
  );
}
