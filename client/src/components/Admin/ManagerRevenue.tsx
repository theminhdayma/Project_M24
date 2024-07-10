
export default function ManagerRevenue() {
  return (
    <>
      <div className="order">
        <div className="head">
          <h3>Recent Orders</h3>
          <i className="bx bx-search" />
          <i className="bx bx-filter" />
        </div>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Date Order</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <img src="https://firebasestorage.googleapis.com/v0/b/projectreact-dd427.appspot.com/o/7b42ef2c-5724-4e1c-abe2-a4017fc4ec1a.jpg?alt=media&token=fce0967e-11f4-4d4e-9dfd-cdc4e91759e9" />
                <p>Thế Minh</p>
              </td>
              <td>0364577211</td>
              <td>theminh2005z@gmail.com</td>
              <td>01-10-2021</td>
              <td>
                <span className="status completed">Completed</span>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <img src="https://firebasestorage.googleapis.com/v0/b/projectreact-dd427.appspot.com/o/7b42ef2c-5724-4e1c-abe2-a4017fc4ec1a.jpg?alt=media&token=fce0967e-11f4-4d4e-9dfd-cdc4e91759e9" />
                <p>Thế Minh</p>
              </td>
              <td>0364577211</td>
              <td>theminh2005z@gmail.com</td>
              <td>01-10-2021</td>
              <td>
                <span className="status pending">Pending</span>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                <img src="https://firebasestorage.googleapis.com/v0/b/projectreact-dd427.appspot.com/o/7b42ef2c-5724-4e1c-abe2-a4017fc4ec1a.jpg?alt=media&token=fce0967e-11f4-4d4e-9dfd-cdc4e91759e9" />
                <p>Thế Minh</p>
              </td>
              <td>0364577211</td>
              <td>theminh2005z@gmail.com</td>
              <td>01-10-2021</td>
              <td>
                <span className="status process">Process</span>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                <img src="https://firebasestorage.googleapis.com/v0/b/projectreact-dd427.appspot.com/o/7b42ef2c-5724-4e1c-abe2-a4017fc4ec1a.jpg?alt=media&token=fce0967e-11f4-4d4e-9dfd-cdc4e91759e9" />
                <p>Thế Minh</p>
              </td>
              <td>0364577211</td>
              <td>theminh2005z@gmail.com</td>
              <td>01-10-2021</td>
              <td>
                <span className="status pending">Pending</span>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>
                <img src="https://firebasestorage.googleapis.com/v0/b/projectreact-dd427.appspot.com/o/7b42ef2c-5724-4e1c-abe2-a4017fc4ec1a.jpg?alt=media&token=fce0967e-11f4-4d4e-9dfd-cdc4e91759e9" />
                <p>Thế Minh</p>
              </td>
              <td>0364577211</td>
              <td>theminh2005z@gmail.com</td>
              <td>01-10-2021</td>
              <td>
                <span className="status completed">Completed</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
