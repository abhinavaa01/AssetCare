import AddComplaint from "./Static/AddComplaint";

export default function Modal() {
  return (
    <div className="modal"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="AddcomplaintModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">File a New Complaint</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          {/* Form or modal body here */}
          <AddComplaint />
        </div>
      </div>
    </div>
  );
}
