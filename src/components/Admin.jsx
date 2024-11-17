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

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>List of Registered Users</h1>
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

            {/* Footer */}
            <footer className={styles.footer}>
                Only admin can access this site
            </footer>
        </div>
    );
};

export default Admin;
