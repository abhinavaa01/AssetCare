export default function Profile() {
  return (
    <>
      <div className="py-5">
        <h1 className="text-center">Profile Details</h1>
        <hr />
        <div className="row">
          <table className="my-4 table">
            <tbody className="mb-4">
              <tr>
                <th scope="row" className="fw-bold fs-5 py-3">
                  Phone :
                </th>
                <td>
                  <input
                    className="form-control"
                    type="tel"
                    value={values.phone}
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <th scope="row" className="fw-bold fs-5 py-3">
                  Business Name :
                </th>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(e) =>
                      updateField("businessName", e.target.value)
                    }
                    value={values.businessName}
                    disabled={!editing}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row" className="fw-bold fs-5 py-3">
                  Type of Business :
                </th>
                <td>
                  <select
                    id="typeOfBusiness"
                    className="form-select"
                    defaultValue={values.typeOfBusiness}
                    disabled={!editing}
                    onChange={(e) =>
                      updateField("typeOfBusiness", e.target.value)
                    }
                  >
                    <option value="service">Services</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="trading">Trading</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th scope="row" className="fw-bold fs-5 py-3">
                  Email :
                </th>
                <td colSpan="2" className="position-relative">
                  <input
                    className="form-control"
                    type="email"
                    value={values.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    disabled={!editing}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
