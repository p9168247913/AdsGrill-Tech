import styles from "./styles.module.css";

function Home(userDetails) {

	const handleLogout = () => {
		localStorage.removeItem("LoginToken")
		window.location.reload()
	}

	return (
		<div className={styles.container} >
			<h1 className={styles.heading}>Home</h1>
			<button style={{ borderRadius:"5px", padding: "12px", backgroundColor: "gray", color: "white", fontWeight: "bolder", margin: "auto" }} onClick={handleLogout}>Logout</button>
		</div>
	);
}

export default Home;
