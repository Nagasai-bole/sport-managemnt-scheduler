"use client";
import Toast from "./flash";
import AddSportModal from "./AddSport";
import { useState, useEffect } from "react";

export default function Navbar({
  currentUser,
  onSessionCreated,
  currentUserRole,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddSportModalOpen, setIsAddSportModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [sportsOptions, setSportsOptions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sport: "",
    dateTime: "",
    location: "",
    maxParticipants: 10,
  });

  const fetchSports = async () => {
    try {
      const res = await fetch("http://localhost:8080/sports", {
        credentials: "include",
      });
      const data = await res.json();
      setSportsOptions(data.sports || []);
    } catch (err) {
      setToast({ type: "error", message: "Failed to fetch sports" });
    }
  };

  useEffect(() => {
    fetchSports();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        window.location.href = "/login";
        setToast({ type: "success", message: "Logging out..." });
      } else {
        setToast({ type: "error", message: "Failed to logout" });
      }
    } catch (err) {
      console.error("Error logging out:", err);
      setToast({ type: "error", message: "Error logging out" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        onSessionCreated?.(data.session, null);
        setIsModalOpen(false);
        setFormData({
          name: "",
          description: "",
          sport: "",
          dateTime: "",
          location: "",
          maxParticipants: 10,
        });
      } else {
        onSessionCreated?.(null, data.error || "Failed to create session");
      }
    } catch (err) {
      console.error(err);
      onSessionCreated?.(null, "Something went wrong");
    }
  };

  return (
    <nav className="navbar">
      {/* Navbar Container */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "4rem",
        }}
      >
        <div
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "1.6rem",
            fontWeight: "700",
            color: "#1e293b",
          }}
        >
          Sports Management
        </div>

        {/* Desktop Navigation */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          className="hidden-mobile"
        >
          <span
            style={{
              fontFamily: "Source Sans Pro, sans-serif",
              fontSize: "0.9rem",
              color: "#374151",
            }}
          >
            Welcome, {currentUser} ({currentUserRole})
          </span>
          {currentUserRole?.toLowerCase() === "admin" && (
            <button
              onClick={() => setIsAddSportModalOpen(true)}
              style={{
                fontSize: "0.9rem",
                background: "#f59e0b",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Add Sport
            </button>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              fontSize: "0.9rem",
              background: "#10b981",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Create Session
          </button>
          <button
            onClick={handleLogout}
            style={{
              fontSize: "0.9rem",
              background: "#ef4444",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: "none",
            background: "transparent",
            border: "none",
            color: "#1f2937",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          style={{
            background: "#f3f4f6",
            borderTop: "1px solid #d1d5db",
            padding: "1rem",
            display: "none",
          }}
          className="mobile-menu"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "Source Sans Pro, sans-serif",
                fontSize: "0.9rem",
              }}
            >
              Welcome, {currentUser} ({currentUserRole})
            </span>
            {currentUserRole?.toLowerCase() === "admin" && (
              <button
                onClick={() => setIsAddSportModalOpen(true)}
                style={{
                  fontSize: "0.9rem",
                  background: "#f59e0b",
                  color: "#fff",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Add Sport
              </button>
            )}
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                fontSize: "0.9rem",
                background: "#10b981",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Create Session
            </button>
            <button
              onClick={handleLogout}
              style={{
                fontSize: "0.9rem",
                background: "#ef4444",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Modal for Creating Session */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              background: "#f9fafb",
              borderRadius: "16px",
              padding: "2rem",
              width: "450px",
              maxWidth: "90%",
              boxShadow: "0 15px 30px rgba(0,0,0,0.25)",
            }}
          >
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "1.8rem",
                marginBottom: "1.5rem",
                textAlign: "center",
                color: "#111827",
              }}
            >
              Create New Session
            </h2>

            <form
              onSubmit={handleCreateSession}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {[
                "name",
                "description",
                "dateTime",
                "location",
                "maxParticipants",
              ].map((field) => (
                <input
                  key={field}
                  type={
                    field === "dateTime"
                      ? "datetime-local"
                      : field === "maxParticipants"
                        ? "number"
                        : "text"
                  }
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleInputChange}
                  required={field === "name" || field === "dateTime"}
                  min={field === "maxParticipants" ? 1 : undefined}
                  style={{
                    padding: "0.85rem 1rem",
                    borderRadius: "12px",
                    border: "1px solid #9ca3af",
                    outline: "none",
                    fontSize: "0.95rem",
                    background: "#fff",
                    transition: "border 0.2s",
                  }}
                />
              ))}

              <select
                name="sport"
                value={formData.sport}
                onChange={handleInputChange}
                required
                style={{
                  padding: "0.85rem 1rem",
                  borderRadius: "12px",
                  border: "1px solid #9ca3af",
                  outline: "none",
                  fontSize: "0.95rem",
                  background: "#fff",
                }}
              >
                <option value="" disabled>
                  Select Sport
                </option>
                {sportsOptions.map((sport) => (
                  <option key={sport._id} value={sport.name}>
                    {sport.name}
                  </option>
                ))}
              </select>

              <div
                style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}
              >
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    borderRadius: "10px",
                    background: "#3b82f6",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    borderRadius: "10px",
                    background: "#e5e7eb",
                    color: "#111827",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <AddSportModal
        isOpen={isAddSportModalOpen}
        onClose={() => {
          setIsAddSportModalOpen(false);
          fetchSports(); // refresh sports after adding
        }}
      />
    </nav>
  );
}
