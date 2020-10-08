// Load page, here we give some information about the application, and allow the user to select login or create account
// in the navbar, we should have an about option so the user can see which version we're running and build date

import React from "react";
import { Typography } from "@material-ui/core";

const Home = () => {
return (
    <>
    <Typography variant="h2" align="center">
    myTMS - The mini TMS
    </Typography>
    <br/>

    <Typography variant="h4" align="center">
        Login or Create Account
    </Typography>
    </>
    )
}
export default Home;