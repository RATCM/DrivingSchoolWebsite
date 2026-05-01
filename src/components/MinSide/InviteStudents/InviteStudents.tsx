import GetSelf from "../../Functions/GetSelf";
import {useEffect, useState} from "react";
import StudentInviteDTO from "../../../DTO/StudentInviteDTO";
import {apiRequest} from "../../../Api/apiRequest";

type Instructor = {
    id: string;
    schoolId: string;
    name: {
        firstName: string;
        lastName: string;
    };
    emailAddress: string;
    phoneNumber: string;
    [key: string]: unknown;
};

function InviteStudents() {
    const { id: myId, error: selfError } = GetSelf()
    const [drivingSchoolId, setDrivingSchoolId] = useState<string>("");
    const [invites, setInvites] = useState<StudentInviteDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");

    const getInviteId = (invite: StudentInviteDTO) => {
        return invite.inviteId
    };





    const getInviteLink = (invite: StudentInviteDTO) => {
        const inviteId = getInviteId(invite);

        return `${window.location.origin}/register?inviteid=${inviteId}`;
    };

    const fetchInstructorAndInvites = async () => {
        if (!myId) return;

        setLoading(true);
        setError("");

        try {
            const instructor = await apiRequest<Instructor>(`instructor/${myId}`);

            setDrivingSchoolId(instructor.schoolId);

            const data = await apiRequest<StudentInviteDTO[]>(
                `drivingSchool/${instructor.schoolId}/student/invite`
            );

            setInvites(data);
        } catch (err) {
            console.error(err);
            setError("Could not load student invites.");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateInvite = async () => {
        if (!drivingSchoolId) return;

        setCreating(true);
        setError("");

        try {
            await apiRequest<StudentInviteDTO>(
                `drivingSchool/${drivingSchoolId}/student/invite`,
                "POST"
            );

            await fetchInstructorAndInvites();
        } catch (err) {
            console.error(err);
            setError("Could not create invite.");
        } finally {
            setCreating(false);
        }
    };

    const handleDeleteInvite = async (invite: StudentInviteDTO) => {
        const inviteId = getInviteId(invite);

        if (!drivingSchoolId || !inviteId) return;

        try {
            await apiRequest<void>(
                `drivingSchool/${drivingSchoolId}/student/invite/${inviteId}`,
                "DELETE"
            );

            setInvites(prev =>
                prev.filter(x => getInviteId(x) !== inviteId)
            );
        } catch (err) {
            console.error(err);
            setError("Could not delete invite.");
        }
    };

    const handleCopyInviteLink = async (invite: StudentInviteDTO) => {
        const inviteLink = getInviteLink(invite);

        await navigator.clipboard.writeText(inviteLink);
    };

    useEffect(() => {
        fetchInstructorAndInvites();
    }, [myId]);

    if (selfError) {
        return <p className="invite-error">{selfError}</p>;
    }

    if (loading) {
        return <p className="invite-loading">Loading invites...</p>;
    }

    return (
        <div className="invite-page">
            <div className="invite-header">
                <div>
                    <h1>Student Invites</h1>
                    <p>Generate and manage invite links for students.</p>
                </div>

                <button
                    className="generate-invite-button"
                    onClick={handleCreateInvite}
                    disabled={creating}
                >
                    {creating ? "Generating..." : "Generate invite"}
                </button>
            </div>

            {error && <p className="invite-error">{error}</p>}

            <div className="invite-table">
                <div className="invite-row invite-row-header">
                    <div>Invite link</div>
                    <div>Expires</div>
                    <div>Actions</div>
                </div>

                {invites.length === 0 ? (
                    <div className="empty-invites">
                        No active invites found.
                    </div>
                ) : (
                    invites.map(invite => {
                        const inviteId = getInviteId(invite);
                        const inviteLink = getInviteLink(invite);

                        return (
                            <div className="invite-row" key={inviteId}>
                                <div className="invite-link-cell">
                                    <span>{inviteLink}</span>
                                </div>

                                <div className="invite-actions">
                                    <button
                                        className="copy-button"
                                        onClick={() => handleCopyInviteLink(invite)}
                                    >
                                        Copy
                                    </button>

                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteInvite(invite)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default InviteStudents;