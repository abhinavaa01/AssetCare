import { assignComplaintTo } from "@/Services/api";

export default function AssignComplaint(props) {
    const { data, key, index } = props;
    const complaintDate = new Date(data.createDate.toMillis());
    // console.log( data );

    const assignComplaint = (e) => {
        e.preventDefault();
        // assignComplaintTo()
        console.log(data);
    }
    return (
        <div className="col-4 col-md-3 shadow-sm card p-3 mx-2">
            <div className="fw-bold">Complaint Number: {index+1}</div>
            <div className="">Complaint Id: {data.id}</div>
            <div className="">Name: {data.userName}</div>
            <div className="">Phone: {data.userPhone}</div>
            <div className="">Email: {data.userEmail}</div>
            <div className="">Registration date: {complaintDate.toDateString()}</div>
            <div className="">Registration Time: {complaintDate.toTimeString()}</div>
            <div className="">Status: {data.status}</div>
            <hr />
            <div className="d-flex">
                <button className="btn btn-info" onClick={assignComplaint}>Assign Me</button>
                <button className="btn btn-info">Mark as Done</button>
            </div>
        </div>
    )
}