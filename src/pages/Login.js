import { Avatar, Button, TextField } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";

const Login = (props) => {
  useEffect(() => {
    document.title = props.name;
  }, [props.name]);

  const adminUser = {
    username: "admin",
    password: "12345",
    userId: 1,
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required username!"),
      password: Yup.string().required("Required password!"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      onLogin(values, setSubmitting);
      // setSubmitting(true);
      // alert(JSON.stringify(values, null, 2));
      // setSubmitting(false);
    },
  });

  function onLogin(values, setSubmitting) {
    setSubmitting(true);
    if (
      values.username === adminUser.username &&
      values.password === adminUser.password
    ) {
      sessionStorage.setItem("userId", adminUser.userId);
      sessionStorage.setItem("userName", adminUser.username);
      props.login(adminUser.userId);
      setSubmitting(false);
      props.history.push("/home");
    } else {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }
  }

  return (
    <div className="login-page">
      <div className="form-login">
        <Avatar style={{ backgroundColor: "green" }}>
          <LockOutlined />
        </Avatar>
        <h2>Sign in</h2>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="username"
            name="username"
            label="Username"
            placeholder="Enter username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            error={formik.touched?.username && formik.errors?.username}
            helperText={
              formik.errors.username && formik.touched.username
                ? formik.errors.username
                : ""
            }
            style={{ marginBottom: "1rem" }}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            placeholder="Enter password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            error={formik.touched?.password && formik.errors?.password}
            helperText={
              formik.errors.password && formik.touched.password
                ? formik.errors.password
                : ""
            }
            style={{ marginBottom: "2rem" }}
            fullWidth
          />
          <Button type="submit" color="primary" variant="contained" fullWidth>
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
