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

    const handleSignOut = () => {
        // Redirect to the given URL on sign out
        window.location.href = "https://chatbot32-e6oa.onrender.com//login";
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
                <h1 className={styles.title}>Admin Panel</h1>
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
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
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
