"use client";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FormControl, Button } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signin() {
    const [credentials, setCredentials] = useState<any>({});
    const dispatch = useDispatch();
    const router = useRouter();

    const signin = async () => {
        const user = await client.signin(credentials);
        if (!user) return;
        dispatch(setCurrentUser(user));
        router.push("/dashboard");
    };

    return (
        <div id="wd-signin-screen">
            <h3>Sign in</h3>
            <FormControl placeholder="username" className="wd-username mb-2"
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                id="wd-username" />
            <FormControl placeholder="password" type="password"
                className="wd-password mb-2"
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                id="wd-password" />
            <Button onClick={signin} variant="primary"
                className="w-100 mb-2" id="wd-signin-btn">
                Sign in
            </Button>
            <Link href="/account/signup" id="wd-signup-link">
                Sign up
            </Link>
        </div>
    );
}