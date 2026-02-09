import React from "react";
import Link from "next/link";
import { FormControl, Button } from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      
      <FormControl 
        placeholder="username" 
        className="wd-username mb-2" 
      />
      
      <FormControl 
        placeholder="password" 
        type="password" 
        className="wd-password mb-2" 
      />
      
      <Link href="/dashboard" id="wd-signin-btn">
        <Button variant="primary" className="w-100 mb-2">
          Sign in
        </Button>
      </Link>
      
      <Link href="/account/signup" id="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}