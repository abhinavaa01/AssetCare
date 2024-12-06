import { assignComplaintTo } from "@/Services/api";

export default function AssignComplaint(props) {
  const { data, index, maintainer } = props;
  const complaintDate = new Date(data.createDate.toMillis());
  // console.log( data );

  const assignComplaint = (e) => {
    e.preventDefault();
    console.log(data.id);
    assignComplaintTo(data.id, maintainer).then((res)=> {
        alert("Complaint assigned to you successfully!");
    }).catch((err)=> {
        alert("Something went wrong");
        console.error(err);
    })
    // console.log(data);
  };
  return (
    <div className="col-4 col-md-3 shadow-sm card p-3 mx-2">
      <div className="fw-bold">Complaint Number: {index + 1}</div>
      <div className="">Complaint Id: {data.id}</div>
      <div className="">Name: {data.userName}</div>
      <div className="">Phone: {data.userPhone}</div>
      <div className="">Email: {data.userEmail}</div>
      {data.assignedTo ? (
        <div className="">
          Assigned To: {data.assignedTo + ", " + data.assignedToNumber}
        </div>
      ) : null}
      <div className="">Registration date: {complaintDate.toDateString()}</div>
      <div className="">Registration Time: {complaintDate.toTimeString()}</div>
      <div className="">Status: {data.status}</div>
      <hr />
      <div className="d-flex">
        {data.assignedTo ? null : (
          <button className="btn btn-info me-2" onClick={assignComplaint}>
            Assign Me
          </button>
        )}
        <button className="btn btn-info me-2">Mark as Done</button>
      </div>
    </div>
  );
}
