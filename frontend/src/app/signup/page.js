"use client";
import { useState } from "react";
import Toast from "../components/flash";
import Link from "next/link";
import styles from "../styles/Authentication.module.css";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "player",
  });
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setToast({
          type: "success",
          message: "Signup successful! Redirecting...",
        });
        setTimeout(() => {
          window.location.href = data?.user?.id
            ? `/${data.user.id}/dashboard`
            : "/";
        }, 1500);
      } else {
        setToast({ type: "error", message: data.error || "Signup failed" });
      }
    } catch {
      setToast({ type: "error", message: "Something went wrong" });
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <h1 className={styles.mainTitle}>Welcome to Sports Management</h1>
        <h2 className={styles.title}>Signup</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className={styles.input}
            required
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className={styles.input}
          >
            <option value="player">Player</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className={styles.button}>
            Signup
          </button>
          <p className={styles.signupText}>
            Already have an account?{" "}
            <Link href="/login" className={styles.signupLink}>
              Login
            </Link>
          </p>
        </form>
      </div>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
