import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react"

function Login() {
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});
	const navigate = useNavigate()
	const toast = useToast()


	const handleChange = (e) => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post('http://localhost:7000/api/user/login', loginData);
			console.log(response.data);
			localStorage.setItem("LoginToken", response.data.token)
			navigate("/")
			toast({
				title: 'Login Successful!!',
				status: 'success',
				duration: 4000,
				isClosable: true,
				position: "top"
			});
			window.location.reload()
		} catch (error) {
			console.error(error.response.data);
			toast({
				title: 'Server Error!!',
				status: 'error',
				duration: 4000,
				isClosable: true,
				position: "top"
			});
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Log in Form</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
					<img className={styles.img} src="./images/login.jpg" alt="login" />
				</div>
				<div className={styles.right}>
					<form onSubmit={handleSubmit} className="registration-form">
						<input type="email" placeholder="Email" className={styles.input} name="email" value={loginData.email} onChange={handleChange} required />

						<input type="password" placeholder="Password" className={styles.input} name="password" value={loginData.password} onChange={handleChange} required />

						<button className={styles.google_btn} type="submit">Login</button>
						New Here ? <Link to="/register" style={{color:'blue'}}><u>Sing Up</u></Link>

					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
