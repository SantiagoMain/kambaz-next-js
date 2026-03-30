"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FormControl, FormSelect, Button } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import * as client from "../client";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const dispatch = useDispatch();
    const router = useRouter();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    const fetchProfile = async () => {
        const account = await client.profile();
        if (!account) return router.push("/account/signin");
        setProfile(account);
    };

    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        router.push("/account/signin");
    };

    const updateProfile = async () => {
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div id="wd-profile-screen">
            <h3>Profile</h3>
            {profile && (
                <div>
                    <FormControl id="wd-username" className="mb-2"
                        defaultValue={profile.username}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
                    <FormControl id="wd-password" className="mb-2"
                        defaultValue={profile.password} type="password"
                        onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
                    <FormControl id="wd-firstname" className="mb-2"
                        defaultValue={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
                    <FormControl id="wd-lastname" className="mb-2"
                        defaultValue={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
                    <FormControl id="wd-dob" className="mb-2" type="date"
                        defaultValue={profile.dob}
                        onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
                    <FormControl id="wd-email" className="mb-2"
                        defaultValue={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                    <FormSelect id="wd-role" className="mb-2"
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </FormSelect>
                    <Button onClick={updateProfile} className="w-100 mb-2"
                        variant="primary" id="wd-update-btn">
                        Update
                    </Button>
                    <Button onClick={signout} className="w-100 mb-2"
                        variant="danger" id="wd-signout-btn">
                        Sign out
                    </Button>
                </div>
            )}
        </div>
    );
}