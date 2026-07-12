import { useEffect, useState } from "react";

function App() {
  const [tickets, setTickets] = useState([]);
  const [assets, setAssets] = useState([]);

  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "Open",
    assignedTo: ""
  });

  const [newAsset, setNewAsset] = useState({
    assetTag: "",
    deviceName: "",
    category: "Laptop",
    location: "",
    status: "Active",
    assignedTo: ""
  });

  const [editingTicketId, setEditingTicketId] = useState(null);
  const [editingAssetId, setEditingAssetId] = useState(null);

  const [editTicket, setEditTicket] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "Open",
    assignedTo: ""
  });

  const [editAsset, setEditAsset] = useState({
    assetTag: "",
    deviceName: "",
    category: "Laptop",
    location: "",
    status: "Active",
    assignedTo: ""
  });

  const loadTickets = () => {
    fetch("https://deskflow-api-tanmoy-gqhmajc9bjgff2d7.eastus-01.azurewebsites.net/api/tickets")
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => console.error("Error loading tickets:", error));
  };

  const loadAssets = () => {
    fetch("https://deskflow-api-tanmoy-gqhmajc9bjgff2d7.eastus-01.azurewebsites.net/api/assets")
      .then((response) => response.json())
      .then((data) => setAssets(data))
      .catch((error) => console.error("Error loading assets:", error));
  };

  useEffect(() => {
    loadTickets();
    loadAssets();
  }, []);

  const handleTicketChange = (event) => {
    setNewTicket({
      ...newTicket,
      [event.target.name]: event.target.value
    });
  };

  const handleAssetChange = (event) => {
    setNewAsset({
      ...newAsset,
      [event.target.name]: event.target.value
    });
  };

  const handleEditTicketChange = (event) => {
    setEditTicket({
      ...editTicket,
      [event.target.name]: event.target.value
    });
  };

  const handleEditAssetChange = (event) => {
    setEditAsset({
      ...editAsset,
      [event.target.name]: event.target.value
    });
  };

  const handleTicketSubmit = (event) => {
    event.preventDefault();

    fetch("https://deskflow-api-tanmoy-gqhmajc9bjgff2d7.eastus-01.azurewebsites.net/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTicket)
    })
      .then((response) => response.json())
      .then(() => {
        loadTickets();
        setNewTicket({
          title: "",
          description: "",
          priority: "Low",
          status: "Open",
          assignedTo: ""
        });
      })
      .catch((error) => console.error("Error creating ticket:", error));
  };

  const handleAssetSubmit = (event) => {
    event.preventDefault();

    fetch("https://deskflow-api-tanmoy-gqhmajc9bjgff2d7.eastus-01.azurewebsites.net/api/assets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newAsset)
    })
      .then((response) => response.json())
      .then(() => {
        loadAssets();
        setNewAsset({
          assetTag: "",
          deviceName: "",
          category: "Laptop",
          location: "",
          status: "Active",
          assignedTo: ""
        });
      })
      .catch((error) => console.error("Error creating asset:", error));
  };

  const startEditTicket = (ticket) => {
    setEditingTicketId(ticket.id);
    setEditTicket({
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status,
      assignedTo: ticket.assignedTo
    });
  };

  const startEditAsset = (asset) => {
    setEditingAssetId(asset.id);
    setEditAsset({
      assetTag: asset.assetTag,
      deviceName: asset.deviceName,
      category: asset.category,
      location: asset.location,
      status: asset.status,
      assignedTo: asset.assignedTo
    });
  };

  const updateTicket = (id) => {
    fetch(`https://deskflow-api-tanmoy-gqhmajc9bjgff2d7.eastus-01.azurewebsites.net/api/tickets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editTicket)
    })
      .then((response) => response.json())
      .then(() => {
        loadTickets();
        setEditingTicketId(null);
      })
      .catch((error) => console.error("Error updating ticket:", error));
  };

  const updateAsset = (id) => {
    fetch(`https://deskflow-api-tanmoy-gqhmajc9bjgff2d7.eastus-01.azurewebsites.net/api/assets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editAsset)
    })
      .then((response) => response.json())
      .then(() => {
        loadAssets();
        setEditingAssetId(null);
      })
      .catch((error) => console.error("Error updating asset:", error));
  };

  const deleteTicket = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ticket?");
    if (!confirmDelete) return;

    fetch(`https://deskflow-api-tanmoy-gqhmajc9bjgff2d7.eastus-01.azurewebsites.net/api/tickets/${id}`, {
      method: "DELETE"
    })
      .then((response) => response.json())
      .then(() => loadTickets())
      .catch((error) => console.error("Error deleting ticket:", error));
  };

  const deleteAsset = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this asset?");
    if (!confirmDelete) return;

    fetch(`https://deskflow-api-tanmoy-gqhmajc9bjgff2d7.eastus-01.azurewebsites.net/api/assets/${id}`, {
      method: "DELETE"
    })
      .then((response) => response.json())
      .then(() => loadAssets())
      .catch((error) => console.error("Error deleting asset:", error));
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="p-4 mb-4 bg-dark text-white rounded text-center">
        <h1 className="text-white fw-bold">DeskFlow</h1>
        <p className="mb-0 text-white">IT Service Desk & Asset Portal</p>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>Total Tickets</h5>
              <h2>{tickets.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>Open Tickets</h5>
              <h2>{tickets.filter((ticket) => ticket.status === "Open").length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>In Progress</h5>
              <h2>{tickets.filter((ticket) => ticket.status === "In Progress").length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>Total Assets</h5>
              <h2>{assets.length}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h4 className="mb-0">Create New Ticket</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleTicketSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={newTicket.title}
                  onChange={handleTicketChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Assigned To</label>
                <input
                  type="text"
                  className="form-control"
                  name="assignedTo"
                  value={newTicket.assignedTo}
                  onChange={handleTicketChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={newTicket.description}
                onChange={handleTicketChange}
                required
              ></textarea>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  name="priority"
                  value={newTicket.priority}
                  onChange={handleTicketChange}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={newTicket.status}
                  onChange={handleTicketChange}
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                  <option>Closed</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Add Ticket
            </button>
          </form>
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h4 className="mb-0">Service Tickets</h4>
        </div>

        <div className="card-body">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  {editingTicketId === ticket.id ? (
                    <>
                      <td>
                        <input
                          className="form-control"
                          name="title"
                          value={editTicket.title}
                          onChange={handleEditTicketChange}
                        />
                      </td>
                      <td>
                        <input
                          className="form-control"
                          name="description"
                          value={editTicket.description}
                          onChange={handleEditTicketChange}
                        />
                      </td>
                      <td>
                        <select
                          className="form-select"
                          name="priority"
                          value={editTicket.priority}
                          onChange={handleEditTicketChange}
                        >
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                          <option>Critical</option>
                        </select>
                      </td>
                      <td>
                        <select
                          className="form-select"
                          name="status"
                          value={editTicket.status}
                          onChange={handleEditTicketChange}
                        >
                          <option>Open</option>
                          <option>In Progress</option>
                          <option>Resolved</option>
                          <option>Closed</option>
                        </select>
                      </td>
                      <td>
                        <input
                          className="form-control"
                          name="assignedTo"
                          value={editTicket.assignedTo}
                          onChange={handleEditTicketChange}
                        />
                      </td>
                      <td>
                        <button className="btn btn-success btn-sm me-2" onClick={() => updateTicket(ticket.id)}>
                          Save
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setEditingTicketId(null)}>
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{ticket.title}</td>
                      <td>{ticket.description}</td>
                      <td>{ticket.priority}</td>
                      <td>{ticket.status}</td>
                      <td>{ticket.assignedTo}</td>
                      <td>
                        <button className="btn btn-warning btn-sm me-2" onClick={() => startEditTicket(ticket)}>
                          Edit
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteTicket(ticket.id)}>
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h4 className="mb-0">Add New Asset</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleAssetSubmit}>
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Asset Tag</label>
                <input
                  type="text"
                  className="form-control"
                  name="assetTag"
                  value={newAsset.assetTag}
                  onChange={handleAssetChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Device Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="deviceName"
                  value={newAsset.deviceName}
                  onChange={handleAssetChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  name="category"
                  value={newAsset.category}
                  onChange={handleAssetChange}
                >
                  <option>Laptop</option>
                  <option>Desktop</option>
                  <option>Printer</option>
                  <option>Network Device</option>
                  <option>POS Device</option>
                  <option>Tablet</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={newAsset.location}
                  onChange={handleAssetChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={newAsset.status}
                  onChange={handleAssetChange}
                >
                  <option>Active</option>
                  <option>Maintenance</option>
                  <option>Offline</option>
                  <option>Retired</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Assigned To</label>
                <input
                  type="text"
                  className="form-control"
                  name="assignedTo"
                  value={newAsset.assignedTo}
                  onChange={handleAssetChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Add Asset
            </button>
          </form>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header">
          <h4 className="mb-0">IT Assets</h4>
        </div>

        <div className="card-body">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Asset Tag</th>
                <th>Device Name</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id}>
                  {editingAssetId === asset.id ? (
                    <>
                      <td>
                        <input
                          className="form-control"
                          name="assetTag"
                          value={editAsset.assetTag}
                          onChange={handleEditAssetChange}
                        />
                      </td>
                      <td>
                        <input
                          className="form-control"
                          name="deviceName"
                          value={editAsset.deviceName}
                          onChange={handleEditAssetChange}
                        />
                      </td>
                      <td>
                        <select
                          className="form-select"
                          name="category"
                          value={editAsset.category}
                          onChange={handleEditAssetChange}
                        >
                          <option>Laptop</option>
                          <option>Desktop</option>
                          <option>Printer</option>
                          <option>Network Device</option>
                          <option>POS Device</option>
                          <option>Tablet</option>
                        </select>
                      </td>
                      <td>
                        <input
                          className="form-control"
                          name="location"
                          value={editAsset.location}
                          onChange={handleEditAssetChange}
                        />
                      </td>
                      <td>
                        <select
                          className="form-select"
                          name="status"
                          value={editAsset.status}
                          onChange={handleEditAssetChange}
                        >
                          <option>Active</option>
                          <option>Maintenance</option>
                          <option>Offline</option>
                          <option>Retired</option>
                        </select>
                      </td>
                      <td>
                        <input
                          className="form-control"
                          name="assignedTo"
                          value={editAsset.assignedTo}
                          onChange={handleEditAssetChange}
                        />
                      </td>
                      <td>
                        <button className="btn btn-success btn-sm me-2" onClick={() => updateAsset(asset.id)}>
                          Save
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setEditingAssetId(null)}>
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{asset.assetTag}</td>
                      <td>{asset.deviceName}</td>
                      <td>{asset.category}</td>
                      <td>{asset.location}</td>
                      <td>{asset.status}</td>
                      <td>{asset.assignedTo}</td>
                      <td>
                        <button className="btn btn-warning btn-sm me-2" onClick={() => startEditAsset(asset)}>
                          Edit
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteAsset(asset.id)}>
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;