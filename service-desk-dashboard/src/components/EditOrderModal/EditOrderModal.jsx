function EditOrderModal({ editingOrder, clients, onClose, onSave, onChange }) {
  return (
    <div className="modalOverlay">
      <div className="modalCard">
        <div className="modalHeader">
          <div>
            <p className="eyebrow">Edit service order</p>
            <h2>{editingOrder.id}</h2>
          </div>

          <button className="modalCloseBtn" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="modalForm" onSubmit={onSave}>
          <label>
            Client
            <select
              name="client"
              value={editingOrder.client}
              onChange={onChange}
              required
            >
              <option value="">Select client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.company}>
                  {client.company}
                </option>
              ))}
            </select>
          </label>

          <label>
            Service
            <input
              type="text"
              name="service"
              value={editingOrder.service}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Status
            <select
              name="status"
              value={editingOrder.status}
              onChange={onChange}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>

          <label>
            Priority
            <select
              name="priority"
              value={editingOrder.priority}
              onChange={onChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>

          <label>
            Date
            <input
              type="date"
              name="date"
              value={editingOrder.date}
              onChange={onChange}
              required
            />
          </label>

          <div className="modalActions">
            <button type="button" className="secondaryBtn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="primaryBtn">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditOrderModal;
