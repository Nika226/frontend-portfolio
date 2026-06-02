function EditClientModal({ editingClient, onClose, onSave, onChange }) {
  return (
    <div className="modalOverlay">
      <div className="modalCard">
        <div className="modalHeader">
          <div>
            <p className="eyebrow">Edit client</p>
            <h2>{editingClient.company}</h2>
          </div>

          <button className="modalCloseBtn" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="modalForm" onSubmit={onSave}>
          <label>
            Company
            <input
              type="text"
              name="company"
              value={editingClient.company}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Contact person
            <input
              type="text"
              name="contact"
              value={editingClient.contact}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={editingClient.email}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Phone
            <input
              type="text"
              name="phone"
              value={editingClient.phone}
              onChange={onChange}
              required
            />
          </label>

          <label>
            City
            <input
              type="text"
              name="city"
              value={editingClient.city}
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

export default EditClientModal;
