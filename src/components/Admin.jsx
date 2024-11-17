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
                const response = await fetch("https://chatbotbackend-m8tb.onrender.com/admin/users", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data.users);
                } else {
                    setError("Failed to fetch users.");
                }
            } catch (err) {
                setError("An error occurred while fetching users.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) {
            console.error("Invalid date string:", dateString); // Log if date is undefined or null
            return "Invalid Date"; // Return a fallback value
        }

        const date = new Date(dateString);

        // If the date is invalid, return a fallback message
        if (isNaN(date.getTime())) {
            console.error("Invalid date string:", dateString);  // Log invalid date
            return "Invalid Date";
        }

        const options = {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric', 
            hour12: true
        };
        return date.toLocaleString(undefined, options); // Format as a readable date
    };

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Admin Dashboard</h1>
            <h2 className={styles.subTitle}>Registered Users</h2>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Registration Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{formatDate(user.created_at)}</td> {/* Display the formatted registration date */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
