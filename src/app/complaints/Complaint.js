export default function Complaint(props) {
  const { data, key, index } = props;
  console.log( data );
  const complaintDate = new Date(data.createDate.toMillis());
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
      <div className="">Registration date: {complaintDate.toDateString()}</div>
      <div className="">Registration Time: {complaintDate.toTimeString()}</div>
      <div className={data.status === "Complaint Resolved"? "text-success" : "text-danger"}>Status: {data.status}</div>
      <hr />
    </div>
  );
}
