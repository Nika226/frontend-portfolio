import { useState } from "react";
import { Link } from "react-router-dom";

function Clients({ orders, clients, setClients }) {
  const [searchValue, setSearchValue] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [newClient, setNewClient] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    city: "",
  });

  const clientsWithOrders = clients.map((client) => {
    const activeOrders = orders.filter(
      (order) =>
        order.client === client.company && order.status !== "Completed",
    ).length;

    return {
      ...client,
      activeOrders,
    };
  });

  const filteredClients = clientsWithOrders.filter((client) => {
    const searchText = searchValue.toLowerCase();

    return (
      client.company.toLowerCase().includes(searchText) ||
      client.contact.toLowerCase().includes(searchText) ||
      client.email.toLowerCase().includes(searchText) ||
      client.city.toLowerCase().includes(searchText)
    );
  });

  const getNextClientId = () => {
    const clientNumbers = clients
      .map((client) => {
        const numberPart = String(client.id).replace("CL-", "");
        return Number(numberPart);
      })
      .filter((number) => !Number.isNaN(number));

    const maxClientNumber =
      clientNumbers.length > 0 ? Math.max(...clientNumbers) : 0;

    return `CL-${String(maxClientNumber + 1).padStart(3, "0")}`;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleAddClient = (event) => {
    event.preventDefault();

    const clientToAdd = {
      id: getNextClientId(),
      ...newClient,
      activeOrders: 0,
    };

    setClients((prevClients) => [clientToAdd, ...prevClients]);

    setNewClient({
      company: "",
      contact: "",
      email: "",
      phone: "",
      city: "",
    });

    setIsFormOpen(false);
  };

  return (
    <main className="mainContent">
      <header className="header">
        <div>
          <p className="eyebrow">Business customers</p>
          <h1>Clients</h1>
        </div>

        <button
          className="primaryBtn"
          onClick={() => setIsFormOpen((prev) => !prev)}
        >
          {isFormOpen ? "Close form" : "+ New Client"}
        </button>
      </header>

      {isFormOpen && (
        <form className="orderForm" onSubmit={handleAddClient}>
          <input
            type="text"
            name="company"
            placeholder="Company name"
            value={newClient.company}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact person"
            value={newClient.contact}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newClient.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={newClient.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={newClient.city}
            onChange={handleChange}
            required
          />

          <button type="submit" className="primaryBtn">
            Add Client
          </button>
        </form>
      )}

      <section className="toolbar">
        <input
          type="text"
          placeholder="Search by company, contact, email or city..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </section>

      <section className="tableSection">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Client database</p>
            <h2>Active B2B clients</h2>
          </div>
        </div>

        <div className="tableWrapper">
          <table className="ordersTable">
            <thead>
              <tr>
                <th>Client ID</th>
                <th>Company</th>
                <th>Contact</th>
                <th>Email</th>
                <th>City</th>
                <th>Active orders</th>
              </tr>
            </thead>

            <tbody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.id}</td>
                    <td>
                      <Link className="tableLink" to={`/clients/${client.id}`}>
                        {client.company}
                      </Link>
                    </td>
                    <td>{client.contact}</td>
                    <td>{client.email}</td>
                    <td>{client.city}</td>
                    <td>{client.activeOrders}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="emptyTableCell">
                    No clients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Clients;
