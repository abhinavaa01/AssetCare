export default function Complaint(props) {
    const { data, key, index } = props;
    // console.log( data, index+1);
    return (
        <div className="col-4 col-md-3 shadow-sm card p-3 mx-2">
            <div className="">Complaint Number: {index+1}</div>
            <div className="">Complaint Id: {data.id}</div>
            <div className="">Name: {data.userName}</div>
            <div className="">Phone: {data.userPhone}</div>
            <div className="">Email: {data.userEmail}</div>
            {/* <div className="">Registration date: {data.createDate.toDateString()}</div>
            <div className="">Registration Time: {data.createDate.toTimeString()}</div> */}
            <div className="">Status: {data.status}</div>
        </div>
    )
}