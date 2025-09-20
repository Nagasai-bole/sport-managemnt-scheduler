"use client";

import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

export default function SessionCard({
  session,
  type = "available",
  onJoin,
  onEdit,
  onDelete,
  onLeave,
  currentUserId,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  const handleConfirm = async () => {
    try {
      if (modalAction === "join") {
        await onJoin?.(session);
      } else if (modalAction === "leave") {
        await onLeave?.(session);
      }
    } finally {
      setModalOpen(false);
    }
  };

  const getActionButtons = () => {
    if (type === "createdByMe") {
      return <span className="badge-info">Created by you</span>;
    }

    if (type === "alreadyJoined") {
      return <span className="badge-success">Already Joined</span>;
    }

    switch (type) {
      case "created":
        return (
          <div className="card-actions">
            <button className="btn-primary" onClick={() => onEdit?.(session)}>
              Edit
            </button>

            <button className="btn-danger" onClick={() => onDelete?.(session)}>
              Delete
            </button>
          </div>
        );

      case "joined":
        return (
          <button
            className="btn-danger"
            onClick={() => {
              setModalAction("leave");
              setModalOpen(true);
            }}
          >
            Leave
          </button>
        );

      case "available":
      default:
        return (
          <button
            className="btn-accent"
            onClick={() => {
              setModalAction("join");
              setModalOpen(true);
            }}
          >
            ✅ Join
          </button>
        );
    }
  };

  return (
    <div className="session-card">
      {/* Title */}
      <h3 className="session-title">{session.name}</h3>
      <p className="session-description">{session.description}</p>

      {/* Details Grid */}
      <div className="session-details">
        <div>
          <span className="detail-label">Sport</span>
          <span className="detail-value">{session.sport}</span>
        </div>
        <div>
          <span className="detail-label">Date & Time</span>
          <span className="detail-value">{session.dateTime}</span>
        </div>
        <div>
          <span className="detail-label">Participants</span>
          <span className="detail-value">
            {session.participants?.length || 0}/{session.maxParticipants}
          </span>
        </div>
        <div>
          <span className="detail-label">Location</span>
          <span className="detail-value">{session.location}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="session-footer">{getActionButtons()}</div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
        actionType={modalAction}
        sessionName={session.name}
      />
    </div>
  );
}
