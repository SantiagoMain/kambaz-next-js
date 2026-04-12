"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../Table";
import * as client from "../../../client";

export default function PeopleTablePage() {
    const [users, setUsers] = useState<any[]>([]);
    const { cid } = useParams();

    const fetchUsers = async () => {
        const users = await client.findUsersForCourse(cid as string);
        setUsers(users);
    };

    useEffect(() => {
        fetchUsers();
    }, [cid]);

    return <PeopleTable users={users} fetchUsers={fetchUsers} />;
}