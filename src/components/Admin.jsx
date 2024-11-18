import React, { useEffect, useState } from "react";
import styles from "./Admin.module.css"; // Import the CSS module

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch users from the Flask API
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    "https://chatbotbackend-m8tb.onrender.com/admin/users",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data.users);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || "Failed to fetch users.");
                    console.error("Backend error:", errorData); // Log the full error response
                }
            } catch (err) {
                setError("An error occurred while fetching users.");
                console.error("Fetch error:", err); // Log fetch error
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const toggleUserStatus = async (userId, disable) => {
        try {
            const response = await fetch("https://chatbotbackend-m8tb.onrender.com/admin/disable_user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id: userId, disable }),
            });

            if (response.ok) {
                const updatedUsers = users.map((user) =>
                    user.id === userId ? { ...user, disabled: !!disable } : user
                );
                setUsers(updatedUsers);
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Failed to update user status.");
            }
        } catch (err) {
            console.error("Error toggling user status:", err);
            alert("An error occurred while updating user status.");
        }
    };

    const handleSignOut = () => {
        // Clear any necessary data (e.g., token) and redirect to the login page
        console.log("User signed out."); // Optional: Add your custom logic for sign-out
        window.location.href = "https://chatbot32-e6oa.onrender.com/"; // Redirect to the login page
    };

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h1 className={styles.title}>Admin</h1>
                <button
                    className={`${styles.button} ${styles.signOut}`}
                    onClick={handleSignOut}
                >
                    Sign Out
                </button>
            </header>

            <main className={styles.content}>
                <section className={styles.userSection}>
                    <h2 className={styles.sectionTitle}>Registered Users</h2>
                    <p className={styles.userCount}>
                        Total Users: <strong>{users.length}</strong>
                    </p>

                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className={user.disabled ? styles.disabledRow : ""}>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.disabled ? "Disabled" : "Active"}</td>
                                        <td>
                                            <button
                                                className={styles.button}
                                                onClick={() =>
                                                    toggleUserStatus(user.id, user.disabled ? 0 : 1)
                                                }
                                            >
                                                {user.disabled ? "Enable" : "Disable"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            <footer className={styles.footer}>
                <p>Admin-only access. Please handle with care.</p>
            </footer>
        </div>
    );
};

export default Admin;
