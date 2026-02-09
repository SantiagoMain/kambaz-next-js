import React from "react";
import Link from "next/link";
import { FormControl, Button } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      
      <FormControl 
        placeholder="username" 
        className="wd-username mb-2" 
      />
      
      <FormControl 
        placeholder="password" 
        type="password" 
        className="wd-password mb-2" 
      />
      
      <FormControl 
        placeholder="verify password" 
        type="password" 
        className="wd-password-verify mb-2" 
      />
      
      <Link href="/account/profile" id="wd-signup-btn">
        <Button variant="primary" className="w-100 mb-2">
          Sign up
        </Button>
      </Link>
      
      <Link href="/account/signin" id="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}