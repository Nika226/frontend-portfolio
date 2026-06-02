import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function OrderDetails({ orders }) {
  const { orderId } = useParams();

  const order = orders.find((item) => item.id === orderId);
  const [noteText, setNoteText] = useState("");

  const notesStorageKey = `serviceDeskNotes-${orderId}`;

  const savedNotes = JSON.parse(localStorage.getItem(notesStorageKey)) || [];

  const [notes, setNotes] = useState(savedNotes);
  const handleAddNote = (event) => {
    event.preventDefault();

    if (!noteText.trim()) {
      return;
    }

    const noteToAdd = {
      id: Date.now(),
      text: noteText.trim(),
      date: new Date().toLocaleDateString("en-GB"),
    };

    const updatedNotes = [noteToAdd, ...notes];

    setNotes(updatedNotes);
    localStorage.setItem(notesStorageKey, JSON.stringify(updatedNotes));
    setNoteText("");
  };

  const handleDeleteNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);

    setNotes(updatedNotes);
    localStorage.setItem(notesStorageKey, JSON.stringify(updatedNotes));
  };

  if (!order) {
    return (
      <main className="mainContent">
        <Link className="backLink" to="/orders">
          ← Back to orders
        </Link>

        <section className="detailsCard">
          <h1>Order not found</h1>
          <p>This service order does not exist.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="mainContent">
      <Link className="backLink" to="/orders">
        ← Back to orders
      </Link>

      <section className="detailsCard">
        <p className="eyebrow">Service order details</p>
        <h1>{order.id}</h1>

        <div className="detailsGrid">
          <div>
            <span>Client</span>
            <strong>{order.client}</strong>
          </div>

          <div>
            <span>Service</span>
            <strong>{order.service}</strong>
          </div>

          <div>
            <span>Status</span>
            <strong>{order.status}</strong>
          </div>

          <div>
            <span>Priority</span>
            <strong>{order.priority}</strong>
          </div>

          <div>
            <span>Date</span>
            <strong>{order.date}</strong>
          </div>
        </div>
      </section>
      <section className="notesPanel">
        <div>
          <p className="eyebrow">Internal communication</p>
          <h2>Order notes</h2>
        </div>

        <form className="noteForm" onSubmit={handleAddNote}>
          <textarea
            placeholder="Add an internal note about this order..."
            value={noteText}
            onChange={(event) => setNoteText(event.target.value)}
          />

          <button type="submit" className="primaryBtn">
            Add note
          </button>
        </form>

        <div className="notesList">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.id} className="noteItem">
                <div>
                  <p>{note.text}</p>
                  <span>{note.date}</span>
                </div>

                <button
                  className="deleteOrderBtn"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="emptyNotes">No notes yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default OrderDetails;
